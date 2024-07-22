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
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ApiInstance from "../../axios";
import { formatDate } from "../../commons/function";

const ManagementGrade = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [classData, setClassData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedScore, setSelectedScore] = useState("all");
  const [scoreData, setScoreData] = useState([
    { id: "all", name: "All Students" },
    { id: "0-5", name: "0 - 5" },
    { id: "5-6.5", name: "5 - 6.5" },
    { id: "6.5-8", name: "6.5 - 8" },
    { id: "8-10", name: "8 - 10" },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    ApiInstance.get(`/class/list-by-teacher/${userInfo.id}`)
      .then((response) => {
        console.log("25", response.data.data);
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
          let filteredData = response.data.data;
          if (selectedScore !== "all") {
            filteredData = filteredData.filter((student) => {
              const score = student.score;
              switch (selectedScore) {
                case "0-5":
                  return score < 5;
                case "5-6.5":
                  return score >= 5 && score < 6.5;
                case "6.5-8":
                  return score >= 6.5 && score < 8;
                case "8-10":
                  return score >= 8 && score <= 10;
                default:
                  return true;
              }
            });
          }
          setData(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedClass, selectedQuiz, selectedScore]);

  const handleClassChange = (event) => {
    console.log(event.target.value);
    setSelectedClass(event.target.value);
  };

  const handleQuizChange = (event) => {
    console.log(event.target.value);
    setSelectedQuiz(event.target.value);
  };

  const handleScoreChange = (event) => {
    console.log(event.target.value);
    setSelectedScore(event.target.value);
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
        <Box display="flex" alignItems="center" ml={2}>
          <InputLabel id="select-score-label" style={{ marginRight: "8px" }}>
            Select Score
          </InputLabel>
          <Select
            labelId="select-score-label"
            id="select-score"
            value={selectedScore}
            label="Select Score"
            onChange={handleScoreChange}
          >
            {scoreData.map((score, index) => (
              <MenuItem key={index} value={score.id}>
                {score.name}
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
    </Box>
  );
};

export default ManagementGrade;
