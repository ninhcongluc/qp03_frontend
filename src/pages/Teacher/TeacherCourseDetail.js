import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
const TeacherCourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [quizzes, setQuizzes] = useState([]);

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

  useEffect(() => {
    if (selectedClassId) {
      axios
        .get(`http://localhost:8000/quiz/${selectedClassId}`)
        .then((response) => {
          setQuizzes(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching quiz data:", error);
        });
    }
  }, [selectedClassId]);

  const handleClassChange = (event) => {
    setSelectedClassId(event.target.value);
  };

  const handleCreateQuiz = () => {
    // handle create quiz logic here
  };

  const handleEditQuiz = (quizId) => {
    // handle edit quiz logic here
  };

  const handleDeleteQuiz = (quizId) => {
    // handle delete quiz logic here
  };

  const handleViewStudents = (quizId) => {
    // handle view students logic here
  };

  return (
    <div>
      <TeacherMenu />
      <Typography variant="h4">Course Details</Typography>
      {course && (
        <>
          <Typography variant="h5">{course.name}</Typography>
          <Typography variant="body1">{course.description}</Typography>
          <Typography variant="h6">Select a Class</Typography>
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
          {selectedClassId && (
            <>
              <IconButton color="primary" onClick={() => handleCreateQuiz()}>
                <AddIcon /> Create New
              </IconButton>
              <List>
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
                        onClick={() => handleEditQuiz(quiz.id)}
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
                        onClick={() => handleViewStudents(quiz.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherCourseDetailPage;
