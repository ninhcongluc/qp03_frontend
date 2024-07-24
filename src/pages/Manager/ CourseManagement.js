import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Switch,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";
import "./CourseManagement.css";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  semesterId: Yup.string().required("Semester is required"),
});

const CourseManagementPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [courses, setCourses] = useState([]);
  const [errorCode, setErrorCode] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorSemester, setErrorSemester] = useState("");

  const [selectedCourse, setSelectedCourse] = useState({
    code: "",
    name: "",
    description: "",
    semesterId: "",
    managerId: "",
    isActive: false,
  });
  const [semesters, setSemesters] = useState([]);
  const coursesPerPage = 6;
  const userInfo = JSON.parse(localStorage.getItem("user"));

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
      const response = await ApiInstance.get("/semester?isActive=true");
      const newData = response.data.data.filter((semester) => {
        return semester.isActive === true;
      });
      setSemesters(newData);
    } catch (error) {
      console.error("Error fetching semester information:", error);
    }
  };

  useEffect(() => {
    fetchSemesterData();
    fetchCourseData(1, coursesPerPage);
  }, []);

  const pageCount = Math.ceil(totalItem / coursesPerPage);

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsOpenDelete(false);
  };

  // handle submit create course
  const handleAddCourse = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmit = async (values, formikBag) => {
    console.log("values", values);
    try {
      await ApiInstance.post("/course/create", values);
      fetchCourseData(1, coursesPerPage, selectedSemester);
      toast.success("Create new course successfully");
      handleClose();
      formikBag.resetForm();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error creating course:", error);
    }
  };

  const handleEditCourse = (id) => {
    const course = courses.find((c) => c.id === id);
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  // handle confirm delete course
  const handleDeleteCourse = (course) => {
    setSelectedCourse(course);
    setIsOpenDelete(true);
  };

  // handle delete course
  const handleDeleteAccount = async () => {
    try {
      await ApiInstance.delete(`/course/${selectedCourse.id}`);
      setIsOpenDelete(false);
      fetchCourseData(1, coursesPerPage, selectedSemester);
      toast.success("Delete course successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error deleting course:", error);
    }
  };

  //handle change page
  const handlePageChange = (event, value) => {
    setPage(value);
    fetchCourseData(value, coursesPerPage, selectedSemester);
  };

  const handleSearchTermChange = (event) => {
    if (event.target.value !== "") {
      const newData = courses.filter((course) => {
        return course.code
          .toUpperCase()
          .includes(event.target.value.toUpperCase());
      });
      setCourses(newData);
      setTotalItem(newData.length);
    } else {
      fetchCourseData(1, coursesPerPage, selectedSemester);
    }
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
  // handle update course
  const handleFormChange = (event) => {
    setSelectedCourse({
      ...selectedCourse,
      [event.target.name]: event.target.value,
    });
  };

  // handle submit update course
  const handleSubmitUpdate = async () => {
    let error = false;
    try {
      if (selectedCourse.code === "") {
        error = true;
        setErrorCode("Code is required");
      } else {
        setErrorCode("");
      }
      if (selectedCourse.name === "") {
        error = true;
        setErrorName("Name is required");
      } else {
        setErrorName("");
      }
      if (selectedCourse.description === "") {
        error = true;
        setErrorDescription("Description is required");
      } else {
        setErrorDescription("");
      }
      if (selectedCourse.semesterId === "") {
        error = true;
        setErrorSemester("Semester is required");
      } else {
        setErrorSemester("");
      }
      if (error) {
        return;
      }

      const payload = {
        code: selectedCourse.code,
        name: selectedCourse.name,
        description: selectedCourse.description,
        semesterId: selectedCourse.semesterId,
        isActive: selectedCourse.isActive,
      };

      await ApiInstance.put(`/course/${selectedCourse.id}`, payload);
      fetchCourseData(1, coursesPerPage, selectedSemester);
      toast.success("Update course successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
        setIsEditModalOpen(false);
      } else {
        toast.error("Update teacher account is failed");
      }
      console.error("Error saving teacher account:", error);
    }
  };

  const handleCourseDetailClick = (id) => {
    navigate(`/manager/course/${id}`);
  };

  return (
    <Container width={"1200px"} position="relative">
      <Box>
        <MenuComponent role="manager" />
      </Box>
      <Box>
        <h1
          style={{
            marginBottom: "1rem",
            marginTop: "-1.5rem",
            textAlign: "center",
          }}
        >
          Course Management
        </h1>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <div style={{ display: "flex", width: "100%" }}>
          <div>
            <TextField
              label="Search by Course Code"
              variant="outlined"
              size="small"
              onChange={handleSearchTermChange}
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <FormControl
              size="small"
              sx={{
                width: "150px",
              }}
            >
              <InputLabel id="semester-select-label">Semester</InputLabel>
              <Select
                labelId="semester-select-label"
                label="Semester"
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
          </div>
        </div>
        <div style={{ marginRight: "-270px" }}>
          <Button
            sx={{
              width: "150px",
              height: "50px",
              backgroundColor: "#229342",
              "&:hover": {
                backgroundColor: "#1e7b36",
              },
            }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAddCourse}
          >
            <AddIcon /> Add Course
          </Button>
        </div>
      </Box>
      <Grid
        container={courses.length}
        spacing={2}
        sx={{
          height: 500,
          width: "1200px",
          marginRight: "-270px",
        }}
      >
        {courses.map((course, index) => (
          <Grid item key={index} xs={4} sm={6} md={4}>
            <div
              class="course-card"
              style={{
                padding: 16,
                height: "240px ",
              }}
              onClick={
                course.isActive
                  ? () => handleCourseDetailClick(course.id)
                  : () => {}
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      marginRight: "8px",
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#fbd64f",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditCourse(course.id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ width: "30px", height: "30px" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteCourse(course);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 8,
                }}
              >
                <p>Semester: {course?.semester.name}</p>
                <p>Name: {course.name}</p>
                <p>Description: {course.description}</p>
              </div>
              <Box display="flex" alignItems="center">
                <Switch
                  name="isActive"
                  checked={course.isActive}
                  color="primary"
                />
                <Box ml={1}>Active</Box>
              </Box>
            </div>
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          style={{
            position: "absolute",
            bottom: 5,
            left: "55%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={isOpenDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the course "{selectedCourse?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteAccount}
            autoFocus
            sx={{
              color: "white",
              backgroundColor: "#E00201",
              "&:hover": {
                backgroundColor: "#c70404",
              },
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={() => setIsOpenDelete(false)}
            sx={{
              color: "white",
              backgroundColor: "#6C757D",
              "&:hover": {
                backgroundColor: "#5a6268",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isCreateModalOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "#229342",
            color: "white",
            textAlign: "center",
            fontSize: "30px",
          }}
        >
          Create New Course
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#f0f0f0",
            textAlign: "left",
            width: "100%",
          }}
        >
          <Formik
            initialValues={{
              code: "",
              name: "",
              description: "",
              semesterId: "",
              managerId: userInfo.id,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, setFieldValue }) => {
              return (
                <Form>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Field
                        name="code"
                        as={TextField}
                        label="Code"
                        value={values.code}
                        margin="normal"
                        fullWidth
                        error={touched.code && !!errors.code}
                        helperText={touched.code && errors.code}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        name="name"
                        as={TextField}
                        label="Course Name"
                        value={values.name}
                        margin="normal"
                        fullWidth
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="description"
                        as={TextField}
                        label="Description"
                        value={values.description}
                        margin="normal"
                        fullWidth
                        multiline
                        rows={4}
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl
                        fullWidth
                        error={touched.semesterId && !!errors.semesterId}
                      >
                        <InputLabel id="addSemester">Semester</InputLabel>
                        <Select
                          labelId="addSemester"
                          label="Semester"
                          name="semesterId"
                          value={values.semesterId}
                          onChange={(e) => {
                            setFieldValue("semesterId", e.target.value);
                          }}
                        >
                          <MenuItem value="">All Semesters</MenuItem>
                          {semesters.map((semester) => (
                            <MenuItem key={semester.id} value={semester.id}>
                              {semester.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.semesterId && errors.semesterId ? (
                          <FormHelperText>{errors.semesterId}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <div>
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: "#229342",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1e7b36",
                          },
                        }}
                      >
                        Save
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={handleClose}
                        sx={{
                          backgroundColor: "#f44336",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          Edit Course Information
        </DialogTitle>
        <DialogContent>
          <TextField
            name="code"
            label="Code"
            value={selectedCourse.code}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            error={errorCode && errorCode.length ? true : false}
            helperText={errorCode}
          />
          <TextField
            name="name"
            label="Name"
            value={selectedCourse.name}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            error={errorName && errorName.length ? true : false}
            helperText={errorName}
          />

          <TextField
            name="description"
            label="Description"
            value={selectedCourse.description}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            multiline
            rows={4}
            required
            error={errorDescription && errorDescription.length ? true : false}
            helperText={errorDescription}
          />
          <FormControl fullWidth>
            <InputLabel id="addSemester">Semester</InputLabel>
            <Select
              labelId="addSemester"
              label="Semester"
              name="semesterId"
              value={selectedCourse.semesterId}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  semesterId: e.target.value,
                })
              }
              error={errorSemester && errorSemester.length ? true : false}
              helperText={errorSemester}
            >
              <MenuItem value="">All Semesters</MenuItem>
              {semesters.map((semester) => (
                <MenuItem key={semester.id} value={semester.id}>
                  {semester.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" mt={2}>
            <Switch
              name="isActive"
              checked={selectedCourse.isActive}
              onChange={(e) =>
                setSelectedCourse({
                  ...selectedCourse,
                  isActive: e.target.checked,
                })
              }
              color="primary"
            />
            <Box ml={1}>Active</Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitUpdate}
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "#229342",
              "&:hover": {
                backgroundColor: "#1e7b36",
              },
              width: "100px",
            }}
          >
            Update
          </Button>

          <Button
            onClick={handleClose}
            sx={{
              color: "white",
              backgroundColor: "#E00201",
              "&:hover": {
                backgroundColor: "#c70404",
              },
              width: "100px",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseManagementPage;
