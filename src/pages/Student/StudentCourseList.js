import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";

const StudentCourseList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const coursesPerPage = 6;

  const fetchCourseData = async (page, limit, semesterId = "", searchTerm = "") => {
    try {
      const response = await ApiInstance.get(
        `/course?page=${page}&limit=${limit}&semesterId=${semesterId}&code=${searchTerm}`
      );
      setCourses(response.data.data.courses);
      setTotalItem(response.data.data.total);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchSemesterData = async () => {
    try {
      const response = await ApiInstance.get("/semester");
      setSemesters(response.data.data);
    } catch (error) {
      console.error("Error fetching semester information:", error);
    }
  };

  useEffect(() => {
    fetchSemesterData();
    fetchCourseData(1, coursesPerPage);
    const interval = setInterval(() => {
      fetchCourseData(page, coursesPerPage, selectedSemester, searchTerm);
    }, 30000); // Làm mới dữ liệu mỗi 30 giây
    return () => clearInterval(interval);
  }, [page, selectedSemester, searchTerm]);

  const pageCount = Math.ceil(totalItem / coursesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchCourseData(value, coursesPerPage, selectedSemester, searchTerm);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
    fetchCourseData(1, coursesPerPage, selectedSemester, event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
    setPage(1);
    fetchCourseData(1, coursesPerPage, event.target.value, searchTerm);
  };

  const handleCourseDetailClick = (id) => {
    navigate(`/student/course-management/class/${id}`);
  };

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }}>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
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
                {semesters.map((semester) => (
                  <MenuItem key={semester.id} value={semester.id}>
                    {semester.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container spacing={4}
          sx={{ marginTop: 2, minHeight: 100 }}
        >
          {courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <div
                className="course-card"
                style={{ padding: 16 }}
                onClick={() => handleCourseDetailClick(course.id)}
              >
                <h3>{course.code}</h3>
                <p>{course.description}</p>
                <p>Semester: {course?.semester?.name}</p>
                <p>Created by: {course.createdBy}</p>
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

export default StudentCourseList;
