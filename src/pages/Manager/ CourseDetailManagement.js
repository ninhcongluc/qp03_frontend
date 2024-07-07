import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import MenuComponent from "../../components/LeftMenu/Menu";
import ApiInstance from "../../axios";
import { formatDateDay, formatDateDay1 } from "../../commons/function";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
} from "@mui/material";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectClass, setSelectClass] = useState("");
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [errorCode, setErrorCode] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorTeacher, setErrorTeacher] = useState("");
  const [errorStartDate, setErrorStartDate] = useState("");
  const [errorEndDate, setErrorEndDate] = useState("");
  const [errorMaxParticipant, setErrorMaxParticipant] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    teacherId: "",
    description: "",
    startDate: "",
    endDate: "",
    maxParticipants: 0,
    isActive: true,
  });

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    name: Yup.string().required("Name is required"),
    teacherId: Yup.string().required("Teacher is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    maxParticipants: Yup.number().required("Max Participant is required"),
  });

  const fetchCourse = async (courseId) => {
    ApiInstance.get(`/course-management/${courseId}`)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching course data: ", error);
      });
  };

  const fetchClasses = async (courseId) => {
    ApiInstance.get(`/list-class/${courseId}`)
      .then((response) => {
        setClasses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching class data: ", error);
      });
  };

  useEffect(() => {
    fetchClasses(id);
    fetchCourse(id);
  }, [id]);

  const fetchTeachers = async () => {
    try {
      const response = await ApiInstance.get("/teacher/list");
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teacher data: ", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
  }
  // handle delete class
  const handleConfirmDelete = (cls) => {
    setCurrentClass(cls);
    setOpen(true);
  };

  const handleDeleteAccount = async () => {
    try {
      console.log("currentClass", currentClass.id);
      await ApiInstance.delete(`/delete-class/${currentClass.id}`);
      fetchClasses(id);
      setOpen(false);
      toast.success(`Class ${currentClass.name} deleted successfully`);
    } catch (error) {
      toast.error(error.response.data.error);
      setOpen(false);
      console.error("Error deleting class:", error);
    }
  };

  // handle view class
  const handleViewAccount = (cls) => {
    setSelectClass("view")
    setCurrentClass(cls);
    setFormData({
      code: cls.code,
      name: cls.name,
      teacherId: cls.teacher.id,
      description: cls.description,
      startDate: formatDateDay1(cls.startDate),
      endDate: formatDateDay1(cls.endDate),
      maxParticipants: cls.maxParticipants,
      isActive: cls.isActive,
    });
    setOpen(true);
    setViewMode(true);
  };

  // handle edit class
  const handleEditAccount = (cls) => {
    setSelectClass("edit")
    setCurrentClass(cls);
    setFormData({
      code: cls.code,
      name: cls.name,
      teacherId: cls.teacher.id,
      description: cls.description,
      startDate: formatDateDay1(cls.startDate),
      endDate: formatDateDay1(cls.endDate),
      maxParticipants: cls.maxParticipants,
      isActive: cls.isActive,
    });
    setOpen(true);
    setViewMode(false);
  };

  //handle form change
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit edit class
  const handleSubmit = async () => {
    let error = false;

    console.log("formData", formData);
    try {
      if (formData.code === null || formData.code.trim() === "") {
        setErrorCode("Code is required");
        error = true;
      } else {
        setErrorCode("")
      }

      if (formData.name === null || formData.name.trim() === "") {
        setErrorName("Name is required");
        error = true;
      } else {
        setErrorName("")
      }

      if (formData.teacherId === null || formData.teacherId.trim() === "") {
        setErrorTeacher("Teacher is required");
        error = true;
      } else {
        setErrorTeacher("")
      }

      if (formData.description === null || formData.description.trim() === "") {
        setErrorDescription("Description is required");
        error = true;
      } else {
        setErrorDescription("")
      }

      if (formData.startDate === null || formData.startDate.trim() === "") {
        setErrorStartDate("Start Date is required");
        error = true;
      } else {
        setErrorStartDate("")
      }

      if (formData.endDate === null || formData.endDate.trim() === "") {
        setErrorEndDate("End Date is required");
        error = true;
      } else {
        setErrorEndDate("")
      }

      if (error) {
        toast.error("Update class is failed");
        return;
      }

      const payload = {
        courseId: id,
        name: formData.name,
        teacherId: formData.teacherId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        maxParticipants: formData.maxParticipants,
        isActive: formData.isActive,
      };

      console.log("payload", payload.startDate);
      await ApiInstance.put(`/update-class/${currentClass.id}`, payload);

      fetchClasses(id);
      toast.success("Update class is successfully");
      setOpen(false);
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
        setOpen(false);
      } else {
        toast.error("Update class is failed");
      }
      console.error("Error saving teacher account:", error);
    }
  };


  //handle create class
  const handleCreateAccount = () => {
    setOpenAdd(true);
  }

  //handle form submit create class
  const handleCreateClass = async (values, formikBag) => {
    console.log("values", values);
    try {
      await ApiInstance.post("/create-class", values);
      toast.success("Create class successfully");
      fetchClasses(id);
      handleClose();
      formikBag.resetForm();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error creating class:", error);
    }
  }


  // search class
  const searchClass = (e) => {
    if (e.target.value !== "") {
      const newData = classes.filter((cls) => {
        return cls.code.toUpperCase().includes(e.target.value.toUpperCase());
      });
      setClasses(newData);
    } else {
      fetchClasses(id);
    }
  }


  if (!course) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Course Not Found
        </Typography>
        <Typography variant="body1">
          The course you are looking for does not exist.
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <MenuComponent role="manager" />
      <Container maxWidth={false}>
        <Box>
          <Typography variant="h5" component="h3" gutterBottom>
            {course.code}: {course?.description}
          </Typography>
          <Typography variant="h6" component="h2">
            Semester: {course?.semester.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Created by: {course?.manager.firstName} {course?.manager.lastName}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          width="1150px"
          marginRight="-250px"
          marginBottom="10px"
          marginTop="20px"
        >
          <div>
            <TextField
              label="Search by class Code"
              variant="outlined"
              size="small"
              onChange={searchClass}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                width: "40px",
                height: "40px",
                backgroundColor: "#229342",
                '&:hover': {
                  backgroundColor: '#1e7b36',
                },
              }}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleCreateAccount}
            >
              Add
            </Button>
          </div>
        </Box>
        <Grid container spacing={2}
          sx={{
            width: "1200px",
            marginRight: "-270px",
          }}>
          <Grid item xs={12}>
            <TableContainer
              sx={{
                height: "480px",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Is Active</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((cls, index) => (
                    <TableRow key={cls.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{cls.code}</TableCell>
                      <TableCell>{cls.name}</TableCell>
                      <TableCell>
                        {cls.teacher.firstName} {cls.teacher.lastName}
                      </TableCell>
                      <TableCell>{formatDateDay(cls.startDate)}</TableCell>
                      <TableCell>{formatDateDay(cls.endDate)}</TableCell>
                      <TableCell>
                        <Checkbox checked={cls.isActive} disabled />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleViewAccount(cls)}
                          style={{ marginRight: "8px", width: "50px" }}
                        >
                          <RemoveRedEyeIcon />
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleEditAccount(cls)}
                          style={{
                            marginRight: "8px",
                            width: "50px",
                            backgroundColor: "#fbd64f"
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleConfirmDelete(cls)}
                          style={{ width: "50px" }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the class "
              {currentClass?.name}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteAccount} autoFocus
              sx={{
                color: "white",
                backgroundColor: "#E00201",
                '&:hover': {
                  backgroundColor: '#c70404',
                },
              }}
            >
              Confirm
            </Button>
            <Button onClick={() => setOpen(false)}
              sx={{
                color: "white",
                backgroundColor: "#6C757D",
                '&:hover': {
                  backgroundColor: '#5a6268',
                },
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{ textAlign: "center" }}
          >
            {selectClass === "view" ? "View Class details" : "Edit Class"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  name="code"
                  label="Code"
                  required
                  value={formData.code}
                  margin="normal"
                  fullWidth
                  onChange={handleFormChange}
                  disabled={viewMode}
                  error={errorCode && errorCode.length ? true : false}
                  helperText={errorCode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  label="Name"
                  required
                  value={formData.name}
                  margin="normal"
                  fullWidth
                  onChange={handleFormChange}
                  disabled={viewMode}
                  error={errorName && errorName.length ? true : false}
                  helperText={errorName}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="teacherName"
                  label="Teacher Name"
                  required
                  value={formData.teacherId}
                  margin="normal"
                  fullWidth
                  onChange={handleFormChange}
                  disabled={viewMode}
                  error={errorTeacher && errorTeacher.length ? true : false}
                  helperText={errorTeacher}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="description"
                  label="Description"
                  required
                  value={formData.description}
                  margin="normal"
                  fullWidth
                  onChange={handleFormChange}
                  disabled={viewMode}
                  error={errorDescription && errorDescription.length ? true : false}
                  helperText={errorDescription}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="startDate"
                  label="Start Date"
                  required
                  value={formData.startDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  fullWidth
                  type="date"
                  onChange={handleFormChange}
                  disabled={viewMode}
                  error={errorStartDate && errorStartDate.length ? true : false}
                  helperText={errorStartDate}
                />
              </Grid>
              <Grid item xs={6}
                sx={{
                  marginTop: "16px",
                }}
              >
                <TextField
                  name="endDate"
                  type="date"
                  label="End Date"
                  required
                  value={formData.endDate}
                  onChange={handleFormChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={viewMode}
                  error={errorEndDate && errorEndDate.length ? true : false}
                  helperText={errorEndDate}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="maxParticipants"
                  label="Max Participant"
                  required
                  value={formData.maxParticipants}
                  margin="normal"
                  fullWidth
                  onChange={handleFormChange}
                  disabled={viewMode}
                  error={errorMaxParticipant && errorMaxParticipant.length ? true : false}
                  helperText={errorMaxParticipant}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {!viewMode && (
              <Button onClick={handleSubmit} color="primary"
                sx={{
                  color: "white",
                  backgroundColor: "#229342",
                  '&:hover': {
                    backgroundColor: '#1e7b36',
                  },
                  width: "100px",
                }}
              >
                Update
              </Button>
            )}
            <Button onClick={handleClose}
              sx={{
                color: "white",
                backgroundColor: "#E00201",
                '&:hover': {
                  backgroundColor: '#c70404',
                },
                width: "100px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAdd} onClose={handleClose}>
          <DialogTitle
            sx={{
              backgroundColor: "#229342",
              color: "white",
              textAlign: "center",
              fontSize: "30px",
            }}>
            Create teacher account
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
                courseId: id,
                code: "",
                name: "",
                teacherId: "",
                description: "",
                startDate: "",
                endDate: "",
                maxParticipants: 0,
              }}
              onSubmit={handleCreateClass}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Field
                          name="code"
                          as={TextField}
                          label="Code"
                          required
                          value={values.code}
                          margin="normal"
                          fullWidth
                          error={touched.code && !!errors.code}
                          helperText={touched.code && errors.code}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="name"
                          as={TextField}
                          label="Name"
                          required
                          value={values.name}
                          margin="normal"
                          fullWidth
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Field
                          name="teacherId"
                          as={TextField}
                          label="Teacher Name"
                          required
                          value={values.teacherId}
                          margin="normal"
                          fullWidth
                          error={touched.teacherId && !!errors.teacherId}
                          helperText={touched.teacherId && errors.teacherId}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          name="description"
                          as={TextField}
                          label="Description"
                          required
                          value={values.description}
                          margin="normal"
                          fullWidth
                          error={touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                        />
                      </Grid>
                      <Grid item xs={6}
                        sx={{
                          marginTop: "10px",
                        }}
                      >
                        <TextField
                          name="startDate"
                          type="date"
                          label="Start Date"
                          required
                          value={values.startDate}
                          onChange={(event) =>
                            setFieldValue("startDate", event.target.value)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!errors.startDate}
                          helperText={errors.startDate}
                        />
                      </Grid>
                      <Grid item xs={6}
                        sx={{
                          marginTop: "10px",
                        }}
                      >
                        <TextField
                          name="endDate"
                          type="date"
                          label="End Date"
                          required
                          value={values.endDate}
                          onChange={(event) =>
                            setFieldValue("endDate", event.target.value)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!errors.endDate}
                          helperText={errors.endDate}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Field
                          name="maxParticipants"
                          as={TextField}
                          label="Max Participant"
                          required
                          value={values.maxParticipants}
                          margin="normal"
                          fullWidth
                          error={touched.maxParticipants && !!errors.maxParticipants}
                          helperText={touched.maxParticipants && errors.maxParticipants}
                        />
                      </Grid>
                    </Grid>
                    <DialogActions >
                      <div>
                        <Button type="submit" sx={{
                          backgroundColor: "#229342",
                          color: "white",
                          '&:hover': {
                            backgroundColor: '#1e7b36',
                          },
                        }}>
                          Save
                        </Button>
                      </div>
                      <div>
                        <Button onClick={handleClose}
                          sx={{
                            backgroundColor: "#f44336",
                            color: "white",
                            '&:hover': {
                              backgroundColor: '#d32f2f',
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

      </Container>
    </div>
  );
};

export default CourseDetailPage;
