import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentQuizDetail.css";
import MenuComponent from "../../components/LeftMenu/Menu";
import ApiInstance from "../../axios";

const StudentQuizDetail = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [quizStatus, setQuizStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ApiInstance.get(`/quiz/${quizId}/history`)
      .then((response) => {
        console.log("data", response.data.data);
        setQuizData(response.data.data);
        const quizResults = response.data.data?.studentQuizResults;
        setQuizStatus(quizResults[quizResults.length - 1].status);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [quizId]);

  const handleStartQuiz = async () => {
    try {
      if (quizStatus === "doing") {
        const { studentQuizResults } = quizData;
        console.log("🚀 ~ handleStartQuiz ~ quizData:", quizData);
        const quizResultId =
          studentQuizResults[studentQuizResults.length - 1].id;
        navigate(
          `/student/quiz-detail/${quizId}/do-quiz/${quizResultId}?status=continue`
        );
        return;
      }

      const response = await ApiInstance.post(`/quiz/${quizId}/start-quiz`);
      const { id: quizResultId } = response.data.data;
      navigate(`/student/quiz-detail/${quizId}/do-quiz/${quizResultId}`);
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const handleReviewAttempt = (attemptId) => {
    navigate(`/student/quiz-review/${attemptId}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MenuComponent role="student" />

      <Container className="quiz-detail-container">
        <>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            className="quiz-detail-title"
          >
            {quizData?.name}
          </Typography>

          <Grid container spacing={3} className="quiz-detail-grid">
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "black" }}>
                <strong>Duration:</strong> {quizData?.timeLimitMinutes}'
              </Typography>

              <Typography variant="body1" sx={{ color: "black" }}>
                <strong>Max Attempts:</strong>{" "}
                {quizData?.maxAttempts || "No limit"}
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
              {quizData?.studentQuizResults?.map((data, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  <Typography>
                    <strong>Attempt:</strong> {index + 1} -{" "}
                    <strong>State:</strong> {data?.status} -{" "}
                    <strong>Marks:</strong> {data?.numberCorrectAnswers}/
                    {quizData?.numberOfQuestions} - <strong>Grade:</strong>{" "}
                    {data.score}{" "}
                    {quizData.showAnswer && data.status === "done" && (
                      <a
                        href
                        onClick={() => handleReviewAttempt(data.id)}
                        className="quiz-detail-review-link"
                      >
                        Review
                      </a>
                    )}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Button
            variant="contained"
            color={quizStatus === "doing" ? "error" : "primary"}
            onClick={handleStartQuiz}
            className="quiz-detail-start-button"
            disabled={
              quizData?.maxAttempts > 1 &&
              quizData?.studentQuizResults?.length >= quizData?.maxAttempts
            }
          >
            {quizStatus === "doing" ? "Continue" : "Start"}
          </Button>

          {quizData?.maxAttempts > 1 &&
            quizData?.studentQuizResults?.length >= quizData?.maxAttempts && (
              <Typography variant="body1" sx={{ color: "red" }}>
                You have reached your limit for the number of attempts{" "}
              </Typography>
            )}
        </>
      </Container>
    </Box>
  );
};

export default StudentQuizDetail;
