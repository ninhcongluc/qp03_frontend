import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Stack,
} from "@mui/material";
import MenuComponent from "../../components/LeftMenu/Menu";
// import ApiInstance from "../../axios";

const StudentGrade = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  // const [grades, setGrades] = useState([]);
  const [totalGrades, setTotalGrades] = useState(0);
  const gradesPerPage = 7;

  // Dữ liệu cứng để hiển thị
  const hardcodedGrades = [
    {
      id: 1,
      courseName: "Math 101",
      lecture: "Dr. Smith",
      average: 85,
      quizId: 101,
    },
    {
      id: 2,
      courseName: "History 201",
      lecture: "Prof. Johnson", 
      average: 78,
      quizId: 102,
    },
    {
      id: 3,
      courseName: "Biology 301",
      lecture: "Dr. Lee",
      average: 92,
      quizId: 103,
    },
    {
      id: 4,
      courseName: "English 150",
      lecture: "Ms. Williams",
      average: 83,
      quizId: 104,
    },
    {
      id: 5,
      courseName: "Computer Science 202",
      lecture: "Prof. Chen",
      average: 87,
      quizId: 105,
    },
    {
      id: 6,
      courseName: "Physics 410",
      lecture: "Dr. Nguyen",
      average: 90,
      quizId: 106,
    },
    {
      id: 7,
      courseName: "Economics 250",
      lecture: "Prof. Sharma",
      average: 81,
      quizId: 107,
    },
    {
      id: 8,
      courseName: "Art History 320",
      lecture: "Ms. Gonzalez",
      average: 88,
      quizId: 108,
    },
    {
      id: 9,
      courseName: "Psychology 201",
      lecture: "Dr. Kim",
      average: 84,
      quizId: 109,
    },
    {
      id: 10,
      courseName: "Sociology 305",
      lecture: "Prof. Patel",
      average: 79,
      quizId: 110,
    },
    {
      id: 11,
      courseName: "Accounting 240",
      lecture: "Ms. Tanaka",
      average: 86,
      quizId: 111,
    },
    {
      id: 12,
      courseName: "Music Theory 180",
      lecture: "Dr. Kowalski",
      average: 92,
      quizId: 112,
    },
    {
      id: 13,
      courseName: "Business 301",
      lecture: "Prof. Fernandez",
      average: 85,
      quizId: 113,
    },
    {
      id: 14,
      courseName: "Chemistry 401",
      lecture: "Dr. Zhao",
      average: 88,
      quizId: 114,
    },
    {
      id: 15,
      courseName: "Classics 250",
      lecture: "Ms. Morales",
      average: 82,
      quizId: 115,
    }
  ];

  const [grades] = useState(hardcodedGrades);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleReviewClick = (classId) => {
    navigate(`/student/course-management/class/${classId}`);
  };

  const pageCount = Math.ceil(totalGrades / gradesPerPage);

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }}>
        <Typography variant="h4" gutterBottom className="student-grade-title">
          Student Grades
        </Typography>
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              height: "540px",
              width: "1000px",
              marginTop: "20px",
            }}
            className="student-grade-table-container"
          >
            <Table stickyHeader className="student-grade-table">
              <TableHead className="student-grade-table-head">
                <TableRow className="student-grade-table-row">
                  <TableCell className="student-grade-table-cell">No</TableCell>
                  <TableCell className="student-grade-table-cell">Course Name</TableCell>
                  <TableCell className="student-grade-table-cell">Lecture</TableCell>
                  <TableCell className="student-grade-table-cell">Grade</TableCell>
                  <TableCell className="student-grade-table-cell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="student-grade-table-body">
                {grades
                  .slice((page - 1) * gradesPerPage, page * gradesPerPage)
                  .map((grade, index) => (
                    <TableRow
                      key={grade.id}
                      className={`student-grade-table-row-${index}`}
                    >
                      <TableCell className="student-grade-table-cell">
                        {(page - 1) * gradesPerPage + index + 1}
                      </TableCell>
                      <TableCell className="student-grade-table-cell">
                        {grade.courseName}
                      </TableCell>
                      <TableCell className="student-grade-table-cell">
                        {grade.lecture}
                      </TableCell>
                      <TableCell className="student-grade-table-cell">
                        {grade.average.toFixed(2)}
                      </TableCell>
                      <TableCell className="student-grade-table-cell">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className="student-grade-review-button"
                          onClick={() => handleReviewClick(grade.quizId)}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            spacing={2}
            sx={{ marginTop: 4, alignItems: "center" }}
            className="student-grade-pagination"
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              className="student-grade-pagination-control"
            />
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default StudentGrade;
