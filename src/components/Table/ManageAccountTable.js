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
} from "@mui/material";
import axios from "axios";

const ManagerAccountTable = () => {
  const [managerAccounts, setManagerAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagerAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/manager/list",
          config
        );
        setManagerAccounts(response.data.data);
      } catch (error) {
        setError("Error fetching manager accounts");
        console.error("Error fetching manager accounts:", error);
      }
    };
    fetchManagerAccounts();
  }, []);

  const handleCreateAccount = () => {
    // Add logic to create a new manager account
  };

  const handleEditAccount = (account) => {
    // Add logic to edit the selected manager account
  };

  const handleViewAccount = (account) => {
    // Add logic to view the selected manager account
  };

  const handleActiveChange = (account) => {
    // Add logic to update the active status of the selected manager account
  };

  return (
    <Box>
      {error && <Box color="error.main">{error}</Box>}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCreateAccount}
        >
          Create+
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "100%",
          width: "1100px",
          marginLeft: "200px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managerAccounts.map((account, index) => (
              <TableRow key={account.id}>
                <TableCell>{index + 1}</TableCell>
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
                    style={{ width: "70px" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerAccountTable;
