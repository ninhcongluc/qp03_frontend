import { Box, Button, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentQuizDetail.css";
import MenuComponent from "../../components/LeftMenu/Menu";
import ApiInstance from "../../axios";

const StudentQuizDetail = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [quizStatus, setQuizStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ApiInstance.get(`/quiz/${quizId}/history`)
      .then((response) => {
        console.log("data", response.data.data);
        setQuizData(response.data.data);
        const quizResults = response.data.data?.studentQuizResults;
        if (quizResults && quizResults.length > 0) {
          setQuizStatus(quizResults[quizResults.length - 1].status);
        }
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [quizId]);

  const handleStartQuiz = async () => {
    try {
      if (quizStatus === "doing") {
        const { studentQuizResults } = quizData;
        const quizResultId = studentQuizResults[studentQuizResults.length - 1].id;
        navigate(`/student/quiz-detail/${quizId}/do-quiz/${quizResultId}?status=continue`);
        return;
      }

      const response = await ApiInstance.post(`/quiz/${quizId}/start-quiz`);
      const { id: quizResultId } = response.data.data;
      navigate(`/student/quiz-detail/${quizId}/do-quiz/${quizResultId}`);
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const handleReviewAttempt = (attemptId) => {
    navigate(`/student/quiz-review/${attemptId}`);
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const highestGrade = Math.max(...(quizData.studentQuizResults?.map(data => data.score) || [0]));

  return (
    <Box sx={{ display: "flow" }} style={{width:'140%', maxHeight: '100vh'}}>
      <MenuComponent role="student" />
      <Container className="quiz-detail-container">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h3" align="center" gutterBottom className="quiz-detail-title">
            {quizData?.name}
          </Typography>

          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Time limit:</strong> {quizData?.timeLimitMinutes} mins
          </Typography>

          <Typography variant="body1" sx={{ color: "black" }}>
            <strong>Grading method:</strong> Highest grade
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Attempt</strong></TableCell>
                  <TableCell><strong>State</strong></TableCell>
                  <TableCell><strong>Marks / 16.00</strong></TableCell>
                  <TableCell><strong>Grade / 10.00</strong></TableCell>
                  <TableCell><strong>Review</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizData.studentQuizResults?.map((data, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {data.status} <br />
                     
                    </TableCell>
                    <TableCell>{data.numberCorrectAnswers}</TableCell>
                    <TableCell>{data.score}</TableCell>
                    <TableCell>
                      {quizData.showAnswer && (
                        <Button onClick={() => handleReviewAttempt(data.id)} color="primary">
                          Review
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body1" sx={{ color: "black", marginTop: 2 }}>
            Highest grade: {highestGrade} / 10.00
          </Typography>

          <Button
            variant="contained"
            color={quizStatus === "doing" ? "error" : "primary"}
            onClick={handleStartQuiz}
            className="quiz-detail-start-button"
            sx={{ marginTop: 2, width:'30%', marginLeft:'70%' }}
            
          >
            {quizStatus === "doing" ? "Continue" : "Start"}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentQuizDetail;
