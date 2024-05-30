import React from "react";
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
} from "@mui/material";

const managerAccounts = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", active: true },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", active: false },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    active: true,
  },
];
const ManagerAccountTable = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          color="primary"
          size="small"
        >
          Create+
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "100%",
          width: "1200px",
          marginLeft: "200px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managerAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.active ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small">
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
