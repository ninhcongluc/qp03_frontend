import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate, useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import { toast } from "react-toastify";

import {
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Grid,
  Button,
  Radio,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./StudentDoQuiz.css";
import MenuComponent from "../../components/LeftMenu/Menu";

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

const StudentDoQuiz = () => {
  const { quizId, quizResultId } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [quizData, setQuizData] = useState({ questions: [] });
  const [autoSaveInterval, setAutoSaveInterval] = useState(null);
  const status = new URLSearchParams(window.location.search).get("status");

  const navigate = useNavigate();

  useEffect(() => {
    ApiInstance.get(`/quiz/${quizId}/question-answers`)
      .then((response) => {
        setQuizData(response.data.data);
        setTimeLeft(response?.data?.data?.timeLimitMinutes * 60);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [quizId]);

  useEffect(() => {
    ApiInstance.get(`/student-quiz-result/${quizResultId}`)
      .then((response) => {
        if (status === "continue") {
          const formattedAnswers = response.data.data.answers.reduce(
            (acc, curr) => {
              acc[curr.questionId] = curr.answerOptionIds;
              return acc;
            },
            {}
          );
          setAnswers(formattedAnswers);
          if (response.data.data.timeLeft > 0) {
            setTimeLeft(response.data.data.timeLeft);
          } else {
            setTimeLeft(quizData.timeLimitMinutes * 60);
          }
        } else {
          setTimeLeft(quizData.timeLimitMinutes * 60);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [quizResultId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!submitted) {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            handleConfirmSubmit(); // Tự động nộp bài khi hết thời gian
            clearInterval(timer);
            return 0;
          }
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  useEffect(() => {
    const handleAutoSave = async () => {
      try {
        const body = {
          quizResultId,
          answers,
          timeLeft,
        };
        await ApiInstance.post(`/quiz/${quizId}/auto-save-answers`, body);
      } catch (error) {
        console.error("Error saving answers:", error);
      }
    };

    const interval = setInterval(handleAutoSave, 10000); // 10 seconds
    setAutoSaveInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [quizResultId, answers]);

  const handleChange = (questionId, value, isMultiple = false) => {
    setAnswers((prevAnswers) => {
      if (isMultiple) {
        const currentAnswers = prevAnswers[questionId] || [];
        console.log("currentAnswers", currentAnswers);
        const newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter((answer) => answer !== value)
          : [...currentAnswers, value];
        return {
          ...prevAnswers,
          [questionId]: newAnswers,
        };
      } else {
        return {
          ...prevAnswers,
          [questionId]: value,
        };
      }
    });
  };

  const handleNext = () => {
    setCurrentQuestion((prev) =>
      Math.min(prev + 1, quizData.questions.length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    // if (Object.keys(answers).length === quizData.questions.length) {
    //   setSubmitted(true);
    // } else {
    //   setConfirmSubmit(true);
    // }

    setConfirmSubmit(true);
  };

  const handleConfirmSubmit = async () => {
    const body = {
      quizResultId,
      answers,
    };
    try {
      await ApiInstance.post(`/quiz/${quizId}/submit`, body);
      setSubmitted(true);
      setConfirmSubmit(false);
      navigate(`/student/quiz-detail/${quizId}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmSubmit(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="student-do-quiz">
        <MenuComponent role="student" />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <Card className="do-quiz-header">
                <CardContent>
                  <Typography
                    variant="h3"
                    align="center"
                    className="do-quiz-title"
                  >
                    {quizData?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={8}>
              <Card className="do-quiz-question-card">
                <CardContent>
                  <Typography variant="h6" className="do-quiz-question-number">
                    Question {currentQuestion + 1}
                  </Typography>
                  <Typography variant="body1" className="do-quiz-question-text">
                    {quizData?.questions[currentQuestion]?.text}
                  </Typography>
                  <FormControl
                    component="fieldset"
                    className="do-quiz-options-form"
                  >
                    {quizData?.questions[currentQuestion]?.type ===
                    "multiple_choice" ? (
                      <FormLabel component="legend">Choose multiple:</FormLabel>
                    ) : (
                      <FormLabel component="legend">Choose one:</FormLabel>
                    )}
                    {quizData?.questions[currentQuestion]?.type ===
                    "multiple_choice" ? (
                      quizData.questions[currentQuestion]?.answerOptions?.map(
                        (option) => (
                          <FormControlLabel
                            key={option.id}
                            control={
                              <Checkbox
                                checked={
                                  answers[
                                    quizData.questions[currentQuestion]?.id
                                  ]?.includes(option.id) || false
                                }
                                onChange={(e) =>
                                  handleChange(
                                    quizData.questions[currentQuestion]?.id,
                                    option.id,
                                    true
                                  )
                                }
                              />
                            }
                            label={option.optionText}
                            className="option"
                          />
                        )
                      )
                    ) : (
                      <RadioGroup
                        name={`question_${quizData.questions[currentQuestion]?.id}`}
                        value={
                          answers[quizData.questions[currentQuestion]?.id] || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            quizData.questions[currentQuestion]?.id,
                            e.target.value
                          )
                        }
                      >
                        {quizData.questions[
                          currentQuestion
                        ]?.answerOptions?.map((option) => (
                          <FormControlLabel
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={option.optionText}
                            className="option"
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </FormControl>

                  <Box mt={2} className="do-quiz-navigation-buttons">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="previous-button"
                    ></Button>
                    <Button
                      onClick={handleNext}
                      disabled={
                        currentQuestion === quizData.questions.length - 1
                      }
                      className="next-button"
                    ></Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card className="do-quiz-navigation-card">
                <CardContent>
                  <Typography variant="h28" className="navigation-title">
                    Quiz Navigation
                  </Typography>
                  <Box className="do-quiz-navigation">
                    {quizData.questions.map((question, index) => (
                      <Button
                        key={question.id}
                        variant={
                          answers[question.id] ? "contained" : "outlined"
                        }
                        onClick={() => setCurrentQuestion(index)}
                        color="primary"
                        className="do-quiz-navigation-button"
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </Box>
                  <Button
                    onClick={handleFinish}
                    disabled={submitted}
                    className="submit-button"
                  >
                    Submit
                  </Button>

                  <Typography variant="h6" mt={2}>
                    Time Remaining:{" "}
                    <span
                      className={`timer ${
                        timeLeft <= quizData.timeLimitMinutes ? "timer-red" : ""
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Dialog open={confirmSubmit} onClose={handleCancelSubmit}>
        <DialogTitle>Confirm Submit</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit the quiz?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Submit Anyway
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default StudentDoQuiz;
