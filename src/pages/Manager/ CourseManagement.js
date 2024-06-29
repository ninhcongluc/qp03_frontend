import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiInstance from "../../axios";
import ManagerMenu from "../../components/LeftMenu/ManagerMenu";
import "./CourseManagement.css";
import ManagerMenu from "../../components/LeftMenu/ManagerMenu"

const CourseManagementPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const coursesPerPage = 6;

  const fetchCourseData = async (page, limit, semesterId = "") => {
    try {
      const response = await ApiInstance.get(
        `/course?page=${page}&limit=${limit}&semesterId=${semesterId}`
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
    fetchCourseData(1, coursesPerPage);
  }, []);

  const pageCount = Math.ceil(totalItem / coursesPerPage);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsCreateModalOpen(true);
  };

  const handleEditCourse = (id) => {
    const course = courses.find((c) => c.id === id);
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDeleteCourse = (id) => {
    console.log(`Deleting course with ID: ${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchCourseData(value, coursesPerPage, selectedSemester);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
    setPage(1);

    if (event.target.value) {
      fetchCourseData(1, coursesPerPage, event.target.value);
    } else {
      fetchCourseData(1, coursesPerPage);
    }
  };
  const handleCourseDetailClick = (id) => {
    navigate(`/manager/course/${id}`);
  };

  return (
    <div>
      <ManagerMenu />
      <Container>
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
          <Grid item>
            <button
              class="add-course-btn"
              onClick={handleAddCourse}
              style={{
                backgroundColor: "#58A2C8",
                color: "white",
                border: "none",
                padding: "10px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <AddIcon /> Add Course
            </button>
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

                  <div class="course-actions">
                    <EditIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEditCourse(course.id);
                      }}
                    />
                    <DeleteIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteCourse(course.id);
                      }}
                    />
                  </div>
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
      {isCreateModalOpen && (
        <CreateCourseModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
      {isEditModalOpen && selectedCourse && (
        <EditCourseModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

const CreateCourseModal = ({ open, onClose }) => {
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSemester, setCourseSemester] = useState("");

  const handleSave = () => {
    // Add logic to save the new course
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ManagerMenu />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Create New Course
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="course-semester-label">Semester</InputLabel>
          <Select
            labelId="course-semester-label"
            value={courseSemester}
            onChange={(e) => setCourseSemester(e.target.value)}
          >
            <MenuItem value="Fall 2024">Fall 2024</MenuItem>
            <MenuItem value="Spring 2024">Spring 2024</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const EditCourseModal = ({ open, onClose, course }) => {
  const [courseCode, setCourseCode] = useState(course.code);
  const [courseDescription, setCourseDescription] = useState(
    course.description
  );
  const [courseSemester, setCourseSemester] = useState(course.semester);

  const handleSave = () => {
    // Add logic to update the course
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Course
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="course-semester-label">Semester</InputLabel>
          <Select
            labelId="course-semester-label"
            value={courseSemester}
            onChange={(e) => setCourseSemester(e.target.value)}
          >
            <MenuItem value="Fall 2024">Fall 2024</MenuItem>
            <MenuItem value="Spring 2024">Spring 2024</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
            Save
          </Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CourseManagementPage;
