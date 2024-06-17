import React, { useState } from "react";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TeacherCourseCard from "../../components/Card/TeacherCourseCard";
import "./TeacherCourseList.css";
import TextField from "@mui/material/TextField";

const courses = [
  {
  id: "4713fc09-2967-4e59-a832-04db1379baad",
  code: "ACC101",
  description: "Introductory Accounting",
  semesterName: "Fall 2024",
  startDate: "2024-06-01",
  studentCount: 30,
  },
  {
  id: "f5a016b9-97c2-4832-ba68-490d8825225e",
  code: "SWR302",
  description: "Advanced Software Engineering",
  semesterName: "Spring 2024",
  startDate: "2024-01-01",
  studentCount: 30,
  },
  {
  id: "84ec946c-7b70-45c5-9ac5-7c6123644e4b",
  code: "ECO201",
  description: "Principles of Macroeconomics",
  semesterName: "Fall 2024",
  startDate: "2024-06-01",
  studentCount: 30,
  },
  {
  id: "5e7fbf37-4a7e-4a82-b298-8cbcba4a0c6b",
  code: "BIO150",
  description: "General Biology",
  semesterName: "Spring 2024",
  startDate: "2024-01-01",
  studentCount: 30,
  },
  {
  id: "a2c5ea9e-4d7b-4e18-82fc-d0a269acaf5a",
  code: "CSC110",
  description: "Introduction to Computer Science",
  semesterName: "Fall 2024",
  startDate: "2024-06-01",
  studentCount: 30,
  },
  {
  id: "8e9be1a0-cef6-4893-8a0d-e37d6e8abc11",
  code: "ENG201",
  description: "English Composition",
  semesterName: "Spring 2024",
  startDate: "2024-01-01",
  studentCount: 30,
  },
  {
  id: "c4ac0d73-a279-4e91-9d67-5f4b35032766",
  code: "MAT201",
  description: "Calculus I",
  semesterName: "Fall 2024",
  startDate: "2024-06-01",
  studentCount: 30,
  },
  {
  id: "f6b44d20-3fa2-476a-8c6c-1c4cdf79b6c1",
  code: "HIS101",
  description: "World History to 1500",
  semesterName: "Spring 2024",
  startDate: "2024-01-01",
  studentCount: 30,
  },
  {
  id: "3b5b2e2c-aa54-4e9a-8f9a-d6a6f5ba9d31",
  code: "PHY101",
  description: "Introduction to Physics",
  semesterName: "Fall 2024",
  startDate: "2024-06-01",
  studentCount: 30,
  },
  {
  id: "7d1f2a9a-d2d4-4d06-b2c9-84e991f2aa69",
  code: "ART120",
  description: "Art Appreciation",
  semesterName: "Spring 2024",
  startDate: "2024-01-01",
  studentCount: 30,
  },
  ];

const TeacherCourseListPage = () => {
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;
  const [filterCode, setFilterCode] = useState("");

  // Tính toán số lượng trang
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  // Lấy các khóa học cho trang hiện tại
  const displayedCourses = courses
    .filter((course) =>
      course.code.toLowerCase().includes(filterCode.toLowerCase())
    )
    .slice((page - 1) * coursesPerPage, page * coursesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterCodeChange = (event) => {
    setFilterCode(event.target.value);
    setPage(1); // Reset to the first page when filtering
  };

  return (
    <Container>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        <Grid item xs={3}>
          <TeacherMenu />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                label="Search by Course Code"
                variant="outlined"
                value={filterCode}
                onChange={handleFilterCodeChange}
                fullWidth
              />
            </Grid>
            {displayedCourses.map((course, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <TeacherCourseCard course={course} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherCourseListPage;