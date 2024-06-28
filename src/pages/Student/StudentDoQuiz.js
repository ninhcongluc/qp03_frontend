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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
      question: "Which country is the largest producer of coffee?",
      options: ["Colombia", "Vietnam", "Ethiopia", "Brazil"],
      correctAnswer: ["Brazil"],
      multipleAnswers: true,
    },
    // New multiple-choice question
    {
      questionId: 11,
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
      correctAnswer: "Mount Everest",
    },
    {
      questionId: 12,
      question: "What is the capital city of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      correctAnswer: "Ottawa",
    },
    {
      questionId: 13,
      question: "Which is the largest island in the world?",
      options: ["Borneo", "Greenland", "New Guinea", "Madagascar"],
      correctAnswer: "Greenland",
    },
    {
      questionId: 14,
      question: "What is the longest wall in the world?",
      options: [
        "Berlin Wall",
        "Great Wall of China",
        "Hadrian's Wall",
        "Western Wall",
      ],
      correctAnswer: "Great Wall of China",
    },
    {
      questionId: 15,
      question: "Which country has the largest number of lakes?",
      options: ["Canada", "United States", "Finland", "Russia"],
      correctAnswer: "Canada",
    },
    {
      questionId: 16,
      question: "Which is the largest ocean in the world?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
    {
      questionId: 17,
      question: "What is the largest country in the world by area?",
      options: ["China", "Canada", "Russia", "United States"],
      correctAnswer: "Russia",
    },
    {
      questionId: 18,
      question: "Which river flows through Paris?",
      options: ["Seine", "Thames", "Danube", "Rhone"],
      correctAnswer: "Seine",
    },
    {
      questionId: 19,
      question: "What is the smallest continent by area?",
      options: ["Antarctica", "Europe", "Australia", "South America"],
      correctAnswer: "Australia",
    },
    {
      questionId: 20,
      question: "Which is the most spoken language in the world?",
      options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
      correctAnswer: "Mandarin Chinese",
    },
    {
      questionId: 21,
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Dollar"],
      correctAnswer: "Yen",
    },
    {
      questionId: 22,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      questionId: 23,
      question: "What is the largest mammal in the world?",
      options: [
        "African Elephant",
        "Blue Whale",
        "Giraffe",
        "White Rhinoceros",
      ],
      correctAnswer: "Blue Whale",
    },
    {
      questionId: 24,
      question: "Which country is famous for the Eiffel Tower?",
      options: ["Germany", "Italy", "Spain", "France"],
      correctAnswer: "France",
    },
    {
      questionId: 25,
      question: "What is the hottest planet in the solar system?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      correctAnswer: "Venus",
    },
    {
      questionId: 26,
      question: "Which is the most populated city in the world?",
      options: ["New York", "Shanghai", "Tokyo", "Mumbai"],
      correctAnswer: "Tokyo",
    },
    {
      questionId: 27,
      question: "What is the official language of Egypt?",
      options: ["English", "French", "Arabic", "Spanish"],
      correctAnswer: "Arabic",
    },
    {
      questionId: 28,
      question: "Which country is known as the Land of the Midnight Sun?",
      options: ["Sweden", "Norway", "Finland", "Denmark"],
      correctAnswer: "Norway",
    },
    {
      questionId: 29,
      question: "What is the largest rainforest in the world?",
      options: [
        "Congo Rainforest",
        "Amazon Rainforest",
        "Daintree Rainforest",
        "Valdivian Rainforest",
      ],
      correctAnswer: "Amazon Rainforest",
    },
    {
      questionId: 30,
      question: "Which is the smallest planet in our solar system?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      correctAnswer: "Mercury",
    },
    {
      questionId: 31,
      question: "Which country has the most volcanoes?",
      options: ["Indonesia", "Japan", "United States", "Philippines"],
      correctAnswer: "Indonesia",
    },
    {
      questionId: 32,
      question: "What is the capital city of Brazil?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
      correctAnswer: "Brasília",
    },
    {
      questionId: 33,
      question: "Which country is known for the Great Barrier Reef?",
      options: ["New Zealand", "Australia", "Indonesia", "Philippines"],
      correctAnswer: "Australia",
    },
    {
      questionId: 34,
      question: "Which river is the longest in Africa?",
      options: ["Congo River", "Zambezi River", "Niger River", "Nile River"],
      correctAnswer: "Nile River",
    },
    {
      questionId: 35,
      question: "What is the currency of the United Kingdom?",
      options: ["Euro", "Dollar", "Pound Sterling", "Yen"],
      correctAnswer: "Pound Sterling",
    },
    {
      questionId: 36,
      question: "Which desert is the hottest in the world?",
      options: [
        "Gobi Desert",
        "Sahara Desert",
        "Arabian Desert",
        "Mojave Desert",
      ],
      correctAnswer: "Sahara Desert",
    },
    {
      questionId: 37,
      question: "What is the capital city of Italy?",
      options: ["Rome", "Venice", "Florence", "Milan"],
      correctAnswer: "Rome",
    },
    {
      questionId: 38,
      question: "Select countries in North America:",
      options: ["Brazil", "Canada", "Argentina", "Australia"],
      correctAnswer: "Canada",
    },
    {
      questionId: 39,
      question: "Select two countries in South America:",
      options: ["Brazil", "Canada", "Argentina", "Australia"],
      correctAnswer: ["Brazil", "Argentina"],
      multipleAnswers: true,
    },

    // New multiple-choice question
    {
      questionId: 40,
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
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!submitted) {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

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
    if (currentQuestion === quizData.questions.length - 1) {
      setSubmitted(true);
    } else {
      setConfirmSubmit(true);
    }
  };

  const handleConfirmSubmit = () => {
    setSubmitted(true);
    setConfirmSubmit(false);
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
        <StudentMenu />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Card className="do-quiz-header">
                <CardContent>
                  <Typography
                    variant="h3"
                    align="center"
                    className="do-quiz-title"
                  >
                    {quizData.courseName} {quizData.courseTitle} -{" "}
                    {quizData.quizName}
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
                    {quizData.questions[currentQuestion]?.question}
                  </Typography>
                  <FormControl component="fieldset" className="do-quiz-options-form">
                    {quizData.questions[currentQuestion]?.multipleAnswers ? (
                      <FormLabel component="legend">Choose multiple:</FormLabel>
                    ) : (
                      <FormLabel component="legend">Choose one:</FormLabel>
                    )}
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
                        key={question.questionId}
                        variant={
                          answers[question.questionId]
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => setCurrentQuestion(index)}
                        color="primary"
                        className="do-quiz-navigation-button"
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

                  <Typography variant="h6" mt={2}>
                    Time Remaining:{" "}
                    <span
                      className={`timer ${
                        timeLeft <= 5 * 60 ? "timer-red" : ""
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
          <Typography>
            You have not completed all questions. Are you sure you want to
            submit?
          </Typography>
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
