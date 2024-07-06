import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

const StudentQuizPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const quizzesPerPage = 6;
  const [course, setCourse] = useState();

  const fetchQuizData = useCallback(
    async (page, limit, searchTerm = "") => {
      try {
        const response = await ApiInstance.get(
          `/student/course-management/class/${classId}?type=quizzes&page=${page}&limit=${limit}&name=${searchTerm}`
        );
        const { data } = response.data;

        setQuizzes(response.data.data.quizzes);
        setCourse(response.data.data?.courseInfo.course);
        setTotalItem(data.total);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    },
    [classId]
  );

  useEffect(() => {
    fetchQuizData(1, quizzesPerPage);
  }, [fetchQuizData, quizzesPerPage]);

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
    navigate(`/student/quiz-detail/${quizId}`);
  };

  return (
    <div>
      <MenuComponent role="student" />
      <div className="tilte-class" style={{ marginLeft: "21%" }}>
        <h2>
          {course?.code}-{course?.name}
        </h2>
        <p>{course?.description}</p>
      </div>
      <Container sx={{ marginLeft: "240px" }}>
        <Grid container spacing={4} sx={{ marginTop: 2, minHeight: 100 }}>
          {quizzes.map((quiz, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card onClick={() => handleQuizDetailClick(quiz.id)}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {quiz.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quiz.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start Date:{" "}
                      {new Date(quiz.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      End Date: {new Date(quiz.endDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
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
