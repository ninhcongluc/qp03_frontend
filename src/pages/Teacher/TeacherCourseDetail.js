import {
  Add as AddIcon,
  RemoveRedEye as ViewIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
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
import { useParams } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { toast } from "react-toastify";
import ApiInstance from "../../axios";
import { formatDateDay } from "../../commons/function";
// import MenuComponent from "../../components/LeftMenu/Menu";
import "./styles/TeacherCourseDetail.css";
import { useNavigate } from "react-router-dom";

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
    minWidth: 170,
  },
  {
    id: "score",
    label: "Score",
    minWidth: 170,
  },
  {
    id: "hidden",
    label: "Hidden",
    minWidth: 170,
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

  const [newQuiz, setNewQuiz] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    timeLimitMinutes: 0,
    score: 10,
    isHidden: false,
  });
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);

  useEffect(() => {
    ApiInstance.get(`/course/${courseId}`)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
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
        await ApiInstance.post(`/import-student/${selectedClassId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        ApiInstance.get(`/student/${selectedClassId}`)
          .then((response) => {
            setStudents(response.data.data);
            toast.success("Import student successfully");
          })
          .catch((error) => {
            console.error("Error fetching student data:", error);
          });
      } catch (error) {
        console.error("Error importing students:", error);
      }
    }
  };

  const paginatedQuizzes = quizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleClassChange = (event) => {
    setSelectedClassId(event.target.value);
  };

  const handleToggleHidden = () => {};

  const handleCreateQuiz = () => {
    setSelectedQuiz(null);
    setShowCreateQuizDialog(true);
    setNewQuiz({
      name: "",
      description: "",
      startDate: null,
      endDate: null,
      timeLimitMinutes: 0,
      score: 10,
      isHidden: false,
    });
  };

  const handleCloseCreateQuizDialog = () => {
    setShowCreateQuizDialog(false);
    setNewQuiz({
      name: "",
      description: "",
      startDate: null,
      endDate: null,
      timeLimitMinutes: 0,
      score: 10,
      isHidden: false,
    });
  };

  const handleViewQuiz = (quiz) => {};

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setNewQuiz({
      name: quiz.name,
      description: quiz.description,
      startDate: new Date(quiz.startDate),
      endDate: new Date(quiz.endDate),
      timeLimitMinutes: quiz.timeLimitMinutes,
      score: quiz.score,
      isHidden: quiz.isHidden,
    });
    setShowCreateQuizDialog(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await ApiInstance.delete(`/quiz/${quizId}`, config);
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

  const handleQuizFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (selectedQuiz) {
        // Update existing quiz
        await ApiInstance.put(`/quiz/${selectedQuiz.id}`, newQuiz, config);
        toast.success("Quiz updated successfully");
      } else {
        // Create new quiz
        await ApiInstance.post(
          `/quiz/create`,
          { ...newQuiz, classId: selectedClassId },
          config
        );
        toast.success("Quiz created successfully");
      }

      fetchData();
      handleCloseCreateQuizDialog();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error submitting quiz form:", error);
    }
  };

  return (
    <Box className="teacher-course-detail-page">
      {/* <MenuComponent role="teacher" /> */}
      <div className="content">
        <button className="back-button" onClick={() => navigate(-1)}></button>
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
                    <TableCell>{quiz.score}</TableCell>
                    <TableCell>
                      <Switch
                        checked={quiz.isHidden}
                        onChange={() => handleToggleHidden(quiz.id)}
                      />
                    </TableCell>
                    <TableCell id="action-button">
                      <IconButton
                        className="icon-button"
                        onClick={() => handleViewQuiz(quiz)}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        className="icon-button"
                        onClick={() => handleEditQuiz(quiz)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className="icon-button"
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
                value={
                  newQuiz.startDate
                    ? newQuiz.startDate.toISOString().slice(0, -1)
                    : ""
                }
                onChange={(e) =>
                  setNewQuiz({
                    ...newQuiz,
                    startDate: new Date(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="End Date"
                type="datetime-local"
                value={
                  newQuiz.endDate
                    ? newQuiz.endDate.toISOString().slice(0, -1)
                    : ""
                }
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, endDate: new Date(e.target.value) })
                }
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Time Limit (minutes)"
                type="number"
                value={newQuiz.timeLimitMinutes}
                onChange={(e) =>
                  setNewQuiz({
                    ...newQuiz,
                    timeLimitMinutes: parseInt(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Score"
                type="number"
                value={newQuiz.score}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, score: parseInt(e.target.value) })
                }
                select
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </TextField>
              <div className="hidden-switch">
                <Typography variant="subtitle1">
                  Show Student Answers:
                </Typography>
                <Switch
                  checked={newQuiz.isHidden}
                  onChange={(e) =>
                    setNewQuiz({ ...newQuiz, isHidden: e.target.checked })
                  }
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
                    <TableCell>{`${student?.firstName || ""} ${
                      student?.lastName || ""
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
