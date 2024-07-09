import React, { useState } from "react";
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


const StudentGrade = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const gradesPerPage = 7;

  // Dữ liệu cứng để hiển thị
  const hardcodedGrades = [
    {
      id: 1,
      courseName: "Math 101",
      lecture: "Dr. Smith",
      average: 85,
      classId: "08541cd5-5d62-4eed-9b96-ce706e7e9b81",
    },
    {
      id: 2,
      courseName: "PHYS 101",
      lecture: "Prof. Johnson", 
      average: 78,
      classId: "513d7a7c-8407-45c6-8c2c-5a98453e158f",
    },
    {
      id: 3,
      courseName: "CHEM 101",
      lecture: "Dr. Lee",
      average: 92,
      classId: "7d221d68-0b1a-442e-b01c-4884da50a325",
    },
    {
      id: 4,
      courseName: "BIOL 101",
      lecture: "Ms. Williams",
      average: 83,
      classId: "ef0038cc-9419-4814-a849-7def86523daf",
    },
    {
      id: 5,
      courseName: "Computer Science 202",
      lecture: "Prof. Chen",
      average: 87,
      classId: "105",
    },
    {
      id: 6,
      courseName: "Physics 410",
      lecture: "Dr. Nguyen",
      average: 90,
      classId: "106",
    },
    {
      id: 7,
      courseName: "Economics 250",
      lecture: "Prof. Sharma",
      average: 81,
      classId: "107",
    },
    {
      id: 8,
      courseName: "Art History 320",
      lecture: "Ms. Gonzalez",
      average: 88,
      classId: "108",
    },
    {
      id: 9,
      courseName: "Psychology 201",
      lecture: "Dr. Kim",
      average: 84,
      classId: "109",
    },
    {
      id: 10,
      courseName: "Sociology 305",
      lecture: "Prof. Patel",
      average: 79,
      classId: "110",
    },
    {
      id: 11,
      courseName: "Accounting 240",
      lecture: "Ms. Tanaka",
      average: 86,
      classId: "111",
    },
    {
      id: 12,
      courseName: "Music Theory 180",
      lecture: "Dr. Kowalski",
      average: 92,
      classId: "112",
    },
    {
      id: 13,
      courseName: "Business 301",
      lecture: "Prof. Fernandez",
      average: 85,
      classId: "113",
    },
    {
      id: 14,
      courseName: "Chemistry 401",
      lecture: "Dr. Zhao",
      average: 88,
      classId: "114",
    },
    {
      id: 15,
      courseName: "Classics 250",
      lecture: "Ms. Morales",
      average: 82,
      classId: "115",
    }
  ];

  const [grades] = useState(hardcodedGrades);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleReviewClick = (classId) => {
    navigate(`/student/course-management/class/${classId}`);
  };

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }} >
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
                          onClick={() => handleReviewClick(grade.classId)}
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
              count={Math.ceil(grades.length / gradesPerPage)}
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