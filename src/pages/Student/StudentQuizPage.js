import React from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuComponent from "../../components/LeftMenu/Menu";
import { Box } from "@mui/system";
import "./StudentQuizPage.css";

const quizData = [
  {
    id: "4713fc09-2967-4e59-a832-04db1379baad",
    courseName: "ACC 101",
    quizzes: [
      { quizId: "PT1", title: "Quiz PT1", timeLimit: "30 minutes" },
      { quizId: "PT2", title: "Quiz PT2", timeLimit: "45 minutes" },
      { quizId: "PT3", title: "Quiz PT3", timeLimit: "60 minutes" },
      { quizId: "Mid Terms", title: "Mid Terms", timeLimit: "90 minutes" },
      { quizId: "Final Exam", title: "Final Exam", timeLimit: "120 minutes" },
    ],
  },
  {
    id: "f5a016b9-97c2-4832-ba68-490d8825225e",
    courseName: "SWR 302",
    quizzes: [
      { quizId: "PT1", title: "Quiz PT1", timeLimit: "30 minutes" },
      { quizId: "PT2", title: "Quiz PT2", timeLimit: "45 minutes" },
      { quizId: "PT3", title: "Quiz PT3", timeLimit: "60 minutes" },
      { quizId: "Mid Terms", title: "Mid Terms", timeLimit: "90 minutes" },
      { quizId: "Final Exam", title: "Final Exam", timeLimit: "120 minutes" },
    ],
  },
  // Thêm các khóa học và bài kiểm tra khác ở đây
];

const StudentQuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseQuiz = quizData.find((data) => data.id === courseId);

  if (!courseQuiz) {
    return <Typography>No quizzes available for this course.</Typography>;
  }

  const handleQuizClick = (quizId) => {
    navigate(`/student/course-management/class/${courseId}/${quizId}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MenuComponent role="student" />
      <Container className="container">
        <Typography variant="h3" className="title" gutterBottom>
          Quizzes for {courseQuiz.courseName}
        </Typography>
        <Grid container className="grid-container" spacing={2}>
          {courseQuiz.quizzes.map((quiz) => (
            <Grid
              item
              className="grid-item"
              key={quiz.quizId}
              xs={12}
              sm={6}
              md={4}
            >
              <Card className="card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" className="card-time">
                    Time: {quiz.timeLimit}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "blue",
                      color: "white",
                      "&:hover": { backgroundColor: "darkpink" },
                    }}
                    className="card-button"
                    onClick={() => handleQuizClick(quiz.quizId)}
                  >
                    Start {quiz.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentQuizPage;
