import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  Snackbar,
  TextField,
  Typography,
  Avatar,
} from "@mui/material"; // Fix incorrect import statement
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
import { useNavigate } from "react-router-dom";
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./TeacherCourseDetail.css";
const TeacherCourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [showStudentDialog, setShowStudentDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

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
    axios
      .get("http://localhost:8000/course/805df5f7-e05f-4062-9357-47be2ea053f2")
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []);

  const fetchData = async () => {
    try {
      if (selectedClassId) {
        const response = await axios.get(
          `http://localhost:8000/quiz/${selectedClassId}`
        );
        setQuizzes(response.data.data);

        const students = await axios.get(
          `http://localhost:8000/student/${selectedClassId}`
        );
        setStudents(students.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedClassId) {
          const response = await axios.get(
            `http://localhost:8000/quiz/${selectedClassId}`
          );
          setQuizzes(response.data.data);

          const students = await axios.get(
            `http://localhost:8000/student/${selectedClassId}`
          );
          setStudents(students.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedClassId) {
      fetchData();
    }
  }, [selectedClassId]);

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
      await axios.delete(`http://localhost:8000/quiz/${quizId}`, config);
      fetchData();
      toast.success("Manager account deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error deleting manager account:", error);
    }
  };

  const handleViewStudents = () => {
    setShowStudentDialog(true);
  };

  const handleImportStudents = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post(
          `http://localhost:8000/teacher/import-student/${selectedClassId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        axios
          .get(`http://localhost:8000/student/${selectedClassId}`)
          .then((response) => {
            console.log("response", response);
            setStudents(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching student data:", error);
          });
        setShowSnackbar(true);
        setSnackbarMessage("Students imported successfully!");
      } catch (error) {
        console.error("Error importing students:", error);
      }
    }
  };
  const handleCloseStudentDialog = () => {
    setShowStudentDialog(false);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  const handleQA = (quizId) => {
    navigate(`/teacher/quiz/${quizId}`);
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
        classId: selectedClassId,
        name: newQuiz.name,
        description: newQuiz?.description,
        startDate: newQuiz.startDate,
        endDate: newQuiz.endDate,
        timeLimitMinutes: newQuiz?.timeLimitMinutes,
        score: newQuiz?.score || 10,
        isHidden: newQuiz?.isHidden || false,
      };

      if (selectedQuiz) {
        // Update existing account
        await axios.put(
          `http://localhost:8000/quiz/${selectedQuiz.id}`,
          payload,
          config
        );
      } else {
        // Create new account
        await axios.post("http://localhost:8000/quiz/create", payload, config);
      }
      await fetchData();

      toast.success("Quiz saved successfully");
      setShowCreateQuizDialog(false);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error saving manager account:", error);
    }
  };

  return (
    <div>
      <TeacherMenu />
      <Typography variant="h4">Course Details</Typography>
      {course && (
        <>
          <div className="course-info">
            <Typography variant="h5">{course.name}</Typography>
            <Typography variant="body1">{course.description}</Typography>
            <Select value={selectedClassId} onChange={handleClassChange}>
              <MenuItem value="" disabled>
                Select a class
              </MenuItem>
              {course.classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          {selectedClassId && (
            <>
              <div>
                <IconButton color="primary" onClick={() => handleCreateQuiz()}>
                  <AddIcon /> Create New
                </IconButton>
                <IconButton
                  color="default"
                  onClick={() => handleViewStudents()}
                >
                  <VisibilityIcon /> Student list
                </IconButton>
              </div>

              <List style={{ overflowY: "scroll", maxHeight: "700px" }}>
                {quizzes.map((quiz) => (
                  <ListItem key={quiz.id}>
                    <ListItemText
                      primary={quiz.name}
                      secondary={
                        <>
                          <Typography variant="body2">
                            {quiz.description}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Score:</strong> {quiz.score}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Time Limit (minutes):</strong>{" "}
                            {quiz.timeLimitMinutes}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Start Date:</strong>{" "}
                            {new Date(quiz.startDate).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>End Date:</strong>{" "}
                            {new Date(quiz.endDate).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                    <div className="action">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditQuiz(quiz)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="default"
                        onClick={() => handleQA(quiz.id)}
                      >
                        <QuestionAnswerIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </>
      )}
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
                <TableCell>Student Name</TableCell>
                <TableCell>Date of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Avatar src={student.avatar} />
                  </TableCell>
                  <TableCell>{student.code}</TableCell>
                  <TableCell>{`${student?.firstName || ""} ${
                    student?.lastName || ""
                  }`}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>

      <div className="create-dialog">
        <Dialog
          open={showCreateQuizDialog}
          onClose={handleCloseCreateQuizDialog}
        >
          <DialogTitle>
            {selectedQuiz ? "Edit Quiz" : "Create New Quiz"}
          </DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Name"
                value={newQuiz.name}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, name: e.target.value })
                }
                required
                style={{ marginBottom: "10px", marginRight: "10px" }}
              />
              <TextField
                label="Description"
                value={newQuiz.description}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, description: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Start Date"
                type="date"
                value={
                  newQuiz.startDate
                    ? newQuiz.startDate.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setNewQuiz({
                    ...newQuiz,
                    startDate: new Date(e.target.value),
                  })
                }
                required
                style={{ marginBottom: "10px", marginRight: "10px" }}
              />
              <TextField
                label="End Date"
                type="date"
                value={
                  newQuiz.endDate
                    ? newQuiz.endDate.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, endDate: new Date(e.target.value) })
                }
                required
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
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
                style={{ marginBottom: "10px", marginRight: "10px" }}
              />
              <TextField
                label="Score"
                type="number"
                value={newQuiz.score}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, score: parseInt(e.target.value) })
                }
                style={{ marginBottom: "10px" }}
              />
            </div>
            Hidden:{" "}
            <Switch
              checked={newQuiz.isHidden}
              onChange={(e) =>
                setNewQuiz({ ...newQuiz, isHidden: Boolean(e.target.checked) })
              }
              color="primary"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreateQuizDialog}>Cancel</Button>
            <Button
              onClick={() => {
                // Handle creating the new quiz
                console.log(newQuiz);
                handleSubmit();
              }}
              color="primary"
            >
              {selectedQuiz ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default TeacherCourseDetailPage;
