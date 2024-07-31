import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MenuComponent from "../../components/LeftMenu/Menu";

// Mock data for exam schedules
const mockExamSchedules = [
  { id: 1, subjectCode: "ACC101", subjectName: "Principles of Accounting", date: "23/07/2024", roomNo: "AL-R205", time: "12h50-14h20", examForm: "Multiple choices ", exam: "FE", dateOfPublication: "27/07/2024" },
  { id: 2, subjectCode: "SWR302", subjectName: "Software Requirement", date: "24/07/2024", roomNo: "BE-316", time: "12h50-14h20", examForm: "Practical exam (PEA client)", exam: "FE", dateOfPublication: "29/07/2024" },
  // Add more data as needed...
];

const ExamSchedule = () => {
  const [examSchedules] = useState(mockExamSchedules);

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "70px", marginTop:"-30%"}}>
        <Typography variant="h4" gutterBottom className="exam-schedule-title">
          Exam Schedules
        </Typography>
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
            }}
            className="exam-schedule-table-container"
          >
            <Table stickyHeader className="exam-schedule-table">
              <TableHead className="exam-schedule-table-head">
                <TableRow className="exam-schedule-table-row">
                  <TableCell className="exam-schedule-table-cell">NO</TableCell>
                  <TableCell className="exam-schedule-table-cell">SUBJECT CODE</TableCell>
                  <TableCell className="exam-schedule-table-cell">SUBJECT NAME</TableCell>
                  <TableCell className="exam-schedule-table-cell">DATE</TableCell>
                 
                  <TableCell className="exam-schedule-table-cell">TIME</TableCell>
                  <TableCell className="exam-schedule-table-cell">EXAM FORM</TableCell>
                 
                  
                </TableRow>
              </TableHead>
              <TableBody className="exam-schedule-table-body">
                {examSchedules.map((schedule, index) => (
                  <TableRow key={schedule.id} className={`exam-schedule-table-row-${index}`}>
                    <TableCell className="exam-schedule-table-cell">{index + 1}</TableCell>
                    <TableCell className="exam-schedule-table-cell">{schedule.subjectCode}</TableCell>
                    <TableCell className="exam-schedule-table-cell">{schedule.subjectName}</TableCell>
                    <TableCell className="exam-schedule-table-cell">{schedule.date}</TableCell>
                   
                    <TableCell className="exam-schedule-table-cell">{schedule.time}</TableCell>
                    <TableCell className="exam-schedule-table-cell">{schedule.examForm}</TableCell>
                   
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default ExamSchedule;
