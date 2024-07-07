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
    FormControl,
  } from "@mui/material";
  import React, { useState } from "react";
  
  const ManagementGrade = ({ data }) => {
    const [selectedClass, setSelectedClass] = useState("");
    
    const handleClassChange = (event) => {
      setSelectedClass(event.target.value);
    };
  
    const filteredData = data.filter((item) => item.classId === selectedClass);
  
    return (
      <Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="select-class-label">Select Class</InputLabel>
            <Select
              labelId="select-class-label"
              id="select-class"
              value={selectedClass}
              label="Select Class"
              onChange={handleClassChange}
            >
              {data.map((item, index) => (
                <MenuItem key={index} value={item.classId}>
                  {item.className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            height: "540px",
            width: "1200px",
            marginLeft: "270px"
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
                  <TableCell>{grade.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default ManagementGrade;
  