import React, { useState } from "react";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CourseCard from "../../components/Card/StudentCourseCard";

const courses = [
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "HungNP30",
  },
  {
    code: "SWR302",
    image: "https://via.placeholder.com/150",
    instructor: "TriTD",
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "ThanHDT59",
  },
  {
    code: "SWT301",
    image: "https://via.placeholder.com/150",
    instructor: "NangNTH",
  },
  {
    code: "MAS291",
    image: "https://via.placeholder.com/150",
    instructor: "LongDQ",
  },
  {
    code: "PRJ301",
    image: "https://via.placeholder.com/150",
    instructor: "SonNT5",
  },
  {
    code: "CS107",
    image: "https://via.placeholder.com/150",
    instructor: "Anna Blue",
  },
  {
    code: "CS108",
    image: "https://via.placeholder.com/150",
    instructor: "Tom Brown",
  },
  {
    code: "CS109",
    image: "https://via.placeholder.com/150",
    instructor: "John Green",
  },
  {
    code: "CS110",
    image: "https://via.placeholder.com/150",
    instructor: "Jane Red",
  },
  {
    code: "CS111",
    image: "https://via.placeholder.com/150",
    instructor: "James Purple",
  },
  {
    code: "CS112",
    image: "https://via.placeholder.com/150",
    instructor: "Emily Yellow",
  },
];

const StudentCourseListPage = () => {
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;

  // Tính toán số lượng trang
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  // Lấy các khóa học cho trang hiện tại
  const displayedCourses = courses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <TeacherMenu />
      <Container>
        <Grid container spacing={4}>
          {displayedCourses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CourseCard course={course} />
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
      </Container>
    </div>
  );
};

export default StudentCourseListPage;
