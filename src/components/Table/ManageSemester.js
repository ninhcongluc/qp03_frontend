import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { formatDate } from "../../commons/function";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Field } from "formik";
import * as Yup from "yup";

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

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/semester",
          config
        );
        setSemesters(response.data.data);
      } catch (error) {
        console.error("Error fetching semester information:", error);
      }
    };
    fetchSemesters();
  }, []);

  const handleCreateSemester = () => {
    console.log("Create semester", open);

    setOpen(true);
  };
  const handleSubmit = async (values) => {
    try {
      const { name, startDate, endDate } = values;
      console.log("Name:", name);
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error saving manager account:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSemester = (semester) => {
    setSemesterToDelete(semester);
    setConfirmationOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCreateSemester}
        >
          Create+
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%", width: "1000px", marginLeft: "300px" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>StartDate</TableCell>
              <TableCell>EndDate</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesters.map((semester, index) => (
              <TableRow key={semester.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{semester.name}</TableCell>
                <TableCell>{formatDate(semester.startDate)}</TableCell>
                <TableCell>{formatDate(semester.endDate)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteSemester(semester)}
                    style={{ width: "70px" }}
                  >
                    Delete
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
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                await axios.delete(
                  `http://localhost:8000/semester/${semesterToDelete?.id}`,
                  config
                );
                setSemesters(
                  semesters.filter((s) => s.id !== semesterToDelete?.id)
                );
                setConfirmationOpen(false);
              } catch (error) {
                console.error("Error deleting semester:", error);
              }
            }}
            color="error"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Formik
        initialValues={{
          name: "",
          startDate: null,
          endDate: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Semester</DialogTitle>
            <DialogContent>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Start Date"
                  required
                  value={values.startDate}
                  onChange={(date) => setFieldValue("startDate", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={touched.startDate && !!errors.startDate}
                      helperText={touched.startDate && errors.startDate}
                    />
                  )}
                />
                <DesktopDatePicker
                  label="End Date"
                  required
                  value={values.endDate}
                  onChange={(date) => setFieldValue("endDate", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={touched.endDate && !!errors.endDate}
                      helperText={touched.endDate && errors.endDate}
                    />
                  )}
                  minDate={values.startDate}
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>

              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>{" "}
          </Dialog>
        )}
      </Formik>
    </Box>
  );
};

export default ManageSemesterTable;
