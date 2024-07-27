import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Button,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ApiInstance from "../../axios";
import { formatDate } from "../../commons/function";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ManagementGrade = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [classData, setClassData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [data, setData] = useState([]);
  const [showStatisticsDialog, setShowStatisticsDialog] = useState(false);

  useEffect(() => {
    ApiInstance.get(`/class/list-by-teacher/${userInfo.id}`)
      .then((response) => {
        setClassData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedClass !== "") {
      ApiInstance.get(`/quiz/${selectedClass}`)
        .then((response) => {
          setQuizData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass !== "" && selectedQuiz !== "") {
      ApiInstance.get(`/quiz/${selectedQuiz}/student-grades`)
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedClass, selectedQuiz]);

  const handleClassChange = (event) => {
    console.log(event.target.value);
    setSelectedClass(event.target.value);
  };

  const handleQuizChange = (event) => {
    console.log(event.target.value);
    setSelectedQuiz(event.target.value);
  };

  const generateScoreDistribution = () => {
    console.log(data);
    const scoreDistribution = Array(11).fill(0); // Initialize an array with 11 zeros (0-10)

    data.forEach((item) => {
      const score = Math.floor(item.score);
      scoreDistribution[score]++;
    });

    const rs = scoreDistribution.map((count, index) => ({
      score: index,
      students: count,
    }));
    console.log("rs", rs);
    return rs;
  };

  const handleViewStatistic = () => {
    setShowStatisticsDialog(true);
  };

  const handleCloseStatisticsDialog = () => {
    setShowStatisticsDialog(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" mr={1}>
          <InputLabel
            className="table-label-selectClass"
            id="select-class-label"
          >
            Select Class
          </InputLabel>
          <Select
            labelId="select-class-label"
            id="select-class"
            value={selectedClass}
            label="Select Class"
            onChange={handleClassChange}
            style={{ marginLeft: "8px" }}
          >
            {classData.map((classInfo, index) => (
              <MenuItem key={index} value={classInfo.id}>
                {classInfo.code} - {classInfo?.course.code}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" alignItems="center" ml={2}>
          <InputLabel id="select-quiz-label" style={{ marginRight: "8px" }}>
            Select Quiz
          </InputLabel>
          <Select
            labelId="select-quiz-label"
            id="select-quiz"
            value={selectedQuiz}
            label="Select Quiz"
            onChange={handleQuizChange}
          >
            {quizData.map((quiz, index) => (
              <MenuItem key={index} value={quiz.id}>
                {quiz.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      {selectedClass && selectedQuiz ? (
        <TableContainer
          component={Paper}
          sx={{
            height: "540px",
            width: "1200px",
            marginLeft: "270px",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>StudentID</TableCell>
                <TableCell>QuizName</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Submission Time</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.studentName}</TableCell>
                  <TableCell>{item.studentId}</TableCell>
                  <TableCell>{item.quizName}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{formatDate(item.submitTime)}</TableCell>
                  <TableCell>{item.score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            height: "540px",
            width: "1200px",
            marginLeft: "270px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #ccc",
          }}
        >
          <p>No Data</p>
        </Box>
      )}

      <Box display="flex" justifyContent="flex-end" mb={2}>
        {selectedClass && selectedQuiz && (
          <Button
            sx={{ width: 200, marginTop: 2 }}
            variant="contained"
            onClick={handleViewStatistic}
          >
            View Statistic
          </Button>
        )}
      </Box>

      <Dialog
        open={showStatisticsDialog}
        onClose={handleCloseStatisticsDialog}
        maxWidth="xl"
      >
        <DialogTitle>Quiz Statistics</DialogTitle>
        <DialogContent>
          <BarChart width={800} height={400} data={generateScoreDistribution()}>
            <XAxis dataKey="score" />
            <YAxis type="number" domain={[0, "dataMax"]} tickCount={1} />

            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatisticsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagementGrade;
