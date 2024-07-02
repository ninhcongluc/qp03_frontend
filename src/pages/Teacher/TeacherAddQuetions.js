import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import "./styles/TeacherAddQuestion.css";

const TeacherQuestionListPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: "selectOne", answerOptions: [""] },
  ]);
  const [quiz, setQuiz] = useState(null);
  const { quizId } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    console.log("quizId", quizId);
    ApiInstance.get(`/quiz/${quizId}/question-answers`)
      .then((response) => {
        setQuiz(response.data.data);
        setQuestions(response.data.data.questions);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [quizId]);

  // Handle question text change
  const handleTextChange = (event, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return { ...question, text: event.target.value };
        }
        return question;
      })
    );
  };

  // Handle option text change
  const handleOptionTextChange = (event, questionId, optionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = [...question.answerOptions];
          updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            optionText: event.target.value,
          };
          return { ...question, answerOptions: updatedOptions };
        }
        return question;
      })
    );
  };

  // Handle correct answer change
  const handleCorrectAnswerChange = (event, questionId, optionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = question.answerOptions.map(
            (option, index) => ({
              ...option,
              isCorrect: index === optionIndex,
            })
          );
          return { ...question, answerOptions: updatedOptions };
        }
        return question;
      })
    );
  };

  // Handle question type change
  const handleTypeChange = (event, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return { ...question, type: event.target.value };
        }
        return question;
      })
    );
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions?.length ? questions.length + 1 : 1,
      type: "selectOne",
      answerOptions: [""],
    };

    if (questions) {
      setQuestions([...questions, newQuestion]);
    } else {
      setQuestions([newQuestion]);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    const newQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionId) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, answerOptions: [...question.answerOptions, ""] };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionId, optionIndex) => {
    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const newOptions = question.answerOptions.filter(
          (option, index) => index !== optionIndex
        );
        return { ...question, answerOptions: newOptions };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleSaveAsDraft = () => {
    const listQuestionAnswers = questions.map((question) => ({
      id: question.id,
      text: question.text,
      type: question.type,
      answerOptions: question.answerOptions,
    }));

    console.log("listQuestionAnswers", listQuestionAnswers);
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
                {questions.map((question, index) => (
                  <React.Fragment key={question.id}>
                    <TableRow>
                      <TableCell className="tableCell">
                        <Box className="questionLabel">
                          Question {index + 1}:
                        </Box>
                        <TextField
                          id="standard-basic"
                          value={question.text}
                          variant="standard"
                          fullWidth
                          className="textField"
                          onChange={(event) =>
                            handleTextChange(event, question.id)
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <FormControl fullWidth>
                          <Select
                            value={question.type}
                            onChange={(event) =>
                              handleTypeChange(event, question.id)
                            }
                          >
                            <MenuItem value="select_one">Select One</MenuItem>
                            <MenuItem value="multiple_choice">
                              Multiple Choice
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    {question.answerOptions.map((option, optionIndex) => (
                      <TableRow key={optionIndex}>
                        <TableCell className="optionCell">
                          <input
                            type={
                              question.type === "select_one"
                                ? "radio"
                                : "checkbox"
                            }
                            name={`question${question.id}`}
                            value={optionIndex}
                            onChange={(event) =>
                              handleCorrectAnswerChange(
                                event,
                                question.id,
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
                            onChange={(event) =>
                              handleOptionTextChange(
                                event,
                                question.id,
                                optionIndex
                              )
                            }
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
                              handleDeleteOption(question.id, optionIndex)
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

        <Box
          sx={{
            display: "flex",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            id="submit-button"
            onClick={handleSaveAsDraft}
          >
            Save As Draft
          </Button>
          <Button
            variant="contained"
            color="success"
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
