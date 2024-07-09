
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import React, { useEffect, useState } from "react";

const QuestionBankDialog = ({ open, onClose, onAddQuestions }) => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    ApiInstance.get(`/quiz/${quizId}/question-banks`)
      .then((response) => {
        setQuestions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [quizId]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleQuestionSelect = (questionId) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };

  const handleAddQuestions = () => {
    const data = questions.filter((question) =>
      selectedQuestions.includes(question.id)
    );
    onAddQuestions(data);
    onClose();
  };

  const filteredQuestions = questions.filter((question) =>
    question?.text?.toLowerCase().includes(searchText?.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select From Question Bank</DialogTitle>
      <DialogContent>
        <TextField
          label="Search"
          value={searchText}
          onChange={handleSearch}
          fullWidth
          style={{ marginBottom: "16px" }}
        />
        <List>
          {filteredQuestions.map((question) => (
            <ListItem
              key={question.id}
              button
              onClick={() => handleQuestionSelect(question.id)}
            >
              <Checkbox
                checked={selectedQuestions.includes(question.id)}
                color="primary"
              />
              <ListItemText primary={question.text} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddQuestions} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionBankDialog;
