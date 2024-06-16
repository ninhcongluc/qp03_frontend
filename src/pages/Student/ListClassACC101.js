import React, { useState } from "react";
import StudentMenu from "../../components/LeftMenu/StudentMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CourseCard from "../../components/Card/StudentCourseCard";


const courses = [
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "MKT1915",
   
  },
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "SE1848-SAP",
    
  },
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "SE1849-SAP",
  
  },
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "SE1850-SAP",
    
  },
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "MKT1902",
    
  },
  {
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "MKT1916",
   
  },

];


const ListClassACC101 = () => {
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

export default ListClassACC101;
