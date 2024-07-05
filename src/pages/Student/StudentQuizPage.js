import { Typography, Card, CardContent } from "@mui/material";
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
  const [quizzes, setQuizzes] = useState([]);
  const quizzesPerPage = 6;

  const fetchQuizData = useCallback(
    async (page, limit) => {
      try {
        const response = await ApiInstance.get(
          `/student/course-management/class/${classId}?type=quizzes&page=${page}&limit=${limit}`
        );
        const { data } = response.data;
        if (data && data.quizzes) {
          setQuizzes(data.quizzes.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)));
          setTotalItem(data.total);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
    [classId]
  );

  useEffect(() => {
    fetchQuizData(page, quizzesPerPage);
  }, [fetchQuizData, page, quizzesPerPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQuizData(page, quizzesPerPage);
    }, 30000); // Refresh data every 30 seconds

    return () => clearInterval(interval);
  }, [fetchQuizData, page, quizzesPerPage]);

  const pageCount = Math.ceil(totalItem / quizzesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchQuizData(value, quizzesPerPage);
  };

  const handleQuizDetailClick = (quizId) => {
    navigate(`/student/course-management/class/${classId}/${quizId}`);
  };

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }}>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item flex={1}>
            <Typography variant="h4" component="h2">
              NameCourse - CodeCourse   
                description
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: 2, minHeight: 100 }}>
          {quizzes
            .slice(0, quizzesPerPage)
            .map((quiz, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  className="quiz-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuizDetailClick(quiz.id)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {quiz.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {quiz.description}
                    </Typography>
                    <Typography variant="body2">
                      Start Date: {new Date(quiz.startDate).toLocaleDateString()}
                      <br />
                      End Date: {new Date(quiz.endDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />
        </Stack>
      </Container>
    </div>
  );
};

export default StudentQuizPage;
