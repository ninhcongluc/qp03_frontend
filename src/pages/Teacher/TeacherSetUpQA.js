import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import ViewListIcon from "@mui/icons-material/ViewList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";

const QuizQuestionsPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    type: "select_one",
    text: "",
    options: [],
  });
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    // Fetch the quiz and its questions from the server
    const fetchQuizAndQuestions = async () => {
      const quizResponse = await axios.get(
        `http://localhost:8000/quiz/${quizId}/questions`
      );
      setQuiz(quizResponse.data.data);
      setQuestions(quizResponse.data.data.questions);
    };
    fetchQuizAndQuestions();
  }, [quizId]);

  const handleCreateQuestion = () => {
    setSelectedQuestion(null);
    setNewQuestion({ type: "select_one", text: "", options: [] });
    setShowCreateDialog(true);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setNewQuestion({
      type: question.type,
      text: question.text,
      options: question.options,
    });
    setShowCreateDialog(true);
  };

  const handleDeleteQuestion = async (questionId) => {
    // Delete the question from the server and update the local state
    await axios.delete(`/api/questions/${questionId}`);
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuestion = async () => {
    if (selectedQuestion) {
      // Update the existing question
      await axios.put(`/api/questions/${selectedQuestion.id}`, newQuestion);
      const updatedQuestions = questions.map((q) => {
        if (q.id === selectedQuestion.id) {
          return { ...q, ...newQuestion };
        }
        return q;
      });
      setQuestions(updatedQuestions);
    } else {
      // Create a new question
      const response = await axios.post("/api/questions", {
        ...newQuestion,
        quizId,
      });
      setQuestions([...questions, response.data]);
    }
    setShowCreateDialog(false);
  };

  return (
    <div>
      <TeacherMenu />
      <div style={{ display: "inline" }}>
        <Typography variant="h4">Quiz: {quiz?.name}</Typography>
        <IconButton color="primary" onClick={handleCreateQuestion}>
          <AddIcon /> Create New Question
        </IconButton>
        <List style={{ overflowY: "scroll", maxHeight: "700px" }}>
          {questions.map((question, index) => (
            <ListItem key={question.id}>
              <ListItemText
                primary={`Question ${index + 1} (${question.type}): ${
                  question.text
                }`}
              />
              <div>
                <IconButton
                  color="primary"
                  onClick={() => handleEditQuestion(question)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton color="default">
                  <ViewListIcon />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
        <Dialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
        >
          <DialogTitle>
            {selectedQuestion ? "Edit Question" : "Create New Question"}
          </DialogTitle>
          <DialogContent>{/* Question form components */}</DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button color="primary" onClick={handleSubmitQuestion}>
              {selectedQuestion ? "Update Question" : "Create Question"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default QuizQuestionsPage;
