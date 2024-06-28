import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";
import "./StudentQuizReview.css";

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
  const { quizId } = useParams();

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container className="quiz-review-container">
        <Card className="quiz-review-card">
          <CardContent>
            <Typography variant="h3" className="student-quiz-review-title">
              {quizReviewData.quizName}
            </Typography>
            <Typography variant="h5" className="student-quiz-review-score">
              Score: {quizReviewData.score}/10
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
          {quizReviewData.questions.map((item) => (
            <Card key={item.id} className="quiz-review-card">
              <CardContent>
                <Typography variant="h6" className="question-text">
                  Question {item.id}: {item.question}
                </Typography>
                <Typography variant="body1" className="your-answer">
                  Your Answer: {item.yourAnswer}
                </Typography>
                <Typography
                  variant="body1"
                  className={
                    item.isCorrect
                      ? "answer-status correct-answer"
                      : "answer-status wrong-answer"
                  }
                >
                  {item.isCorrect ? "Correct" : "Incorrect"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default StudentQuizReview;
