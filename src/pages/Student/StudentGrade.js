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
import ApiInstance from "../../axios";

const StudentGrade = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [grades, setGrades] = useState([]);
  const [totalGrades, setTotalGrades] = useState(0);
  const gradesPerPage = 7;

  const fetchGrades = async (page, limit) => {
    try {
      const response = await ApiInstance.get(
        `/student-grades?page=${page}&limit=${limit}`
      );
      setGrades(response.data.data);
      setTotalGrades(response.data.data.total);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  useEffect(() => {
    fetchGrades(page, gradesPerPage);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleReviewClick = (quizId) => {
    navigate(`/student/quiz-detail/${quizId}`);
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
                  <TableCell className="student-grade-table-cell">
                    Course Name
                  </TableCell>
                  <TableCell className="student-grade-table-cell">
                    Lecture
                  </TableCell>
                  <TableCell className="student-grade-table-cell">
                    Grade
                  </TableCell>
                  <TableCell className="student-grade-table-cell">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="student-grade-table-body">
                {grades
                  ?.slice((page - 1) * gradesPerPage, page * gradesPerPage)
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
                        {grade.score.toFixed(2)}
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
