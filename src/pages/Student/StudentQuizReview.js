import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import "./StudentQuizReview.css";
import StudentMenu from "../../components/LeftMenu/StudentMenu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

const quizReviewData = {
  quizName: "Practice Test 1",
  score: 8, // Assume a score out of 10
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      yourAnswer: "Paris",
      isCorrect: true,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      yourAnswer: "Earth",
      isCorrect: false,
    },
    {
      id: 3,
      question: 'Who wrote "Romeo and Juliet"?',
      yourAnswer: "Shakespeare",
      isCorrect: true,
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      yourAnswer: "Atlantic Ocean",
      isCorrect: false,
    },
    {
      id: 5,
      question: "Which is the largest desert in the world?",
      yourAnswer: "Sahara Desert",
      isCorrect: true,
    },
    {
      id: 6,
      question: "What is the currency of Japan?",
      yourAnswer: "Yen",
      isCorrect: true,
    },
    {
      id: 7,
      question: "Who painted the Mona Lisa?",
      yourAnswer: "Leonardo da Vinci",
      isCorrect: true,
    },
    {
      id: 8,
      question: "Which country is known as the Land of the Rising Sun?",
      yourAnswer: "Japan",
      isCorrect: true,
    },
    {
      id: 9,
      question: "What is the largest mammal in the world?",
      yourAnswer: "Blue Whale",
      isCorrect: true,
    },
    {
      id: 10,
      question: "Which country has the largest population?",
      yourAnswer: "China",
      isCorrect: true,
    },
  ],
};

const StudentQuizReview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    setCurrentQuestion((prev) =>
      Math.min(prev + 1, quizReviewData.questions.length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="student-quiz-review">
        <StudentMenu />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Card className="quiz-review-header">
                <CardContent>
                  <Typography
                    variant="h3"
                    align="center"
                    className="quiz-title"
                  >
                    Review {quizReviewData.quizName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card className="quiz-review-question-card">
                <CardContent>
                  <Typography variant="h6" className="quiz-review-question-number">
                    Question {currentQuestion + 1}
                  </Typography>
                  <Typography variant="body1" className="quiz-review-question-text">
                    {quizReviewData.questions[currentQuestion]?.question}
                  </Typography>
                  <Typography variant="body1" className="quiz-review-your-answer">
                    Your Answer:{" "}
                    {quizReviewData.questions[currentQuestion]?.yourAnswer}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={
                      quizReviewData.questions[currentQuestion]?.isCorrect
                        ? "quiz-review-answer-status quiz-review-correct-answer"
                        : "quiz-review-answer-status quiz-review-wrong-answer"
                    }
                  >
                    {quizReviewData.questions[currentQuestion]?.isCorrect
                      ? "Correct"
                      : "Incorrect"}
                  </Typography>

                  <Box mt={2} className="quiz-review-navigation-buttons">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="quiz-review-previous-button"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={
                        currentQuestion === quizReviewData.questions.length - 1
                      }
                      className="quiz-review-next-button"
                    >
                      Next
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={5}>
              <Card className="quiz-review-navigation-card">
                <CardContent>
                  <Typography variant="h6" className="quiz-review-navigation-title">
                    Quiz Navigation
                  </Typography>
                  <Box className="quiz-review-navigation">
                    {quizReviewData.questions.map((question, index) => (
                      <Button
                        key={question.id}
                        variant={
                          currentQuestion === index ? "contained" : "outlined"
                        }
                        onClick={() => setCurrentQuestion(index)}
                        className={`quiz-review-navigation-button ${
                          question.isCorrect
                            ? "correct"
                            : "incorrect"
                        }`}
                      >
                        {question.id}
                      </Button>
                    ))}
                  </Box>
                  <Typography
                    variant="h5"
                    align="center"
                    className="quiz-review-final-score"
                  >
                    Final Score: {quizReviewData.score}/10
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default StudentQuizReview;
