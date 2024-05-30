import React, { useState } from "react";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TeacherCourseCard from "../../components/Card/TeacherCourseCard";

const courses = [
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    startDate: "2024-06-01",
    studentCount: 30,
  },
  {
    code: "SWR302",
    image: "https://via.placeholder.com/150",
    startDate: "2024-07-15",
    studentCount: 25,
  },
  // Thêm dữ liệu các khóa học khác nếu cần
];

const TeacherCourseListPage = () => {
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
      </Container>
    </div>
  );
};

export default TeacherCourseListPage;
