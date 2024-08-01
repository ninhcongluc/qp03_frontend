import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RemoveRedEye as ViewIcon,
} from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { formatDate } from "../../commons/function";
import InputLabel from "@mui/material/InputLabel";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiInstance from "../../axios";
import { formatDateDay } from "../../commons/function";
import { useNavigate } from "react-router-dom";
import "./styles/TeacherCourseDetail.css";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "startDate", label: "StartDate", minWidth: 100 },
  {
    id: "endDate",
    label: "EndDate",
    minWidth: 170,
  },
  {
    id: "timeLimitMinutes",
    label: "TimeLimit\u00a0minutes",
    minWidth: 120,
  },
  {
    id: "maxLimitAttempts",
    label: "LimitAttempts",
    minWidth: 120,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 120,
  },
  {
    id: "showAnswer",
    label: "ShowAnswer",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

const TeacherCourseDetailPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [course, setCourse] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [showStudentDialog, setShowStudentDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { courseId } = useParams();
  let navigate = useNavigate();
  const teacherId = JSON.parse(localStorage.getItem("user")).id;

  const [newQuiz, setNewQuiz] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    type: "practice",
    classId: selectedClassId,
    timeLimitMinutes: 0,
    isLimitedAttempts: false,
    maxAttempts: 0,
    score: 10,
    showAnswer: false,
  });
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  console.log("courseId", courseId);
  useEffect(() => {
    ApiInstance.get(`/course/${courseId}?teacherId=${teacherId}`)
      .then((response) => {
        const courseData = response.data.data;
        setCourse(courseData);
        if (courseData?.classes.length > 0) {
          setSelectedClassId(courseData?.classes[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [courseId]);

  const fetchData = useCallback(async () => {
    try {
      if (selectedClassId) {
        const response = await ApiInstance.get(`/quiz/${selectedClassId}`);
        setQuizzes(response.data.data);

        const students = await ApiInstance.get(`/student/${selectedClassId}`);
        setStudents(students.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedClassId) {
      fetchData();
    }
  }, [selectedClassId, fetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleImportStudents = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await ApiInstance.post(
          `/teacher/import-student/${selectedClassId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        ApiInstance.get(`/student/${selectedClassId}`)
          .then((response) => {
            setStudents(response.data.data);
            toast.success("Import student successfully");
          })
          .catch((error) => {
            console.error("Error fetching student data:", error);
          });
      } catch (error) {
        toast.error(error.response.data.error);

        console.error("Error importing students:", error);
      }
    }
  };

  const handleExportData = async () => {
    try {
      const response = await ApiInstance.post(
        `/teacher/export-students/${selectedClassId}`,
        {},
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DanhSachSinhVien.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error exporting data:", error);
    }
  };

  const paginatedQuizzes = quizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleClassChange = (event) => {
    setSelectedClassId(event.target.value);
  };

  const handleCreateQuiz = () => {
    setSelectedQuiz(null);
    setShowCreateQuizDialog(true);
    setNewQuiz({
      name: "",
      description: "",
      startDate: null,
      endDate: null,
      type: "practice",
      isLimitedAttempts: false,
      maxAttempts: 0,
      timeLimitMinutes: 0,
      score: 10,
      showAnswer: false,
    });
  };

  const handleCloseCreateQuizDialog = () => {
    setShowCreateQuizDialog(false);
    setNewQuiz({
      name: "",
      description: "",
      startDate: null,
      type: "practice",
      isLimitedAttempts: false,
      classId: selectedClassId,
      endDate: null,
      timeLimitMinutes: 0,
      score: 10,
      showAnswer: false,
    });
    console.log("newQuiz", selectedClassId);
  };

  const handleViewQuiz = (quiz) => {
    navigate(`/teacher/quiz/${quiz.id}/question-list`);
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setNewQuiz({
      name: quiz.name,
      description: quiz.description,
      startDate: new Date(quiz.startDate),
      endDate: new Date(quiz.endDate),
      classId: selectedClassId,
      type: quiz.type,
      isLimitedAttempts: quiz.isLimitedAttempts,
      maxAttempts: Number(quiz?.maxAttempts || 0),
      timeLimitMinutes: Number(quiz.timeLimitMinutes),
      score: quiz.score,
      showAnswer: quiz.showAnswer,
    });
    setShowCreateQuizDialog(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await ApiInstance.delete(`/quiz/${quizId}`);
      fetchData();
      toast.success("Quiz deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error deleting quiz:", error);
    }
  };

  const handleViewStudents = () => {
    setShowStudentDialog(true);
  };
  const handleCloseStudentDialog = () => {
    setShowStudentDialog(false);
  };

  const handleQuizTypeChange = (event) => {
    const selectedType = event.target.value;
    const today = new Date();
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      type: selectedType,
      startDate: selectedType === "exam" ? today : prevQuiz.startDate,
      endDate: selectedType === "exam" ? today : prevQuiz.endDate,
      isLimitedAttempts: selectedType === "exam" ? true : prevQuiz.isLimitedAttempts,
      maxAttempts: selectedType === "exam" ? 1 : prevQuiz.maxAttempts,
      showAnswer: selectedType === "exam" ? false : prevQuiz.showAnswer,
    }));
  };

  const handleQuizFormSubmit = async (event) => {
    event.preventDefault();
    if (newQuiz.type === "exam") {
      const startDate = new Date(newQuiz.startDate);
      const endDate = new Date(newQuiz.endDate);
      
      // Ensure startDate and endDate are on the same day
      if (startDate.getDate() !== endDate.getDate() || 
          startDate.getMonth() !== endDate.getMonth() || 
          startDate.getFullYear() !== endDate.getFullYear()) {
        toast.error("Start date and end date must be on the same day for an exam.");
        return;
      }
    }
    try {
      if (selectedQuiz) {
        // Update existing quiz
        await ApiInstance.put(`/quiz/${selectedQuiz.id}`, newQuiz);
        toast.success("Quiz updated successfully");
      } else {
        // Create new quiz
        await ApiInstance.post(`/quiz/create`, {
          ...newQuiz,
          classId: selectedClassId,
        });
        toast.success("Quiz created successfully");
      }

      fetchData();
      handleCloseCreateQuizDialog();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.status === "failed"
      ) {
        const { details } = error.response.data.error;
        details.forEach((detail) => {
          toast.error(detail.message);
        });
      } else {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <Box className="teacher-course-detail-page">
      <div className="content">
        <BackButton />

        <div className="class-select">
          <Typography variant="h4" gutterBottom>
            {course ? course.name : "Loading..."}
          </Typography>
          <Select
            value={selectedClassId}
            onChange={handleClassChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Class
            </MenuItem>
            {course &&
              course.classes.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </MenuItem>
              ))}
          </Select>
        </div>

        <div className="quiz-management">
          <Typography variant="h4" gutterBottom>
            Quiz Management
          </Typography>
          <div className="button-group">
            <Button
              className="create-button"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateQuiz}
            >
              Create Quiz
            </Button>

            <Button
              variant="contained"
              id="view-student"
              startIcon={<PeopleAltIcon />}
              color="primary"
              onClick={() => handleViewStudents()}
            >
              View Students
            </Button>
          </div>
          <Box>
            <Table
              stickyHeader
              aria-label="sticky table"
              className="quiz-table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedQuizzes.map((quiz) => (
                  <TableRow key={quiz.id} className="custom-row">
                    <TableCell>{quiz.name}</TableCell>
                    <TableCell>{formatDateDay(quiz.startDate)}</TableCell>
                    <TableCell>{formatDateDay(quiz.endDate)}</TableCell>
                    <TableCell>{quiz.timeLimitMinutes}</TableCell>
                    <TableCell>
                      {quiz.isLimitedAttempts ? quiz.maxAttempts : "No"}
                    </TableCell>
                    <TableCell>{quiz.type}</TableCell>
                    <TableCell
                      style={{
                        color: quiz.showAnswer ? "blue" : "red",
                      }}
                    >
                      {quiz.showAnswer ? "True" : "False"}
                    </TableCell>{" "}
                    <TableCell
                      style={{
                        color: quiz?.status === "submitted" ? "green" : "red",
                      }}
                    >
                      {quiz?.status}
                    </TableCell>
                    <TableCell id="action-button">
                      <Button
                        className="icon-button"
                        onClick={() => handleViewQuiz(quiz)}
                        style={{ color: "blue", backgroundColor: "#d1ebe3" }}
                      >
                        Q&A
                      </Button>
                      <IconButton
                        className="icon-button"
                        disabled={quiz?.isTaken}
                        onClick={() => handleEditQuiz(quiz)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className="icon-button"
                        disabled={quiz?.isTaken}
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={quizzes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

        <Dialog
          open={showCreateQuizDialog}
          onClose={handleCloseCreateQuizDialog}
        >
          <DialogTitle>
            {selectedQuiz ? "Edit Quiz" : "Create Quiz"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleQuizFormSubmit}>
              <TextField
                label="Quiz Name"
                value={newQuiz.name}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, name: e.target.value })
                }
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Description"
                value={newQuiz.description}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, description: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Start Date"
                type="datetime-local"
                value={newQuiz.startDate ? formatDate(newQuiz.startDate) : ""}
                onChange={(e) =>
                  setNewQuiz({
                    ...newQuiz,
                    startDate: new Date(e.target.value),
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                required
              />
              <TextField
                label="End Date"
                type="datetime-local"
                value={newQuiz.endDate ? formatDate(newQuiz.endDate) : ""}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, endDate: new Date(e.target.value) })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                required
              />
              <div>
                <InputLabel id="quiz-type">Type</InputLabel>
                <Select
                  labelId="quiz-type"
                  id="quiz-type"
                  defaultValue={"practice"}
                  value={newQuiz.type}
                  onChange={handleQuizTypeChange}
                >
                  <MenuItem value="practice">Practice</MenuItem>
                  <MenuItem value="exam">Exam</MenuItem>
                </Select>
              </div>
              <TextField
                label="Time Limit (minutes)"
                type="number"
                value={newQuiz.timeLimitMinutes}
                onChange={(e) =>
                  setNewQuiz({
                    ...newQuiz,
                    timeLimitMinutes: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                required
              />
              <div>
                <Typography variant="subtitle1">Limit Attempts:</Typography>
                <Switch
                  checked={newQuiz.type === "exam" ? true : newQuiz.isLimitedAttempts}
                  onChange={(e) =>
                    setNewQuiz({
                      ...newQuiz,
                      isLimitedAttempts: newQuiz.type === "exam" ? true : e.target.checked, 
                    })
                  }
                  disabled={newQuiz.type === "exam"} 
                />
              </div>
              {(newQuiz.isLimitedAttempts || newQuiz.type === "exam") && ( 
                <TextField
                  label="Max Attempts"
                  type="text"
                  value={newQuiz.type === "exam" ? 1 : newQuiz.maxAttempts} 
                  onChange={(e) =>
                    setNewQuiz({
                      ...newQuiz,
                      maxAttempts: newQuiz.type === "exam" ? 1 : e.target.value.replace(/\D/g, ""), 
                    })
                  }
                  fullWidth
                  margin="normal"
                  required
                  disabled={newQuiz.type === "exam"} 
                />
              )}
              <div className="hidden-switch">
                <Typography variant="subtitle1">Show Student Answers:</Typography>
                <Switch
                  checked={newQuiz.type === "exam" ? false : newQuiz.showAnswer} 
                  onChange={(e) =>
                    setNewQuiz({
                      ...newQuiz,
                      showAnswer: newQuiz.type === "exam" ? false : e.target.checked, 
                    })
                  }
                  disabled={newQuiz.type === "exam"} 
                />
              </div>

              <DialogActions>
                <Button onClick={handleCloseCreateQuizDialog} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {selectedQuiz ? "Update" : "Create"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showStudentDialog} onClose={handleCloseStudentDialog}>
          <DialogTitle>Student List</DialogTitle>

          <DialogContent>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Import Students
              <input type="file" hidden onChange={handleImportStudents} />
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Student Code</TableCell>
                  <TableCell>Student Email</TableCell>
                  <TableCell>Student Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Avatar src={student.avatar} />
                    </TableCell>
                    <TableCell>{student.code}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{`${student?.firstName || ""} ${student?.lastName || ""
                      }`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStudentDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default TeacherCourseDetailPage;
