import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
} from "@mui/material";
import "./StudentDoQuiz.css";
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

const quizData = {
  courseName: "ACC101",
  courseTitle: "Accounting Principles",
  quizId: "PT1",
  quizName: "Practice Test 1",
  questions: [
    {
      questionId: 1,
      question: "Which is the largest continent by area?",
      options: ["Africa", "Asia", "Europe", "North America"],
      correctAnswer: "Asia",
    },
    {
      questionId: 2,
      question: "What is the longest river in the world?",
      options: [
        "Amazon River",
        "Nile River",
        "Yangtze River",
        "Mississippi River",
      ],
      correctAnswer: "Nile River",
    },
    {
      questionId: 3,
      question: "Which country has the largest population?",
      options: ["United States", "India", "China", "Indonesia"],
      correctAnswer: "China",
    },
    {
      questionId: 4,
      question: "Which is the smallest country in the world by area?",
      options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
      correctAnswer: "Vatican City",
    },
    {
      questionId: 5,
      question: "Which desert is the largest in the world?",
      options: [
        "Sahara Desert",
        "Arabian Desert",
        "Gobi Desert",
        "Kalahari Desert",
      ],
      correctAnswer: "Sahara Desert",
    },
    {
      questionId: 6,
      question: "What is the capital city of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correctAnswer: "Canberra",
    },
    {
      questionId: 7,
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctAnswer: "Japan",
    },
    {
      questionId: 8,
      question: "Which ocean is the deepest in the world?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Southern Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
    {
      questionId: 9,
      question: "What is the official language of Brazil?",
      options: ["Spanish", "Portuguese", "French", "English"],
      correctAnswer: "Portuguese",
    },
    {
      questionId: 10,
      question: "Which country is home to the ancient city of Petra?",
      options: ["Egypt", "Jordan", "Turkey", "Greece"],
      correctAnswer: "Jordan",
    },
    // New multiple-choice question
    {
      questionId: 11,
      question: "Select two countries in South America:",
      options: ["Brazil", "Canada", "Argentina", "Australia"],
      correctAnswer: ["Brazil", "Argentina"],
      multipleAnswers: true,
    },
    // New multiple-choice question
    {
      questionId: 12,
      question: "Select two programming languages:",
      options: ["Python", "HTML", "JavaScript", "CSS"],
      correctAnswer: ["Python", "JavaScript"],
      multipleAnswers: true,
    },
  ],
};

const StudentDoQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (questionId, value, isMultiple = false) => {
    setAnswers((prevAnswers) => {
      if (isMultiple) {
        const currentAnswers = prevAnswers[questionId] || [];
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
    setSubmitted(true);
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
        <StudentMenu />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Card  className="quiz-header">
                <CardContent>
                  <Typography
                    variant="h3"
                    align="center"
                    className="quiz-title"
                  >
                    {quizData.courseName} {quizData.courseTitle} -{" "}
                    {quizData.quizName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={8}>
              <Card className="question-card">
                <CardContent>
                  <Typography variant="h6" className="question-number">
                    Question {currentQuestion + 1}
                  </Typography>
                  <Typography variant="body1" className="question-text">
                    {quizData.questions[currentQuestion]?.question}
                  </Typography>
                  <FormControl component="fieldset" className="options-form">
                    <FormLabel component="legend">Choose one:</FormLabel>
                    {quizData.questions[currentQuestion]?.multipleAnswers ? (
                      quizData.questions[currentQuestion]?.options.map(
                        (option, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={
                                  answers[
                                    quizData.questions[currentQuestion]
                                      ?.questionId
                                  ]?.includes(option) || false
                                }
                                onChange={(e) =>
                                  handleChange(
                                    quizData.questions[currentQuestion]
                                      ?.questionId,
                                    option,
                                    true
                                  )
                                }
                              />
                            }
                            label={option}
                            className="option"
                          />
                        )
                      )
                    ) : (
                      <RadioGroup
                        name={`question_${quizData.questions[currentQuestion]?.questionId}`}
                        value={
                          answers[
                            quizData.questions[currentQuestion]?.questionId
                          ] || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            quizData.questions[currentQuestion]?.questionId,
                            e.target.value
                          )
                        }
                      >
                        {quizData.questions[currentQuestion]?.options.map(
                          (option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={<Radio />}
                              label={option}
                              className="option"
                            />
                          )
                        )}
                      </RadioGroup>
                    )}
                  </FormControl>
                  <Box mt={2} className="navigation-buttons">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="previous-button"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={
                        currentQuestion === quizData.questions.length - 1
                      }
                      className="next-button"
                    >
                      Next
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card className="navigation-card">
                <CardContent>
                  <Typography variant="h6" className="navigation-title">
                    Quiz Navigation
                  </Typography>
                  <Box className="quiz-navigation">
                    {quizData.questions.map((question, index) => (
                      <Button
                        key={question.questionId}
                        variant={
                          answers[question.questionId]
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => setCurrentQuestion(index)}
                        color="primary"
                        className="navigation-button"
                      >
                        {question.questionId}
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
                  <Typography
                    variant="h18"
                    className={`timer ${timeLeft <= 5 * 60 ? "timer-red" : ""}`}
                    mt={2}
                  >
                    Time Remaining: {formatTime(timeLeft)}
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

export default StudentDoQuiz;
