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
  Avatar,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ManageTeacherTable = () => {
  const [managerAccounts, setManagerAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    code: "",
    isActive: false,
  });
  const fetchTeacherAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8000/teacher/list",
        config
      );
      setManagerAccounts(response.data.data);
      console.log("data", response.data.data);
    } catch (error) {
      console.error("Error fetching teacher accounts:", error);
    }
  };

  useEffect(() => {
    fetchTeacherAccounts();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setFormData({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      isActive: account.isActive,
      dob: account.dob,
      phoneNumber: account.phoneNumber,
    });
    setOpen(true);
    setViewMode(false);
  };

  const handleDeleteAccount = async (account) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:8000/teacher/${account.id}`, config);
      setManagerAccounts(managerAccounts.filter((a) => a.id !== account.id));
      toast.success("Teacher account deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error deleting teacher account:", error);
    }
  };

  const handleViewAccount = (account) => {
    setSelectedAccount(account);
    setFormData({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      code: account.code,
      isActive: account.isActive,
      dob: account.dob,
      phoneNumber: account.phoneNumber,
    });
    setOpen(true);
    setViewMode(true);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        code: formData.code,
        email: formData.email,
        isActive: formData.isActive,
      };

      if (selectedAccount) {
        // Update existing account
        const response = await axios.put(
          `http://localhost:8000/teacher/${selectedAccount.id}`,
          payload,
          config
        );
        setManagerAccounts(
          managerAccounts.map((account) =>
            account.id === selectedAccount.id
              ? { ...account, ...response.data.data }
              : account
          )
        );
      }
      await fetchTeacherAccounts();

      toast.success("Teacher account saved successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error saving teacher account:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setViewMode(false);
  };

  const handleImport = () => {
    // Add logic to edit the selected manager account
  };

  const handleActiveChange = (account) => {
    // Add logic to update the active status of the selected manager account
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleImport}
        >
          Import
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "100%",
          width: "1000px",
          marginLeft: "300px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managerAccounts.map((account, index) => (
              <TableRow key={account.id}>
                <TableCell>{index + 1}</TableCell>
                <Avatar
                  sx={{ marginTop: "15px" }}
                  alt="Avatar"
                  src={account?.avatarUrl}
                />
                <TableCell>{account.code}</TableCell>

                <TableCell>
                  {account.firstName} {account.lastName}
                </TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  <Switch
                    checked={account.isActive}
                    onChange={() => handleActiveChange(account)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleViewAccount(account)}
                    style={{ marginRight: "8px", width: "70px" }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleEditAccount(account)}
                    style={{ marginRight: "8px", width: "70px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteAccount(account)}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedAccount ? "Teacher Account" : "Create Teacher Account"}
        </DialogTitle>
        <DialogContent>
          {viewMode && (
            <>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ cursor: "pointer" }}
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
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
          />
          <TextField
            name="code"
            label="Code"
            value={formData.code}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
            fullWidth
          />
          {viewMode && (
            <>
              <TextField
                name="dob"
                label="DOB"
                value={formData.dob}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                margin="normal"
                fullWidth
              />
            </>
          )}
          <Box display="flex" alignItems="center" mt={2}>
            <Switch
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              color="primary"
            />
            <Box ml={1}>Active</Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {!viewMode && (
            <Button onClick={handleSubmit} color="primary">
              {selectedAccount ? "Update" : "Create"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageTeacherTable;
