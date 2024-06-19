import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
import FilterSemester from "../../components/Semester/filterSemester";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import TeacherCourseCard from "../../components/Card/TeacherCourseCard";
import "./TeacherCourseList.css";

const TeacherCourseListPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filterCode, setFilterCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 6;
  const teacherId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/course?teacherId=${teacherId}&page=${page}&limit=${coursesPerPage}`
        );
        const data = response.data.data;
        setCourses(data.courses);
        setTotalPages(Math.ceil(data.total / coursesPerPage));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [page, teacherId]);

  const displayedCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(filterCode.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterCodeChange = (event) => {
    setFilterCode(event.target.value);
    setPage(1); // Reset to the first page when filtering
  };

  const handleClickCourseDetail = (courseId) => {
    console.log(courseId);
    navigate(`/teacher/course-management/${courseId}`);
  };
  return (
    <Container>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        <Grid item xs={3}>
          <TeacherMenu />
        </Grid>
        <Grid item xs={9}>
          <div className="TeacherCourseListPage">
            <TextField
              label="Search by Course Code"
              variant="outlined"
              value={filterCode}
              onChange={handleFilterCodeChange}
              className="search-input"
              fullWidth
            />
            <FilterSemester className="filter-semester" />
          </div>
          <Grid container spacing={4}>
            {displayedCourses.map((course, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <TeacherCourseCard
                  onClick={() => handleClickCourseDetail(course.id)}
                  course={course}
                />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
            <Pagination
              count={totalPages}
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
