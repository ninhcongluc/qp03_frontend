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
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  DialogContentText
} from "@mui/material";
import { toast } from "react-toastify";
import ApiInstance from "../../axios";
import { Formik, Field, Form } from "formik";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  code: Yup.string().required("Code is required"),
  dateOfBirth: Yup.date().required("Birth Date is required"),
  gender: Yup.number().required("Gender is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

const ManagerAccountTable = () => {
  const [managerAccounts, setManagerAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [lastNameError, setLastNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    code: "",
    isActive: false,
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
  });

  const fetchManagerAccounts = async () => {
    try {
      const response = await ApiInstance.get("/manager/list");
      setManagerAccounts(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error fetching manager accounts:", error);
    }
  };

  useEffect(() => {
    fetchManagerAccounts();
  }, []);

  const handleEditAccount = (account) => {
    setSelectedAccount("edit");
    setManagerToDelete(account);
    setFormData({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      code: account.code,
      isActive: account.isActive,
      dateOfBirth: account.dateOfBirth,
      phoneNumber: account.phoneNumber,
      gender: account.gender,
    });
    setOpen(true);
    setViewMode(false);
  };

  const handleConfirmDelete = (account) => {
    setManagerToDelete(account);
    setConfirmationOpen(true);
  };

  const handleDeleteAccount = async () => {
    try {
      await ApiInstance.delete(`/manager/${managerToDelete?.id}`);
      fetchManagerAccounts();
      setConfirmationOpen(false);
      toast.success("You have deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      setConfirmationOpen(false);
      console.error("Error deleting manager account:", error);
    }
  };

   //view account
   const handleViewAccount = (account) => {
    setSelectedAccount("view");
    setFormData({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      code: account.code,
      isActive: account.isActive,
      dateOfBirth: account.dateOfBirth,
      phoneNumber: account.phoneNumber,
      gender: account.gender,
    });
    console.log("data", account);
    setOpen(true);
    setViewMode(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit account
  const handleSubmit = async () => {
    let error = true;
    try {
      if (formData.firstName === null || formData.firstName.trim() === "") {
        setFirstNameError("Phone number is required");
        error = false;
      } else {
        setFirstNameError("");
      }
      if (formData.lastName === null || formData.lastName.trim() === "") {
        setLastNameError("Last Name is required");
        error = false;
      } else {
        setLastNameError("");
      }
      if (formData.dateOfBirth === null || formData.dateOfBirth.trim() === "") {
        setDateError("Phone number is required");
        error = false;
      } else {
        setDateError("");
      }
      if (formData.phoneNumber === null || formData.phoneNumber.trim() === "") {
        setPhoneError("Phone number is required");
        error = false;
      } else {
        setPhoneError("");
      }
      if (!error) {
        toast.error("Update manager account is failed");
        return;
      }

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        code: formData.code,
        email: formData.email,
        isActive: formData.isActive,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
      };

      console.log("payload", payload);
      await ApiInstance.put(`/manager/${managerToDelete.id}`, payload);
      await fetchManagerAccounts();
      toast.success("Update manager account is successfully");
      setOpen(false);
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
        setOpen(false);
      } else {
        toast.error("Update manager account is failed");
      }
      console.error("Error saving teacher account:", error);
    }
  };

  //handle close
  const handleClose = () => {
    setOpen(false);
    setViewMode(false);
    setOpenAdd(false);
    setFirstNameError("");
    setLastNameError("");
    setDateError("");
    setPhoneError("");
  };

  //search teacher
  const searchTeacher = (e) => {
    if (e.target.value !== "") {
      const newData = managerAccounts.filter((account) => {
        return account.code
          .toUpperCase()
          .includes(e.target.value.toUpperCase());
      });
      setManagerAccounts(newData);
    } else {
      fetchManagerAccounts();
    }
  };

  const handleCreateAccount = () => {
    setOpenAdd(true);
  };

  const handleSubmitCreate = async (values, formikBag) => {
    console.log("values", values);
    try {
      await ApiInstance.post("/manager/create", values);
      fetchManagerAccounts();
      toast.success("Create Manager Account successfully");
      handleClose();
      formikBag.resetForm();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error creating Manager Account:", error);
    }
  };


  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        marginRight={-30}
        marginBottom="10px"
        marginTop="20px"
      >
        <div>
          <TextField
            label="Search by Manager Code"
            variant="outlined"
            size="small"
            onChange={searchTeacher}
          />
        </div>
        <div>
          <Button
            sx={{
              width: "40px",
              height: "40px",
              
              backgroundColor: "#229342",
              "&:hover": {
                backgroundColor: "#1e7b36",
              },
            }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleCreateAccount}
          >
            <PersonAddAlt1Icon sx={{ fontSize: "25px" }} />
          </Button>
        </div>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          height: "530px",
          width: "1200px",
          marginRight: "-270px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managerAccounts.map((account, index) => (
              <TableRow key={account.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{account.code}</TableCell>
                <TableCell>
                  {account.firstName} {account.lastName}
                </TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  <Box
                    color={account.isActive ? "green" : "red"}
                    fontWeight="bold"
                  >
                    {account.isActive ? "active" : "inactive"}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleViewAccount(account)}
                    style={{ marginRight: "8px", width: "70px" }}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleEditAccount(account)}
                    style={{ marginRight: "8px", width: "70px" }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleConfirmDelete(account)}
                    style={{ width: "70px" }}
                  >
                   <PersonRemoveIcon />
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
            Are you sure you want to delete the manager account "
            {managerToDelete?.firstName} {managerToDelete?.lastName}"?
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
            onClick={() => setConfirmationOpen(false)}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          {selectedAccount === "view"
            ? "View manager Account"
            : "Edit manager Account"}
        </DialogTitle>
        <DialogContent>
          {viewMode && (
            <>
              <TextField
                name="code"
                label="Code"
                value={formData.code}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
                disabled={viewMode}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
                disabled={viewMode}
              />
            </>
          )}

          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            required
            error={firstNameError && firstNameError.length ? true : false}
            helperText={firstNameError}
            disabled={viewMode}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            required
            disabled={viewMode}
            error={lastNameError && lastNameError.length ? true : false}
            helperText={lastNameError}
          />
          <TextField
            name="dateOfBirth"
            label="Date of birth"
            value={formData.dateOfBirth}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            disabled={viewMode}
            error={dateError && dateError.length ? true : false}
            helperText={dateError}
          />
          <TextField
            error={phoneError && phoneError.length ? true : false}
            helperText={phoneError}
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
            required
            disabled={viewMode}
          />
          <FormControl disabled={viewMode}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Female" />
              <FormControlLabel value="2" control={<Radio />} label="Male" />
              <FormControlLabel value="3" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Box display="flex" alignItems="center" mt={2}>
            <Switch
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              color="primary"
              disabled={viewMode}
            />
            <Box ml={1}>Active</Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {!viewMode && (
            <Button
              onClick={handleSubmit}
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
          )}
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
      <div>
        <Dialog open={openAdd} onClose={handleClose}>
          <DialogTitle
            sx={{
              backgroundColor: "#229342",
              color: "white",
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            Create manager account
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
                firstName: "",
                lastName: "",
                email: "",
                code: "",
                dateOfBirth: "",
                phoneNumber: "",
                gender: "",
              }}
              onSubmit={handleSubmitCreate}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, setFieldValue }) => {
                return (
                  <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Field
                          name="firstName"
                          as={TextField}
                          label="Fist Name"
                          value={values.firstName}
                          margin="normal"
                          fullWidth
                          error={touched.firstName && !!errors.firstName}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="lastName"
                          as={TextField}
                          label="Last Name"
                          value={values.lastName}
                          margin="normal"
                          fullWidth
                          error={touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Field
                          name="email"
                          as={TextField}
                          label="Email"
                          value={values.email}
                          margin="normal"
                          fullWidth
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
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
                      <Grid item xs={6}>
                        <Field
                          name="phoneNumber"
                          as={TextField}
                          label="Phone Number"
                          value={values.phoneNumber}
                          margin="normal"
                          fullWidth
                          error={touched.phoneNumber && !!errors.phoneNumber}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          marginTop: "16px",
                        }}
                      >
                        <TextField
                          type="date"
                          label="Date of birth"
                          value={values.dateOfBirth}
                          onChange={(event) =>
                            setFieldValue("dateOfBirth", event.target.value)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputFormat="dd/MM/yyyy"
                          error={touched.dateOfBirth && !!errors.dateOfBirth}
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl error={touched.gender && !!errors.gender}>
                          <FormLabel id="gender">Gender</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="gender"
                            name="gender"
                            value={values.gender}
                            onChange={(event) =>
                              setFieldValue("gender", event.target.value)
                            }
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio />}
                              label="Other"
                            />
                          </RadioGroup>
                          {touched.gender && errors.gender ? (
                            <FormHelperText> {errors.gender}</FormHelperText>
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
      </div>
    </Box>
  );
};

export default ManagerAccountTable;
