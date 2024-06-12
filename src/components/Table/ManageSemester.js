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
} from "@mui/material";
import axios from "axios";

const ManageSemesterTable = () => {
  const [semesters, setSemesters] = useState([]);

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
    // Add logic to create a new semester
  };

  const handleDeleteSemester = async (semester) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:8000/semester/${semester.id}`,
        config
      );
      setSemesters(semesters.filter((s) => s.id !== semester.id));
    } catch (error) {
      console.error("Error deleting semester:", error);
    }
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
                <TableCell>{semester.startDate}</TableCell>
                <TableCell>{semester.endDate}</TableCell>
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
    </Box>
  );
};

export default ManageSemesterTable;
