import React, { useState } from "react";
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
} from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";
import "./StudentDoQuiz.css";

// Data for quiz PT1 of ACC101
const quizQuestions = [
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
  
];

const StudentDoQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container className="student-do-quiz-container">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="student-do-quiz-title"
        >
          Quiz PT1 - ACC101
        </Typography>

        {quizQuestions.map((question) => (
          <Box key={question.id} className="student-do-quiz-question">
            <FormControl component="fieldset">
              <FormLabel component="legend">{question.question}</FormLabel>
              <RadioGroup
                name={`question_${question.id}`}
                value={answers[question.id] || ""}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="student-do-quiz-options"
              >
                {question.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                    disabled={submitted}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}

        {!submitted && (
          <Box className="student-do-quiz-button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="student-do-quiz-button"
            >
              Submit
            </Button>
          </Box>
        )}

        {submitted && (
          <Box className="student-do-quiz-results">
            <Typography variant="h6" gutterBottom>
              Quiz Results
            </Typography>
            {quizQuestions.map((question) => (
              <Typography key={question.id} variant="body1">
                {question.question} - Your answer: {answers[question.id]} -{" "}
                {answers[question.id] === question.correctAnswer
                  ? "Correct"
                  : "Incorrect"}
              </Typography>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StudentDoQuiz;
