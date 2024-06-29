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
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ApiInstance from "../../axios";
import { formatDate } from "../../commons/function";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

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
      await ApiInstance.delete(`/semester/${semesterToDelete?.id}`);
      toast.success("Delete semester successfully");
      fetchSemesters();
      setConfirmationOpen(false);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error deleting semester:", error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{ 
            width: "40px",
             height: "40px",
             backgroundColor: "#229342",
            }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCreateSemester}
        >
          <CreateOutlinedIcon sx={{fontSize:"30px"}}/>
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
                    <DeleteSweepOutlinedIcon sx={{fontSize:"20px"}}/>
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
          <Button onClick={handleDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Semester</DialogTitle>
          <DialogContent>
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
                    <DialogActions>
                      <Button onClick={handleClose} color="secondary">
                        Cancel
                      </Button>

                      <Button type="submit" color="primary">
                        Save
                      </Button>
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
