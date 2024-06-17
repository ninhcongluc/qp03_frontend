import React, { useState } from "react";
import StudentMenu from "../../components/LeftMenu/StudentMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CourseCard from "../../components/Card/StudentCourseCard";


const courses = [
  {
    code: "SE1848-SAP_SWR301",
    image: "https://via.placeholder.com/150",
    instructor: "TriTD",
   
  },
];


const ClassSWR302 = () => {
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;

  const pageCount = Math.ceil(courses.length / coursesPerPage);

  const displayedCourses = courses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
    <StudentMenu />
    <Container sx={{ mt: 4, position: 'relative', height: '100vh', left: -345, }}>
      <Grid container spacing={4} sx={{  top: 50, left: -20 }}>
        {displayedCourses.map((course, index) => (
          <Grid item key={index} xs={12}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </div>
  );
};

export default ClassSWR302;
