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
          <p>Tao Đẹp Trai</p>
        </Box>
      )}
    </Box>
  );
};

export default ManagementGrade;
