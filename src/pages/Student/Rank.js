import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  MenuItem,
  InputLabel,
  Select,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import MenuComponent from "../../components/LeftMenu/Menu";
import ApiInstance from "../../axios";

const StudentGrade = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [page, setPage] = useState(1);
  const [ranks, setRanks] = useState([]);
  const [totalRanks, setTotalRanks] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const ranksPerPage = 7;

  const mockRanks = [
    {
      studentId: 1,
      courseName: "Math 101",
      studentName: "John Doe",
      totalScore: 95,
    },
    {
      studentId: 2,
      courseName: "Math 101",
      studentName: "Jane Smith",
      totalScore: 88,
    },
    {
      studentId: 3,
      courseName: "Physics 101",
      studentName: "Alice Johnson",
      totalScore: 92,
    },
    {
      studentId: 4,
      courseName: "Physics 101",
      studentName: "Bob Brown",
      totalScore: 85,
    },
    {
      studentId: 5,
      courseName: "Chemistry 101",
      studentName: "Charlie Green",
      totalScore: 90,
    },
    {
      studentId: 6,
      courseName: "Chemistry 101",
      studentName: "Diana White",
      totalScore: 87,
    },
    {
      studentId: 7,
      courseName: "Biology 101",
      studentName: "Eve Black",
      totalScore: 93,
    },
    {
      studentId: 8,
      courseName: "Biology 101",
      studentName: "Frank Blue",
      totalScore: 89,
    },
    {
      studentId: 9,
      courseName: "History 101",
      studentName: "Grace Yellow",
      totalScore: 94,
    },
    {
      studentId: 10,
      courseName: "History 101",
      studentName: "Henry Orange",
      totalScore: 91,
    },
  ];
  useEffect(() => {
    ApiInstance.get(`/class/list-by-student`)
      .then((response) => {
        console.log(response.data.data);
        setClassData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchRanks = async (page, limit) => {
    // Simulate fetching data from an API
    // Replace this with the actual API call if needed
    const data = mockRanks;

    // Simulate searching and pagination
    const filteredRanks = data.filter((rank) =>
      rank.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (page - 1) * limit;
    const end = start + limit;
    setRanks(filteredRanks.slice(start, end));
    setTotalRanks(filteredRanks.length);
  };

  useEffect(() => {
    fetchRanks(page, ranksPerPage);
  }, [page, searchQuery]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClassChange = (event) => {
    console.log(event.target.value);
    setSelectedClass(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const pageCount = Math.ceil(totalRanks / ranksPerPage);

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }}>
        <Grid container spacing={2}>
          <Grid item flex={1}>
            <Typography variant="h4" gutterBottom>
              Quiz Practice Rank
            </Typography>
          </Grid>
          <Grid item flex={1}>
            <Box display="flex" alignItems="center" mr={1}>
              <InputLabel
                className="table-label-selectClass"
                id="select-class-label"
              >
                Select Corse
              </InputLabel>
              <Select
                labelId="select-class-label"
                id="select-class"
                value={selectedClass}
                label="Select Course"
                onChange={handleClassChange}
                style={{ marginLeft: "8px", width: "180px" }}
              >
                {classData.map((classInfo, index) => (
                  <MenuItem key={index} value={classInfo.id}>
                    {classInfo?.course.code}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>

        <Box>
          <TableContainer
            component={Paper}
            sx={{
              height: "540px",
              width: "1000px",
              marginTop: "20px",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Student Code</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Total Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranks.map((rank, index) => (
                  <TableRow key={rank.studentId}>
                    <TableCell>
                      {(page - 1) * ranksPerPage + index + 1}
                    </TableCell>
                    <TableCell>{rank.courseName}</TableCell>
                    <TableCell>{rank.studentName}</TableCell>
                    <TableCell>{rank.totalScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default StudentGrade;
