import React, { useCallback, useEffect, useState } from "react";
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
    Stack,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import ApiInstance from "../../axios";
import { toast } from "react-toastify";

const TeacherQuestionBank = () => {
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [questionBank, setQuestionBank] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [courseToSelect, setCourseToSelect] = useState("");
    const [newSearchTerm, setNewSearchTerm] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [typeEdit, setTypeEdit] = useState("");
    const [courseSelect, setCourseSelect] = useState("");
    const [openCreate, setOpenCreate] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [questionToSelect, setQuestionToSelect] = useState(
        { id: 1, courseId: "", type: "", answerOptions: [""] }
    );
    const questionPerPage = 7;
    const teacherId = JSON.parse(localStorage.getItem("user")).id;

    const fetchQuestionData = useCallback(async (page, limit, teacherId, courseId = "", searchQuestion = "") => {
        try {
            const response = await ApiInstance.get(
                `/question/${teacherId}?page=${page}&limit=${limit}&courseId=${courseId}&searchQuestion=${searchQuestion}`
            );
            setQuestionBank(response.data.data.questionList);
            setTotalItem(response.data.data.total);
            console.log("Question data:", response.data.data.questionList);
        } catch (error) {
            console.error("Error fetching question information:", error);
        }
    }, []);

    const fetchCourseData = useCallback(async (teacherId) => {
        try {
            const response = await ApiInstance.get(`/course-list/${teacherId}`);
            setCourseList(response.data.data);
            console.log("Course data:", response.data.data);
        } catch (error) {
            console.error("Error fetching course information:", error);
        }
    }, []);

    useEffect(() => {
        fetchQuestionData(1, questionPerPage, teacherId);
        fetchCourseData(teacherId);
    }, [teacherId]);

    const pageCount = Math.ceil(totalItem / questionPerPage);

    const handlePageChange = useCallback((event, value) => {
        setPage(value);
        fetchQuestionData(value, questionPerPage, teacherId, courseToSelect, newSearchTerm);
    }, [teacherId, courseToSelect, newSearchTerm, fetchQuestionData]);

    const handleChangeCourse = useCallback(async (event) => {
        setCourseToSelect(event.target.value);
        if (event.target.value) {
            await fetchQuestionData(1, questionPerPage, teacherId, event.target.value, newSearchTerm);
        } else {
            await fetchQuestionData(1, questionPerPage, teacherId);
        }
    }, [teacherId, newSearchTerm, fetchQuestionData]);

    const handleSearchQuestion = (event) => {
        const searchTerm = event.target.value;
        setNewSearchTerm(searchTerm);

        if (searchTerm !== "") {
            fetchQuestionData(1, questionPerPage, teacherId, courseToSelect, searchTerm);
        } else {
            fetchQuestionData(1, questionPerPage, teacherId, courseToSelect);
        }
    };

    const handleClose = () => {
        setQuestionToSelect("");
        setTypeEdit("");
        setOpenDelete(false);
        setOpenCreate(false);
        setOpenView(false);
    };

    const handleDeleteQuestion = useCallback((question) => {
        setQuestionToSelect(question);
        setOpenDelete(true);
    }, []);

    const handleDelete = async () => {
        try {
            await ApiInstance.delete(`/question/${questionToSelect?.id}`);
            fetchQuestionData(1, questionPerPage, teacherId, courseToSelect);
            toast.success("Question deleted successfully");
            handleClose();
        } catch (error) {
            toast.error(error.response.data.error);
            console.error("Error deleting question:", error);
            handleClose();
        }
    };

    // handle view
    const handleView = useCallback((question, course) => {
        setCourseSelect(course);
        setQuestionToSelect(question);
        setOpenView(true);
    }, []);

    // handle edit question
    const handleEdit = useCallback((question, course) => {
        setQuestionToSelect(question);
        setTypeEdit("edit");
        setOpenCreate(true);
        setCourseSelect(course);
    }, []);

    // handle update question

    // handle create question
    const handleCreate = useCallback(() => {
        setCourseSelect("");
        setQuestionToSelect({ id: 1, courseId: "", type: "", answerOptions: [""] });
        setTypeEdit("create");
        setOpenCreate(true);
    }, []);


    // thay đôi text, answer, type

    // Handle question text change
    const handleTextChange = (event) => {
        setQuestionToSelect({ ...questionToSelect, text: event.target.value });
    };

    // Handle question type change
    const handleTypeChange = (event) => {
        setQuestionToSelect(
            { ...questionToSelect, type: event.target.value }
        );

    };

    const handleCourseChange = (event) => {
        // Update the state
        setQuestionToSelect((prevQuestion) => ({
            ...prevQuestion,
            courseId: event.target.value
        }));
        // Update the selected course
        setCourseSelect(courseList.find((course) => course.id === event.target.value));
    };
    const handleCorrectAnswerChange = (event, optionIndex) => {
        const { checked } = event.target;
        const updatedOptions = questionToSelect.answerOptions.map((option, index) => {
            if (index === optionIndex && questionToSelect.type === "multiple_choice") {
                return {
                    ...option,
                    isCorrect: checked,
                };
            }
            if (questionToSelect.type === "select_one") {
                return {
                    ...option,
                    isCorrect: index === optionIndex,
                };
            }
            return option;
        });
        setQuestionToSelect({ ...questionToSelect, answerOptions: updatedOptions });
    };

    // Handle option    
    const handleOptionTextChange = (event, optionIndex) => {
        const updatedOptions = [...questionToSelect.answerOptions];
        updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            optionText: event.target.value,
        };
        setQuestionToSelect({ ...questionToSelect, answerOptions: updatedOptions });
    };

    const handleDeleteOption = (optionIndex) => {
        if (Array.isArray(questionToSelect.answerOptions)) {
            const newOptions = questionToSelect.answerOptions.filter(
                (option, index) => index !== optionIndex
            );
            setQuestionToSelect({ ...questionToSelect, answerOptions: newOptions });
        }
    };

    const handleAddOption = () => {
        if (Array.isArray(questionToSelect.answerOptions)) {
            setQuestionToSelect({
                ...questionToSelect,
                answerOptions: [...questionToSelect.answerOptions, ""]
            });
        } else {
            setQuestionToSelect({
                ...questionToSelect,
                answerOptions: [""]
            });
        }
    }

    /// handle create and update question
    const handleSubmitUpdate = async () => {
        console.log("questionToSelect:", questionToSelect);
        console.log("questionToSelect:", courseSelect);
        try {
            //check type not null   
            if (questionToSelect.type === "") {
                toast.error("Type is required");
                return;
            }
            //check course not null
            if (courseSelect === "") {
                toast.error("Course is required");
                return;
            }
            // check question not null
            if (questionToSelect.text === "" || questionToSelect.text === undefined) {
                toast.error("Question is required");
                return;
            }

            // check optionText not null
            if(questionToSelect.answerOptions.map(option => option.optionText === "" || option.optionText === undefined).includes(true)){
                toast.error("Answer is required");
                return;
            }
            // check answerOptions not null
            if (questionToSelect.answerOptions.length < 2) {
                toast.error("At least 2 answer options are required");
                return;
            }
            // check correct answer
            const correctAnswer = questionToSelect.answerOptions.filter(
                (option) => option.isCorrect
            );
            if (correctAnswer.length === 0) {
                toast.error("At least 1 correct answer is required");
                return;
            }

            if (typeEdit === "create") {
                await ApiInstance.post(`/question/create`, {
                    courseId: courseSelect.id,
                    teacherId: teacherId,
                    question: questionToSelect,
                });
                toast.success("Question created successfully");
            } else {
                await ApiInstance.put(`/question/${questionToSelect.id}`, {
                    courseId: courseSelect.id,
                    question: questionToSelect,
                });
                toast.success("Question updated successfully");
            }
            fetchQuestionData(1, questionPerPage, teacherId, courseToSelect);
            setCourseSelect("");
            handleClose();
        } catch (error) {
            toast.error(error.response.data.error);
            console.error("Error creating or updating question:", error);
        }
    };

    const handleImportQuestion = async (event) => {
        const fileInput = event.target.files[0];
        console.log("🚀 ~ handleImportQuestion ~ fileInput:", fileInput);
        if (fileInput) {
            const formData = new FormData();
            formData.append("file", fileInput);
            try {
                await ApiInstance.post(`/question/import/${teacherId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                fetchQuestionData(1, questionPerPage, teacherId, courseToSelect);
                toast.success("Question imported successfully");
            } catch (error) {
                toast.error(error.response.data.error);
                console.error("Error importing question:", error);
            }
        }
    };

    const handleExportData = async () => {
        try {
            const response = await ApiInstance.post(
                `/question/export/${teacherId}`,
                {},
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "DanhSachQuestion.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast.error(error.response.data.error);
            console.error("Error exporting data:", error);
        }
    };

    return (
        <div className="container" style={{ marginRight: "-270px" }}>
            <MenuComponent role="teacher" />
            <Box>
                <div className="header-page"
                    style={{
                        width: "700px",
                        textAlign: "center",
                        marginTop: "40px",
                    }}>
                    <Typography textAlign="center" variant="h4" gutterBottom>
                        Question Bank
                    </Typography>
                </div>
                <Box display="flex" justifyContent="space-between" mb={1} mt={-1}>
                    <div style={{ display: "flex" }}>
                        <div>
                            <TextField
                                label="Search question"
                                variant="outlined"
                                size="small"
                                onChange={handleSearchQuestion}
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
                                    value={courseToSelect}
                                    onChange={handleChangeCourse}
                                >
                                    <MenuItem value="">All Course</MenuItem>
                                    {courseList?.map((course) => (
                                        <MenuItem key={course.id} value={course.id}>
                                            {course.code}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div>
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
                            onClick={() => handleCreate()}
                        >
                            <AddIcon /> Question
                        </Button>
                        <Button
                            sx={{
                                width: "150px",
                                height: "40px",
                                marginLeft: "10px",
                            }}
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<CloudUploadIcon />}
                            component="label"
                        >
                            Import Data
                            <input type="file" hidden onChange={handleImportQuestion} />
                        </Button>
                        <Button
                            sx={{
                                width: "150px",
                                height: "40px",
                                marginLeft: "10px",
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handleExportData}
                        >
                            Export Data
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
                                    <TableCell width={"15%"}>Course</TableCell>
                                    <TableCell width={"30%"}>Question</TableCell>
                                    <TableCell width={"15%"}>Type</TableCell>
                                    <TableCell width={"15%"}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questionBank?.map((questionList, index) => (
                                    <TableRow key={questionList.questionId}>
                                        <TableCell>{index + 1 + (page-1) * 7}</TableCell>
                                        <TableCell>{questionList.course.code}</TableCell>
                                        <TableCell>{questionList.question.text}</TableCell>
                                        <TableCell>{questionList.question.type}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex" }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleView(questionList.question, questionList.course)}
                                                    style={{ marginRight: "8px", width: "50px" }}
                                                >
                                                    <RemoveRedEyeIcon />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleEdit(questionList.question, questionList.course)}
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
                                                    onClick={() => handleDeleteQuestion(questionList.question)}
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
                <div
                    style={{
                        position: 'fixed',
                        bottom: 10,
                        alignItems: "center"
                    }}
                >
                    <Stack spacing={2} >
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </div>
            </Box>
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the question "{questionToSelect?.text}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDelete}
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
                        onClick={() => setOpenDelete(false)}
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

            <Dialog
                open={openView}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title"
                    width="600px"
                    textAlign={"center"}
                    sx={{
                        backgroundColor: "#229342",
                        color: "white",

                    }}
                    mb={1}
                >
                    View Question and Answer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="h6" gutterBottom>
                            Course: {courseSelect?.code}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Question: {questionToSelect.text}
                        </Typography>
                        {questionToSelect.answerOptions?.map((answer, index) => (
                            <Box display={"flex"}>
                                {questionToSelect.type === "select_one" ? (
                                    <input
                                        type="radio"
                                        name={`question${questionToSelect.id}`}
                                        checked={answer?.isCorrect}
                                        style={{ marginRight: "10px", marginTop: "-5px" }}
                                    />
                                ) : null}
                                {questionToSelect.type === "multiple_choice" ? (
                                    <input
                                        type="checkbox"
                                        name={`question${questionToSelect.id}`}
                                        checked={answer?.isCorrect}
                                        style={{ marginRight: "10px", marginTop: "-5px" }}
                                    />
                                ) : null}
                                <Typography variant="body1" gutterBottom>
                                    {answer.optionText}
                                </Typography>
                            </Box>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenView(false)}
                        sx={{
                            color: "white",
                            backgroundColor: "#E00201",
                            "&:hover": {
                                backgroundColor: "#c70404",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreate} onClose={handleClose}>
                <DialogTitle
                    width="600px"
                    textAlign={"center"}
                    sx={{
                        backgroundColor: "#229342",
                        color: "white",

                    }}
                    mb={1}>
                    {typeEdit === "edit" ? "Update Question" : "Create New Question"}
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} className="tableContainer">
                        <Table stickyHeader>
                            <TableBody>
                                <React.Fragment key={questionToSelect?.id}>
                                    <TableRow>
                                        <TableCell sx={{ verticalAlign: "top" }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="type">Type</InputLabel>
                                                <Select
                                                    labelId="type"
                                                    label="Type"
                                                    id="type-select"
                                                    value={questionToSelect?.type}
                                                    onChange={(event) =>
                                                        handleTypeChange(event)
                                                    }
                                                    sx={{
                                                        width: 155,
                                                        fontSize: 15,
                                                    }}
                                                >
                                                    <MenuItem value="select_one">Select One</MenuItem>
                                                    <MenuItem value="multiple_choice">
                                                        Multiple Choice
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth>
                                                <InputLabel id="course">Course</InputLabel>
                                                <Select
                                                    labelId="course"
                                                    label="Course"
                                                    id="course-select"
                                                    value={courseSelect?.id}
                                                    onChange={(event) =>
                                                        handleCourseChange(event)
                                                    }
                                                    sx={{
                                                        width: 155,
                                                        fontSize: 15,
                                                    }}
                                                >
                                                    {courseList?.map((course) => (
                                                        <MenuItem key={course.id} value={course.id}>
                                                            {course.code}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <tableCell colSpan={2}>
                                            <Box display={"flex"} marginLeft={2}>
                                                <Box className="questionLabel" marginRight={2}>
                                                    Question:
                                                </Box>
                                                <TextField
                                                    id="standard-basic"
                                                    value={questionToSelect?.text}
                                                    variant="standard"
                                                    className="textField"
                                                    required
                                                    onChange={(event) =>
                                                        handleTextChange(event)
                                                    }
                                                />
                                            </Box>
                                        </tableCell>
                                    </TableRow>
                                    {questionToSelect.answerOptions?.map((option, optionIndex) => (
                                        <TableRow key={optionIndex}>
                                            <TableCell className="optionCell">
                                                <input
                                                    type={
                                                        questionToSelect?.type === "select_one"
                                                            ? "radio"
                                                            : "checkbox"
                                                    }
                                                    name={`question${questionToSelect?.id}`}
                                                    value={optionIndex}
                                                    onClick={(event) =>
                                                        handleCorrectAnswerChange(
                                                            event,
                                                            optionIndex
                                                        )
                                                    }
                                                    defaultChecked={option.isCorrect}
                                                    style={{ marginRight: "8px" }}
                                                />
                                                <TextField
                                                    id="standard-basic"
                                                    value={option?.optionText}
                                                    variant="standard"
                                                    type="text"
                                                    required
                                                    onChange={(event) =>
                                                        handleOptionTextChange(
                                                            event,
                                                            optionIndex
                                                        )
                                                    }
                                                    sx={{ width: "70%" }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <CloseIcon
                                                    sx={{
                                                        color: "red",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                                                            borderRadius: "50%",
                                                            cursor: "pointer",
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        handleDeleteOption(optionIndex)
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Box className="optionButtons">
                                                <AddIcon
                                                    sx={{
                                                        width: "30px",
                                                        height: "30px",
                                                        marginLeft: "20px",
                                                        marginRight: 8,
                                                        color: "primary.main",
                                                        "&:hover": {
                                                            backgroundColor: "#749bd4",
                                                            borderRadius: "50%",
                                                            cursor: "pointer",
                                                            color: "white",
                                                        },
                                                    }}
                                                    onClick={() => handleAddOption()}
                                                />{" "}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    {typeEdit === "edit" ? (
                        <Button
                            onClick={handleSubmitUpdate}
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
                    ) : (
                        <Button
                            onClick={handleSubmitUpdate}
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
                            Create
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

        </div >
    );
};

export default TeacherQuestionBank;
