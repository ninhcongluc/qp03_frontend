import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Pagination,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuComponent from "../../components/LeftMenu/Menu";
import { Box } from "@mui/system";
import "./StudentQuizPage.css";

const quizData = [
  {
    id: "4713fc09-2967-4e59-a832-04db1379baad",
    courseId: "ACC 101",
    courseName: "Accounting Principles",
    class: "1848",
    lecture: "HungNP2804",
    quizzes: [
      {
        quizId: "PT1",
        title: "Quiz PT1",
        timeLimit: "30 minutes",
        description:
          "Anh Đạt đẹp trai nhất vũ trụ, đó là key word để lấy 10 điểm",
      },
      {
        quizId: "PT2",
        title: "Quiz PT2",
        timeLimit: "45 minutes",
        description: "Second quiz description here.",
      },
      {
        quizId: "PT3",
        title: "Quiz PT3",
        timeLimit: "60 minutes",
        description: "Third quiz description here.",
      },
      {
        quizId: "PT4",
        title: "Quiz PT4",
        timeLimit: "60 minutes",
        description: "Third quiz description here.",
      },
      {
        quizId: "Mid Terms",
        title: "Mid Terms",
        timeLimit: "90 minutes",
        description: "Midterm exam description here.",
      },
      {
        quizId: "Final Exam",
        title: "Final Exam",
        timeLimit: "120 minutes",
        description: "Final exam description here.",
      },
    ],
  },
  {
    id: "f5a016b9-97c2-4832-ba68-490d8825225e",
    courseId: "SWR 302",
    courseName: "Software Engineering",
    class: "1848",
    lecture: "HungNP2804",
    quizzes: [
      {
        quizId: "PT1",
        title: "Quiz PT1",
        timeLimit: "30 minutes",
        description: "First quiz description here.",
      },
      {
        quizId: "PT2",
        title: "Quiz PT2",
        timeLimit: "45 minutes",
        description: "Second quiz description here.",
      },
      {
        quizId: "PT3",
        title: "Quiz PT3",
        timeLimit: "60 minutes",
        description: "Third quiz description here.",
      },
      {
        quizId: "Mid Terms",
        title: "Mid Terms",
        timeLimit: "90 minutes",
        description: "Midterm exam description here.",
      },
      {
        quizId: "Final Exam",
        title: "Final Exam",
        timeLimit: "120 minutes",
        description: "Final exam description here.",
      },
    ],
  },
  // Thêm các khóa học và bài kiểm tra khác ở đây
];

const StudentQuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseQuiz = quizData.find((data) => data.id === courseId);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  if (!courseQuiz) {
    return <Typography>No quizzes available for this course.</Typography>;
  }

  const handleQuizClick = (quizId) => {
    navigate(`/student/course-management/class/${courseId}/${quizId}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedQuizzes = courseQuiz.quizzes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <MenuComponent role="student" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Container
          className="quiz-page-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
            maxWidth: "100%", // Tùy chỉnh theo kích thước mong muốn
          }}
        >
          <div className="quiz-page-title-container">
            <Typography variant="h5" className="quiz-page-title" gutterBottom>
              {courseQuiz.courseName} - {courseQuiz.courseId}
            </Typography>
            <Typography variant="h8" className="quiz-page-title" gutterBottom>
              Class: {courseQuiz.class}
            </Typography>
            <Typography variant="h8" className="quiz-page-title" gutterBottom>
              Lecture: {courseQuiz.lecture}
            </Typography>
          </div>
          <Grid container className="quiz-page-grid-container" spacing={2}>
            {paginatedQuizzes.map((quiz) => (
              <Grid
                item
                className="quiz-page-grid-item"
                key={quiz.quizId}
                xs={12}
                sm={10}
                md={4}
              >
                <Card
                  className="quiz-page-card"
                  style={{ marginBottom: "10px" }}
                >
                  <CardContent
                    className="quiz-page-card-content"
                    style={{ marginBottom: "10px" }}
                  >
                    <Typography
                      variant="h6"
                      className="quiz-page-card-title"
                      style={{ marginBottom: "10px" }}
                    >
                      {quiz.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="quiz-page-card-time"
                      style={{ marginBottom: "10px" }}
                    >
                      Time: {quiz.timeLimit}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="quiz-page-card-description"
                      style={{ marginBottom: "50px" }}
                    >
                      Description: {quiz.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        "&:hover": { backgroundColor: "darkpink" },
                      }}
                      className="quiz-page-card-button"
                      onClick={() => handleQuizClick(quiz.quizId)}
                    >
                      Start
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(courseQuiz.quizzes.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 4 }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default StudentQuizPage;
