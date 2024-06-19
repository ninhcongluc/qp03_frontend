import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";

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
  const { courseId, quizId, page } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentPageIndex = parseInt(page, 10) - 1;
  const currentQuestion = quizQuestions[currentPageIndex];

  const handleChange = (value) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    navigate(`/student/quiz-management/class/${courseId}/${quizId}/start&page=${currentQuestion.id + 1}`);
  };

  const handleFinish = () => {
    setSubmitted(true);
  };

  if (!currentQuestion) {
    return <Typography variant="body1">No more questions.</Typography>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container sx={{ flexGrow: 1, mt: 3, mb: 3 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Quiz PT1 - ACC101
        </Typography>

        <Box sx={{ mb: 3 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{currentQuestion.question}</FormLabel>
            <RadioGroup
              name={`question_${currentQuestion.id}`}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleChange(e.target.value)}
            >
              {currentQuestion.options.map((option, index) => (
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

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {currentPageIndex < quizQuestions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ mt: 3 }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinish}
              sx={{ mt: 3 }}
            >
              Finish
            </Button>
          )}
        </Box>

        {submitted && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quiz Results
            </Typography>
            {quizQuestions.map((question) => (
              <Typography key={question.id} variant="body1">
                {question.question} - Your answer: {answers[question.id]} - {answers[question.id] === question.correctAnswer ? "Correct" : "Incorrect"}
              </Typography>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StudentDoQuiz;
