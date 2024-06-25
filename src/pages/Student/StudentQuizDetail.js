import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";
import "./StudentQuizDetail.css"; // Assuming you have a CSS file for styling

const quizData = [
  {
    id: "4713fc09-2967-4e59-a832-04db1379baad",
    courseId: "ACC 101",
    quizzes: [
      {
        quizId: "PT1",
        title: "Quiz PT1",
        duration: "30 minutes",
        passingScore: 50,
        history: [
          {
            attemptId: 1,
            state: "Completed",
            score: 85,
            grade: "A",
          },
          {
            attemptId: 2,
            state: "Completed",
            score: 75,
            grade: "B",
          },
        ],
      },
      // ...
    ],
  },
  // ...
];

const StudentQuizDetail = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [quizDetail, setQuizDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const course = quizData.find((course) => course.id === courseId);
    if (course) {
      const quiz = course.quizzes.find((quiz) => quiz.quizId === quizId);
      setQuizDetail(quiz);
    }
    setIsLoading(false);
  }, [courseId, quizId]);

  const handleStartQuiz = () => {
    navigate(`/student/course-management/class/${courseId}/${quizId}/start`);
  };

  const handleReviewAttempt = (attemptId) => {
    navigate(`/student/course-management/class/${courseId}/${quizId}/review`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container className="quiz-detail-container">
        {isLoading ? (
          <Typography variant="body1">Loading quiz detail...</Typography>
        ) : quizDetail ? (
          <>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              className="quiz-detail-title"
            >
              {quizDetail.title}
            </Typography>

            <Grid container spacing={3} className="quiz-detail-grid">
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "black" }}>
                  <strong>Duration:</strong> {quizDetail.duration}
                </Typography>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>

            <Typography
              variant="h6"
              gutterBottom
              className="quiz-detail-history-title"
            >
              History
            </Typography>
            <Box className="quiz-detail-history">
              <ul style={{ padding: 0 }}>
                {quizDetail.history.map((attempt, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    <Typography>
                      <strong>Attempt:</strong> {attempt.attemptId} -{" "}
                      <strong>State:</strong> {attempt.state} -{" "}
                      <strong>Marks:</strong> {attempt.score} -{" "}
                      <strong>Grade:</strong> {attempt.grade}{" "}
                      <a
                        href
                        onClick={() => handleReviewAttempt(attempt.attemptId)}
                        className="quiz-detail-review-link"
                      >
                        Review
                      </a>
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleStartQuiz}
              className="quiz-detail-start-button"
            >
              Start
            </Button>
          </>
        ) : (
          <p>No quiz data found for this course and quiz ID.</p>
        )}
      </Container>
    </Box>
  );
};

export default StudentQuizDetail;
