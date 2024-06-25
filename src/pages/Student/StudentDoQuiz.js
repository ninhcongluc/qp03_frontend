import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";
import "./StudentDoQuiz.css";

const quizQuestionsData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ["Shakespeare", "Hemingway", "Dickens", "Twain"],
    correctAnswer: "Shakespeare",
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 5,
    question: "What is the chemical symbol for the element Oxygen?",
    options: ["O", "Ox", "Oy", "Om"],
    correctAnswer: "O",
  },
  {
    id: 6,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
    correctAnswer: "Japan",
  },
  {
    id: 7,
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    id: 8,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 9,
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
  },
  {
    id: 10,
    question: "What is the smallest planet in our solar system?",
    options: ["Earth", "Mars", "Mercury", "Venus"],
    correctAnswer: "Mercury",
  },
];

const StudentDoQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    // Simulating fetching quiz questions from an API or local storage
    setQuizQuestions(quizQuestionsData);
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, quizQuestions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container>
        <Grid container spacing={3}>
          {/* Card 1: Quiz Title */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h3" align="center">
                  Probability and Statistics - MAS291
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: Question and Options */}
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Question {currentQuestion + 1}
                </Typography>
                <Typography variant="body1">
                  {quizQuestions.length > 0 &&
                    quizQuestions[currentQuestion].question}
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select one:</FormLabel>
                  <RadioGroup
                    name={`question_${quizQuestions.length > 0 &&
                      quizQuestions[currentQuestion].id}`}
                    value={
                      answers[
                        quizQuestions.length > 0 &&
                          quizQuestions[currentQuestion].id
                      ] || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        quizQuestions.length > 0 &&
                          quizQuestions[currentQuestion].id,
                        e.target.value
                      )
                    }
                  >
                    {quizQuestions.length > 0 &&
                      quizQuestions[currentQuestion].options.map(
                        (option, index) => (
                          <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={option}
                            disabled={submitted}
                          />
                        )
                      )}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3: Quiz Navigation */}
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quiz Navigation
                </Typography>
                <Box>
                  {quizQuestions.length > 0 &&
                    quizQuestions.map((_, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        color={
                          currentQuestion === index ? "primary" : "default"
                        }
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                </Box>
                {!submitted ? (
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFinish}
                      style={{ marginTop: "20px" }}
                    >
                      Finish
                    </Button>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    style={{ marginTop: "20px" }}
                  >
                    Quiz completed!
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentQuestion === quizQuestions.length - 1}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDoQuiz;
