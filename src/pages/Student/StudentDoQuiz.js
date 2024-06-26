
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
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
  Button,
} from '@mui/material';
import './StudentDoQuiz.css';
import StudentMenu from '../../components/LeftMenu/StudentMenu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const quizData = {
  courseName: 'ACC101',
  courseTitle: 'Accounting Principles',
  quizId: 'PT1',
  quizName: 'Practice Test 1',
  questions: [
    {
      questionId: 1,
      question: 'What is the primary purpose of financial accounting?',
      options: [
        'To track personal expenses',
        'To prepare tax returns',
        'To provide financial information to external users',
        'To manage internal business operations',
      ],
      correctAnswer: 'To provide financial information to external users',
    },
    {
      questionId: 2,
      question: 'Which of the following is considered a current asset?',
      options: ['Buildings', 'Equipment', 'Accounts Receivable', 'Land'],
      correctAnswer: 'Accounts Receivable',
    },
  ],
};

const StudentDoQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, quizData.questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    setSubmitted(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="student-do-quiz">
        <StudentMenu/>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h3" align="center">
                    {quizData.courseName} {quizData.courseTitle} - {quizData.quizName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Question {currentQuestion + 1}
                  </Typography>
                  <Typography variant="body1">
                    {quizData.questions[currentQuestion]?.question}
                  </Typography>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Choose one:</FormLabel>
                    <RadioGroup
                      name={`question_${quizData.questions[currentQuestion]?.questionId}`}
                      value={answers[quizData.questions[currentQuestion]?.questionId] || ''}
                      onChange={(e) => handleChange(quizData.questions[currentQuestion]?.questionId, e.target.value)}
                    >
                      {quizData.questions[currentQuestion]?.options.map((option, index) => (
                        <FormControlLabel
                          key={index}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <Box mt={2}>
                    <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
                      Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentQuestion === quizData.questions.length - 1}>
                      Next
                    </Button>
                    <Button onClick={handleFinish} disabled={submitted}>
                      Submit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Results</Typography>
                  {submitted && (
                    <Box>
                      {quizData.questions.map((question) => (
                        <Typography key={question.questionId} variant="body2">
                          Question {question.questionId}: {answers[question.questionId] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                        </Typography>
                      ))}
                    </Box>
                  )}
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
