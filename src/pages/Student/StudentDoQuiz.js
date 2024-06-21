import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { courseId, quizId, page } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentPageIndex = parseInt(page, 10) - 1;
  const currentQuestion = quizQuestions[currentPageIndex];

  useEffect(() => {
    if (submitted) {
      navigate(`/student/course-management/quiz/${courseId}/${quizId}/results`);
    }
  }, [submitted, courseId, quizId, navigate]);

  const handleChange = (value) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    navigate(
      `/student/course-management/quiz/${courseId}/${quizId}/start&page=${currentPageIndex + 2}`
    );
  };

  const handlePrevious = () => {
    navigate(
      `/student/course-management/quiz/${courseId}/${quizId}/start&page=${currentPageIndex}`
    );
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
      <Container className="student-do-quiz-container">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="student-do-quiz-title"
        >
          Quiz PT1 - ACC101
        </Typography>

        <Box className="student-do-quiz-question">
          <FormControl component="fieldset">
            <FormLabel component="legend">{currentQuestion.question}</FormLabel>
            <RadioGroup
              name={`question_${currentQuestion.id}`}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="student-do-quiz-options"
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

        <Box className="student-do-quiz-button-container">
          {currentPageIndex > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevious}
              className="student-do-quiz-button"
            >
              Previous
            </Button>
          )}
          {currentPageIndex < quizQuestions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className="student-do-quiz-button"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinish}
              className="student-do-quiz-button"
            >
              Finish
            </Button>
          )}
        </Box>

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
