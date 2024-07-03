import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Switch,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ApiInstance from "../../axios";
import { formatDateDay } from "../../commons/function";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import "./ManagerCss/ManagerSemester.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
});

const ManageSemesterTable = () => {
  const [semesters, setSemesters] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [semesterToDelete, setSemesterToDelete] = useState(null);

  const fetchSemesters = async () => {
    try {
      const response = await ApiInstance.get("/semester");
      setSemesters(response.data.data);
    } catch (error) {
      console.error("Error fetching semester information:", error);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleCreateSemester = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, formikBag) => {
    try {
      await ApiInstance.post("/semester", values);
      fetchSemesters();
      toast.success("Create semester successfully");
      handleClose();
      formikBag.resetForm();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error creating semester:", error);
    }
  };

  const handleDeleteSemester = (semester) => {
    setSemesterToDelete(semester);
    setConfirmationOpen(true);
  };

  const handleDelete = async () => {
    try {
      await ApiInstance.delete(`/semester/${semesterToDelete.id}`);
      toast.success("Delete semester successfully");
      fetchSemesters();
      setConfirmationOpen(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setConfirmationOpen(false);
      console.error("Error deleting semester:", error);
    }
  };

  const handleActiveChange = async (semester) => {
    try {
      await ApiInstance.put(`/semester/${semester.id}`, {
        
        isActive: !semester.isActive,
      });
      toast.success("Change semester active status successfully");
      fetchSemesters();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error changing semester active status:", error);
    }
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "#229342",
            '&:hover': {
              backgroundColor: '#1e7b36',
            },
          }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCreateSemester}
        >
          <PostAddIcon sx={{ fontSize: "25px" }} />
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "540px",
          width: "1200px",
          marginLeft: "270px"
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesters.map((semester, index) => (
              <TableRow key={semester.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{semester.name}</TableCell>
                <TableCell>{formatDateDay(semester.startDate)}</TableCell>
                <TableCell>{formatDateDay(semester.endDate)}</TableCell>
                <TableCell>
                  <Switch
                    checked={semester.isActive}
                    onChange={() => handleActiveChange(semester)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteSemester(semester)}
                    style={{ width: "70px" }}
                  >
                    <DeleteSweepOutlinedIcon sx={{ fontSize: "20px" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the semester "
            {semesterToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus
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
          <Button onClick={() => setConfirmationOpen(false)} 
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
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{
              backgroundColor: "#229342",
              color: "white",
              textAlign: "center",
              fontSize: "30px",
            }}>
            Create Semester
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: "#f0f0f0",
              textAlign: "center",
            }}
          >
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <div className="inputField">
                      <Field
                        name="name"
                        as={TextField}
                        label="Semester Name"
                        required
                        value={values.name}
                        margin="normal"
                        fullWidth
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </div>
                    <div className="inputField">
                      <TextField
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
                    </div>
                    <div className="inputField">
                      <TextField
                        type="date"
                        label="End Date"
                        required
                        value={values.endDate}
                        onChange={(event) => {
                          setFieldValue("endDate", event.target.value);
                          console.log(event.target.value, "date");
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: values.startDate,
                        }}
                        error={touched.endDate && !!errors.endDate}
                        helperText={touched.endDate && errors.endDate}
                      />
                    </div>
                    <DialogActions >
                      <div className="handleSubmit">
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
                      <div className="handleCancel">
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
      </div>
    </Box>
  );
};

export default ManageSemesterTable;
