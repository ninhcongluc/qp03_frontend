import React from "react";
import { useCallback, useEffect, useState } from "react";
import MenuComponent from "../../components/LeftMenu/Menu";
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TablePagination,

} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const data = [
    // tao data cho toi, trong do co các trường Question, course, type, trong mỗi question có 4 câu trả lời
    {
        id: 1, question: "What is 1 + 1?", course: "Math", type: "Multiple Choice", answer: "2",
        options: { answer1: "1", answer2: "2", answer3: "3", answer4: "4" }
    },
    {
        id: 1, question: "What is 1 + 1?", course: "Math", type: "Multiple Choice", answer: "2",
        options: { answer1: "1", answer2: "2", answer3: "3", answer4: "4" }
    },
    {
        id: 2, question: "What is 2 + 3?", course: "Math", type: "Multiple Choice", answer: "5",
        options: { answer1: "3", answer2: "4", answer3: "5", answer4: "6" }
    },
    {
        id: 3, question: "What is 3 + 4?", course: "Math", type: "Multiple Choice", answer: "7",
        options: { answer1: "5", answer2: "6", answer3: "7", answer4: "8" }
    },
    {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    },
    {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    },
    {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    },
    {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    }, {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    },
    {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    },
    {
        id: 4, question: "What is 4 + 5?", course: "Math", type: "Multiple Choice", answer: "9",
        options: { answer1: "7", answer2: "8", answer3: "9", answer4: "10" }
    },
];

const TeacherQuestionBank = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const questionBank = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );


    return (
        <div className="container" style={{ marginRight: "-270px" }}>
            <MenuComponent role="teacher"/>
            <Box>
                <div className="header-page"
                    style={{
                        width: "700px",
                        textAlign: "center",
                        marginTop: "50px",
                    }}>
                    <Typography textAlign="center" variant="h4" gutterBottom>
                        Question Bank
                    </Typography>
                </div>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <div style={{ display: "flex" }}>
                        <div>
                            <TextField
                                label="Search question"
                                variant="outlined"
                                size="small"
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div>
                            <FormControl
                                size="small"
                                sx={{
                                    marginLeft: "10px",
                                    width: "150px",
                                }}
                            >
                                <InputLabel id="semester-select-label">Course</InputLabel>
                                <Select
                                    labelId="semester-select-label"
                                    label="Couse"
                                    id="semester-select"
                                    value={null}
                                    onChange={(e) => console.log(e.target.value)}
                                >
                                    <MenuItem value="">All Course</MenuItem>
                                    <MenuItem value="">Course 1</MenuItem>
                                    <MenuItem value="">Course 2</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div style={{}}>
                        <Button
                            sx={{
                                width: "120px",
                                height: "40px",
                                backgroundColor: "#229342",
                                "&:hover": {
                                    backgroundColor: "#1e7b36",
                                },
                            }}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => console.log("Add course")}
                        >
                            <AddIcon /> Question
                        </Button>
                    </div>
                </Box>
                <div>
                    <TableContainer
                        component={Paper}
                        sx={{ marginRight: "-270px" }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={"10%"}>STT</TableCell>
                                    <TableCell width={"10%"}>Course</TableCell>
                                    <TableCell width={"40%"}>Question</TableCell>
                                    <TableCell width={"15%"}>Type</TableCell>
                                    <TableCell width={"15%"}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questionBank.map((question, index) => (
                                    <TableRow key={question.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{question.course}</TableCell>
                                        <TableCell>{question.question}</TableCell>
                                        <TableCell>{question.type}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex" }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => console.log("View")}
                                                    style={{ marginRight: "8px", width: "50px" }}
                                                >
                                                    <RemoveRedEyeIcon />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => console.log("Edit")}
                                                    style={{
                                                        marginRight: "8px",
                                                        width: "50px",
                                                        backgroundColor: "#fbd64f",
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => console.log("Delete")}
                                                    style={{ width: "50px" }}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TablePagination
                    rowsPerPageOptions={[6, 12, 30]}
                    component="div"
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    );
};

export default TeacherQuestionBank;