import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";
import "./styles/TeacherCourseList.css";

const TeacherCourseListPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const coursesPerPage = 6;
  const teacherId = JSON.parse(localStorage.getItem("user")).id;

  const fetchCourseData = async (page, limit, teacherId, semesterId = "") => {
    try {
      const response = await ApiInstance.get(
        `/course?page=${page}&limit=${limit}&teacherId=${teacherId}&semesterId=${semesterId}`
      );
      console.log("response", response);
      setCourses(response.data.data.courses);
      setTotalItem(response.data.data.total);
    } catch (error) {
      console.error("Error fetching semester information:", error);
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
    fetchCourseData(1, coursesPerPage, teacherId);
  }, [teacherId]);

  const pageCount = Math.ceil(totalItem / coursesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchCourseData(value, coursesPerPage, teacherId, selectedSemester);
  };

  const debouncedHandleSearchTermChange = debounce((newSearchTerm) => {
    if (newSearchTerm.trim() === "") {
      fetchCourseData(1, coursesPerPage, teacherId, selectedSemester);
    } else {
      const filteredCourses = courses.filter((course) => {
        const regex = new RegExp(newSearchTerm, "i");
        return regex.test(course.code);
      });

      setCourses(filteredCourses);
      setPage(1);
    }
  }, 500);

  const handleSearchInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedHandleSearchTermChange(newValue);
  };
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
    setPage(1);

    if (event.target.value) {
      fetchCourseData(1, coursesPerPage, teacherId, event.target.value);
    } else {
      fetchCourseData(1, coursesPerPage, teacherId);
    }
  };
  const handleCourseDetailClick = (id) => {
    navigate(`/teacher/course-management/${id}`);
  };

  return (
    <div>
      <MenuComponent role="teacher" />
      <Container>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item flex={1}>
            <TextField
              label="Search by Course Code"
              variant="outlined"
              value={inputValue}
              onChange={handleSearchInputChange}
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
          container={courses.length}
          spacing={4}
          sx={{ marginTop: 2, minHeight: 100, width: "900px" }}
        >
          {courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <div
                class="course-card"
                style={{ padding: 16 }}
                onClick={() => handleCourseDetailClick(course.id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {course.code}
                  </h3>

                  <div class="course-actions"></div>
                </div>
                <p>{course.description}</p>
                <p>Semester: {course?.semester.name}</p>
                <p>Created by: {course.createdBy}</p>
              </div>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ marginTop: 10, alignItems: "center" }}>
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
