import React from 'react';
import { Button, Grid, Card, CardContent, Typography, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StudentMenu from '../../components/LeftMenu/StudentMenu'; // Điều chỉnh đường dẫn tới StudentMenu
import { Box } from '@mui/system'; // Import Box để có thể sử dụng margin
import './StudentQuizPage.css';

const quizData = [
  {
    courseId: 'ACC101',
    quizzes: [
      { quizId: 'PT1', title: 'Quiz PT1' },
      { quizId: 'PT2', title: 'Quiz PT2' },
      { quizId: 'PT3', title: 'Quiz PT3' },
      { quizId: 'Mid Terms', title: 'Quiz Mid Terms' },
      { quizId: 'Final Exam', title: 'Quiz Final Exam' },
    ],
  },
  {
    courseId: 'SWR302',
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
  const courseQuiz = quizData.find((data) => data.courseId === courseId);

  if (!courseQuiz) {
    return <Typography>No quizzes available for this course.</Typography>;
  }

  const handleQuizClick = (quizId) => {
    navigate(`/student/course-management/quiz/${courseId}/${quizId}`);
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