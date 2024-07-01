import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./styles/TeacherAddQuestion.css";
import ApiInstance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

const TeacherQuestionListPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: "selectOne", options: [""] },
  ]);
  const [quiz, setQuiz] = useState(null);
  const { quizId } = useParams();

  let navigate = useNavigate();

  //fetch data
  useEffect(() => {
    console.log("quizId", quizId);
    ApiInstance.get(`/quiz/detail/${quizId}`)
      .then((response) => {
        setQuiz(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [quizId]);

  const handleOnChange = (event, questionId) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, type: event.target.value };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "selectOne",
      options: [""],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    const newQuestions = questions
      .map((question) => {
        if (question.id === questionId) {
          return null;
        }
        return question;
      })
      .filter((question) => question !== null);
    newQuestions.forEach((question, index) => {
      question.id = index + 1;
    });

    setQuestions(newQuestions);
  };

  const handleAddOption = (questionId) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, options: [...question.options, ""] };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionId, optionIndex) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const newOptions = question.options.filter(
          (option, index) => index !== optionIndex
        );
        return { ...question, options: newOptions };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleSaveToBank = (event) => {
    console.log("saveToBank", event.target.checked);
    // setIsSaveBank(event.target.checked);
  };

  return (
    <div>
      <Box className="container">
        <button className="back-button" onClick={() => navigate(-1)}></button>

        <Typography className="text-header" variant="h4" gutterBottom>
          Set Up Q&A
        </Typography>
        <Box
          className="header"
          sx={{ backgroundColor: "#4cdbe6", color: "black", p: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Quiz Name: {quiz?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Number of Questions: {quiz?.questions?.length}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Time: {quiz?.timeLimitMinutes} minutes
          </Typography>
        </Box>
        <Box>
          <TableContainer component={Paper} className="tableContainer">
            <Table stickyHeader>
              <TableBody>
                {questions.map((question) => (
                  <React.Fragment key={question.id}>
                    <TableRow>
                      <TableCell className="tableCell">
                        <Box className="questionLabel">
                          Question {question.id}:
                        </Box>
                        <TextField
                          id="standard-basic"
                          label={`Question ${question.id}`}
                          variant="standard"
                          fullWidth
                          className="textField"
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <FormControl fullWidth>
                          <Select
                            value={question.type}
                            onChange={(event) =>
                              handleOnChange(event, question.id)
                            }
                          >
                            <MenuItem value="selectOne">Select One</MenuItem>
                            <MenuItem value="multiple">
                              Multiple Choice
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    {question.options.map((option, index) => (
                      <TableRow key={index}>
                        <TableCell className="optionCell">
                          <input
                            type={
                              question.type === "selectOne"
                                ? "radio"
                                : "checkbox"
                            }
                            name={`question${question.id}`}
                            value={index}
                            style={{ marginRight: "8px" }}
                          />
                          <TextField
                            id="standard-basic"
                            label={`Option ${index + 1}`}
                            variant="standard"
                            type="text"
                            sx={{ width: "90%" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{ width: "70px" }}
                            onClick={() =>
                              handleDeleteOption(question.id, index)
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Box className="optionButtons">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                              width: "100px",
                              marginRight: "8px",
                            }}
                            onClick={() => handleAddOption(question.id)}
                          >
                            Add
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{ width: "200px", marginTop: "16px" }}
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            Delete Question
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="buttonsContainer">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAddQuestion}
              style={{
                width: "150px",
                height: "40px",
                backgroundColor: "#56e349",
                "&:hover": {
                  backgroundColor: "#3cb730",
                },
              }}
            >
              Add Question
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" gutterBottom>
            Save to Bank:
          </Typography>
          <Checkbox
            name="saveToQuestionBank"
            defaultChecked
            color="secondary"
            onChange={handleSaveToBank}
            sx={{ marginTop: "-3px" }}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            id="submit-button"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default TeacherQuestionListPage;
