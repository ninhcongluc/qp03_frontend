import React, { useState, useEffect } from 'react';
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




const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
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
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="student-do-quiz">
        
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
                  <Typography variant="h6">Quiz Navigation</Typography>
                  <Box className="quiz-navigation">
                    {quizData.questions.map((question, index) => (
                      <Button
                        key={question.questionId}
                        variant={answers[question.questionId] ? 'contained' : 'outlined'}
                        onClick={() => setCurrentQuestion(index)}
                        color="primary"
                      >
                        {question.questionId}
                      </Button>
                    ))}
                  </Box>
                  <Typography variant="h6" align="center" mt={2}>
                    Time left: {formatTime(timeLeft)}
                  </Typography>
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
