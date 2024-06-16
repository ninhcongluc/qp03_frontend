import React, { useState } from "react";
import StudentMenu from "../../components/LeftMenu/StudentMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CourseCard from "../../components/Card/StudentCourseCard";


const courses = [
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "SE1809-NET",
   
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "SE1848-SAP",
    
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "SE1849-SAP",
    
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "SE1850-SAP",
    
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "SE1815-NET",
    
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "SE1831-NJ",
   
  },

];


const ListClassSWP391 = () => {
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

export default ListClassSWP391;
