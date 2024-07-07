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
  import React, { useState } from "react";
  
  const ManagementGrade = ({ data }) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState("");
  
    // Lấy danh sách các lớp và quiz duy nhất
    const uniqueClasses = Array.from(new Set(data.map((item) => item.classId)));
    const uniqueQuizzes = Array.from(new Set(data.map((item) => item.quizName)));
  
    const handleClassChange = (event) => {
      setSelectedClass(event.target.value);
    };
  
    const handleQuizChange = (event) => {
      setSelectedQuiz(event.target.value);
    };
  
    const filteredData = data.filter((item) => {
      return (
        (!selectedClass || item.classId === selectedClass) &&
        (!selectedQuiz || item.quizName === selectedQuiz)
      );
    });
  
    return (
      <Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" mr={1}>
            <InputLabel className="table-label-selectClass" id="select-class-label">
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
              {uniqueClasses.map((classId, index) => (
                <MenuItem key={index} value={classId}>
                  {data.find((item) => item.classId === classId)?.className}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box display="flex" alignItems="center" ml={2}>
            <InputLabel id="select-quiz-label" style={{ marginRight: "8px" }}>Select Quiz</InputLabel>
            <Select
              labelId="select-quiz-label"
              id="select-quiz"
              value={selectedQuiz}
              label="Select Quiz"
              onChange={handleQuizChange}
            >
              {uniqueQuizzes.map((quizName, index) => (
                <MenuItem key={index} value={quizName}>
                  {quizName}
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
                {filteredData.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{grade.studentName}</TableCell>
                    <TableCell>{grade.studentId}</TableCell>
                    <TableCell>{grade.quizName}</TableCell>
                    <TableCell>{grade.state}</TableCell>
                    <TableCell>{grade.submissionTime}</TableCell>
                    <TableCell>{grade.score.toFixed(2)}</TableCell>
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