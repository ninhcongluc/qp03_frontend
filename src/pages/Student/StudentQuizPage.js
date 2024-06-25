import React from 'react';
import { Button, Grid, Card, CardContent, Typography, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StudentMenu from '../../components/LeftMenu/StudentMenu';
import { Box } from '@mui/system';
import './StudentQuizPage.css';

const quizData = [
  {
    id: '4713fc09-2967-4e59-a832-04db1379baad',
    quizzes: [
      { quizId: 'PT1', title: 'Quiz PT1' },
      { quizId: 'PT2', title: 'Quiz PT2' },
      { quizId: 'PT3', title: 'Quiz PT3' },
      { quizId: 'Mid Terms', title: 'Quiz Mid Terms' },
      { quizId: 'Final Exam', title: 'Quiz Final Exam' },
    ],
  },
  {
    id: 'f5a016b9-97c2-4832-ba68-490d8825225e',
    quizzes: [
      { quizId: 'PT1', title: 'Quiz PT1' },
      { quizId: 'PT2', title: 'Quiz PT2' },
      { quizId: 'PT3', title: 'Quiz PT3' },
      { quizId: 'Mid Terms', title: 'Quiz Mid Terms' },
      { quizId: 'Final Exam', title: 'Quiz Final Exam' },
    ],
  },
  // Thêm các khóa học và bài kiểm tra khác ở đây
];

const StudentQuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseQuiz = quizData.find((data) => data.id === courseId);

  if (!courseQuiz) {
    return <Typography>No quizzes available for this course.</Typography>;
  }

  const handleQuizClick = (quizId) => {
    navigate(`/student/course-management/class/${courseId}/${quizId}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentMenu />
      <Container className="container">
        <Typography variant="h4" className="title" gutterBottom>
          Quizzes for {courseId}
        </Typography>
        <Grid container className="grid-container">
          {courseQuiz.quizzes.map((quiz) => (
            <Grid item className="grid-item" key={quiz.quizId}>
              <Card className="card">
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    {quiz.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkpink' } }}
                    className="card-button"
                    onClick={() => handleQuizClick(quiz.quizId)}
                  >
                    Start {quiz.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentQuizPage;
