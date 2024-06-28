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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
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
      questionId: 1,
      question: "Which is the largest continent by area?",
      options: ["Africa", "Asia", "Europe", "North America"],
      correctAnswer: "Asia",
      yourAnswer: "Asia",
    },
    {
      questionId: 2,
      question: "Which country is the largest producer of coffee?",
      options: ["Colombia", "Vietnam", "Ethiopia", "Brazil"],
      correctAnswer: ["Brazil"],
      yourAnswer: ["Brazil", "Vietnam"],
      multipleAnswers: true,
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

  const isCorrectAnswer = (question) => {
    if (question.multipleAnswers) {
      return (
        question.yourAnswer.sort().toString() ===
        question.correctAnswer.sort().toString()
      );
    }
    return question.yourAnswer === question.correctAnswer;
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

            <Grid item xs={7}>
              <Card className="quiz-review-question-card">
                <CardContent>
                  <Typography
                    variant="h6"
                    className="quiz-review-question-number"
                  >
                    Question {currentQuestion + 1}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="quiz-review-question-text"
                  >
                    {quizReviewData.questions[currentQuestion]?.question}
                  </Typography>

                  <FormControl
                    component="fieldset"
                    className="quiz-review-options"
                  >
                    <FormLabel component="legend">Options:</FormLabel>
                    {quizReviewData.questions[currentQuestion]
                      ?.multipleAnswers ? (
                      quizReviewData.questions[currentQuestion]?.options.map(
                        (option, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={quizReviewData.questions[
                                  currentQuestion
                                ]?.yourAnswer.includes(option)}
                                disabled
                              />
                            }
                            label={option}
                          />
                        )
                      )
                    ) : (
                      <RadioGroup
                        value={
                          quizReviewData.questions[currentQuestion]?.yourAnswer
                        }
                        disabled
                      >
                        {quizReviewData.questions[currentQuestion]?.options.map(
                          (option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={<Radio />}
                              label={option}
                              disabled
                            />
                          )
                        )}
                      </RadioGroup>
                    )}
                  </FormControl>

                  <Typography
                    variant="body1"
                    className="quiz-review-your-answer"
                  >
                    Your Answer:{" "}
                    {quizReviewData.questions[
                      currentQuestion
                    ]?.yourAnswer.toString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="quiz-review-correct-answer"
                  >
                    Correct Answer:{" "}
                    {quizReviewData.questions[
                      currentQuestion
                    ]?.correctAnswer.toString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={
                      isCorrectAnswer(quizReviewData.questions[currentQuestion])
                        ? "quiz-review-answer-status quiz-review-correct-answer"
                        : "quiz-review-answer-status quiz-review-wrong-answer"
                    }
                  >
                    {isCorrectAnswer(quizReviewData.questions[currentQuestion])
                      ? "Correct"
                      : "Incorrect"}
                  </Typography>

                  <Box mt={2} className="quiz-review-navigation-buttons">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="quiz-review-previous-button"
                    ></Button>
                    <Button
                      onClick={handleNext}
                      disabled={
                        currentQuestion === quizReviewData.questions.length - 1
                      }
                      className="quiz-review-next-button"
                    ></Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={5}>
              <Card className="quiz-review-navigation-card">
                <CardContent>
                  <Typography
                    variant="h6"
                    className="quiz-review-navigation-title"
                  >
                    Quiz Navigation
                  </Typography>
                  <Box className="quiz-review-navigation">
                    {quizReviewData.questions.map((question, index) => (
                      <Button 
                        key={question.questionId}
                        variant={
                          currentQuestion === index ? "contained" : "outlined"
                        }
                        onClick={() => setCurrentQuestion(index)} 
                        className={`quiz-review-navigation-button ${
                          isCorrectAnswer(question) ? "correct" : "incorrect"
                        }`}
                      >
                        {question.questionId}
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
