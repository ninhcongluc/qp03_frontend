import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";

const StudentQuizPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const quizzesPerPage = 6;

  const fetchQuizData = useCallback(async (page, limit, searchTerm = "") => {
    try {
      const response = await ApiInstance.get(
        `/student/course-management/class/${classId}/quiz?page=${page}&limit=${limit}&name=${searchTerm}`
      );
      const { data } = response.data;
      if (data && data.quizzes) {
        setQuizzes(data.quizzes);
        setTotalItem(data.total);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }, [classId]);

  useEffect(() => {
    fetchQuizData(1, quizzesPerPage, searchTerm);
  }, [fetchQuizData, searchTerm, quizzesPerPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQuizData(page, quizzesPerPage, searchTerm);
    }, 30000); // Refresh data every 30 seconds

    return () => clearInterval(interval);
  }, [fetchQuizData, page, quizzesPerPage, searchTerm]);

  const pageCount = Math.ceil(totalItem / quizzesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchQuizData(value, quizzesPerPage, searchTerm);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
    fetchQuizData(1, quizzesPerPage, event.target.value);
  };

  const handleQuizDetailClick = (quizId) => {
    navigate(`/student/course-management/class/${classId}/quiz/${quizId}`);
  };

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }}>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item flex={1}>
            <TextField
              label="Search by Quiz Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: 2, minHeight: 100 }}>
          {quizzes.map((quiz, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <div
                className="quiz-card"
                style={{ padding: 16 }}
                onClick={() => handleQuizDetailClick(quiz.id)}
              >
                <h3>{quiz.name}</h3>
                <p>{quiz.description}</p>
                <p>Start Date: {new Date(quiz.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(quiz.endDate).toLocaleDateString()}</p>
              </div>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Container>
    </div>
  );
};

export default StudentQuizPage;
