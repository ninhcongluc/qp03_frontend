import { Add as AddIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
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
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import BackButton from "../../components/BackButton/BackButton";

import "./styles/TeacherAddQuestion.css";
import { toast } from "react-toastify";

const TeacherQuestionListPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { id: 1, type: "selectOne", answerOptions: [""] },
  ]);
  const [quiz, setQuiz] = useState(null);
  const { quizId } = useParams();

  const fetchData = async () => {
    ApiInstance.get(`/quiz/${quizId}/question-answers`)
      .then((response) => {
        setQuiz(response.data.data);
        setQuestions(response.data.data.questions);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };
  useEffect(() => {
    fetchData();
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
      type: "select_one",
      answerOptions: [""],
      createdAt: new Date(),
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

  const handleSaveAsDraft = async () => {
    const listQuestionAnswers = questions.map((question) => ({
      id: question.id,
      text: question.text,
      type: question.type,
      answerOptions: question.answerOptions,
    }));

    try {
      await ApiInstance.put(`/quiz/${quizId}/save-qa`, listQuestionAnswers);
      fetchData();
      toast.success("Quiz save successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error save quiz:", error);
    }
  };

  const handleSubmit = async () => {
    const listQuestionAnswers = questions.map((question) => ({
      id: question.id,
      text: question.text,
      type: question.type,
      answerOptions: question.answerOptions,
    }));

    try {
      await ApiInstance.put(
        `/quiz/${quizId}/save-qa?isSubmit=true`,
        listQuestionAnswers
      );
      fetchData();
      toast.success("You have submitted successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error save quiz:", error);
    }
  };
  return (
    <div className="container">
      <Box>
        <div className="header-page">
          <BackButton />

          <Typography style={{ margin: 0 }} variant="h4" gutterBottom>
            Set Up Q&A
          </Typography>
        </div>

        <Box
          className="summary-info"
          sx={{
            backgroundColor: "#fff",
            alignItems: "center",
            p: 2,
            borderRadius: 1,
            boxShadow: 1,
            mb: 5,
          }}
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
                              handleDeleteOption(question.id, optionIndex)
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
                            onClick={() => handleAddOption(question.id)}
                          />{" "}
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ width: "150px", marginTop: "16px" }}
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            Delete
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
                "&:hover": {
                  backgroundColor: "#3cb730",
                },
              }}
            >
              New Question
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default TeacherQuestionListPage;