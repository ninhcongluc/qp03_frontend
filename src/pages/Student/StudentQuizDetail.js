import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";
import "./StudentQuizDetail.css";

const quizDetailData = {
  ACC101: {
    PT1: {
      title: "Quiz PT1",
      duration: "30 minutes",
      passingScore: "70%",
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
    PT2: {
      title: "Quiz PT2",
      duration: "40 minutes",
      passingScore: "75%",
      history: [
        {
          attemptId: 1,
          state: "Completed",
          score: 90,
          grade: "A",
        },
      ],
    },
  },
  SWR302: {
    PT1: {
      title: "Quiz PT1",
      duration: "45 minutes",
      passingScore: "80%",
      history: [
        {
          attemptId: 1,
          state: "Completed",
          score: 88,
          grade: "A",
        },
        {
          attemptId: 2,
          state: "Completed",
          score: 82,
          grade: "A",
        },
      ],
    },
  },
};

const StudentQuizDetail = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [quizDetail, setQuizDetail] = useState(null);

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        // Simulate fetching data from an API
        const data = quizDetailData[courseId]?.[quizId] || null;
        setQuizDetail(data);
      } catch (error) {
        console.error("Error fetching quiz detail:", error);
      }
    };

    fetchQuizDetail();
  }, [courseId, quizId]);

  const handleStartQuiz = () => {
    navigate(`/student/quiz-management/class/${courseId}/${quizId}/start`);
  };

  const handleReviewAttempt = (attemptId) => {
    navigate(`/student/course-management/quiz/${courseId}/${quizId}/review`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container className="quiz-detail-container">
        {quizDetail ? (
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
                <Typography variant="body1" sx= {{ color: 'black'}}>
                  <strong>Duration:</strong> {quizDetail.duration} 
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Passing Score:</strong> {quizDetail.passingScore}
                </Typography>
              </Grid>
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
          <Typography variant="body1">Loading quiz detail...</Typography>
        )}
      </Container>
    </Box>
  );
};

export default StudentQuizDetail;
