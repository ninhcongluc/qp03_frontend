import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/LeftMenu/StudentMenu";

const courses = [
  {
    id: "4713fc09-2967-4e59-a832-04db1379baad",
    code: "ACC101",
    description: "Introductory Accounting",
    semesterName: "Fall 2024",
    createdBy: "John Doe",
  },
  {
    id: "f5a016b9-97c2-4832-ba68-490d8825225e",
    code: "SWR302",
    description: "Advanced Software Engineering",
    semesterName: "Spring 2024",
    createdBy: "Jane Smith",
  },
  {
    id: "84ec946c-7b70-45c5-9ac5-7c6123644e4b",
    code: "ECO201",
    description: "Principles of Macroeconomics",
    semesterName: "Fall 2024",
    createdBy: "Michael Johnson",
  },
  {
    id: "5e7fbf37-4a7e-4a82-b298-8cbcba4a0c6b",
    code: "BIO150",
    description: "General Biology",
    semesterName: "Spring 2024",
    createdBy: "Sarah Lee",
  },
  {
    id: "a2c5ea9e-4d7b-4e18-82fc-d0a269acaf5a",
    code: "CSC110",
    description: "Introduction to Computer Science",
    semesterName: "Fall 2024",
    createdBy: "David Kim",
  },
  {
    id: "8e9be1a0-cef6-4893-8a0d-e37d6e8abc11",
    code: "ENG201",
    description: "English Composition",
    semesterName: "Spring 2024",
    createdBy: "Emily Chen",
  },
  {
    id: "c4ac0d73-a279-4e91-9d67-5f4b35032766",
    code: "MAT201",
    description: "Calculus I",
    semesterName: "Fall 2024",
    createdBy: "Daniel Park",
  },
  {
    id: "f6b44d20-3fa2-476a-8c6c-1c4cdf79b6c1",
    code: "HIS101",
    description: "World History to 1500",
    semesterName: "Spring 2024",
    createdBy: "Olivia Lim",
  },
  {
    id: "3b5b2e2c-aa54-4e9a-8f9a-d6a6f5ba9d31",
    code: "PHY101",
    description: "Introduction to Physics",
    semesterName: "Fall 2024",
    createdBy: "Alex Tan",
  },
  {
    id: "7d1f2a9a-d2d4-4d06-b2c9-84e991f2aa69",
    code: "ART120",
    description: "Art Appreciation",
    semesterName: "Spring 2024",
    createdBy: "Jessica Wang",
  },
];

const StudentCourseListPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const coursesPerPage = 6;

  // Tính toán số lượng trang
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  // Lọc theo mã khóa học
  const filteredCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc theo học kỳ
  const filteredAndSortedCourses = selectedSemester
    ? filteredCourses.filter(
        (course) => course.semesterName === selectedSemester
      )
    : filteredCourses;

  // Lấy các khóa học cho trang hiện tại
  const displayedCourses = filteredAndSortedCourses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
    setPage(1);
  };

  const handleCourseDetailClick = (id) => {
    navigate(`/student/course-management/class/${id}`);
  };

  return (
    <div>
      <LeftMenu />

      <Container sx={{ marginLeft: '240px' }}>
        <Grid container spacing={4} sx={{ marginTop: 2 , left: '30%',}}>
          <Grid item flex={1}>
            <TextField
              label="Search by Course Code"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Grid>
          <Grid item flex={1} maxWidth={150}>
            <FormControl fullWidth>
              <InputLabel id="semester-select-label">Semester</InputLabel>
              <Select
                labelId="semester-select-label"
                id="semester-select"
                value={selectedSemester}
                onChange={handleSemesterChange}
              >
                <MenuItem value="">All Semesters</MenuItem>
                <MenuItem value="Fall 2024">Fall 2024</MenuItem>
                <MenuItem value="Spring 2024">Spring 2024</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
             
          </Grid>
        </Grid>
        <Grid
          container={displayedCourses.length}
          spacing={4}
          sx={{ marginTop: 2, minHeight: 100 }}
        >
          {displayedCourses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <div
                className="course-card"
                style={{ padding: 16 }}
                onClick={() => handleCourseDetailClick(course.id)}
              >
                <h3>{course.code}</h3>
                <p>{course.description}</p>
                <p>Semester: {course.semesterName}</p>
                <p>Created by: {course.createdBy}</p>
                <div className="course-actions">
          
                </div>
              </div>
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
