import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import LeftMenu from "../../components/LeftMenu/StudentMenu";
import "./StudentQuizReview.css";

const quizReviewData = [
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
];

const StudentQuizReview = () => {
  const { courseId, quizId } = useParams();

  // Assuming quizTitle is derived or fetched based on courseId and quizId
  const quizTitle = `Quiz Review - ${courseId} - ${quizId}`;

  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
      <Container className="quiz-review-container">
        <Typography variant="h3" className="student-quiz-review-title">
          {quizTitle}
        </Typography>

        <Box className="quiz-cards-container">
          {quizReviewData.map((item) => (
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
