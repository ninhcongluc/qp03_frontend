import React, { useState } from "react";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./TeacherAddQuestion.css";


const TeacherQuestionListPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: "selectOne", options: [""] },
  ]);


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
    console.log(questionId);
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


  return (
    <div>
      <TeacherMenu />
      <Box className="container1">
        <Box className="header">
          <b>Quiz name:</b>
          <br />
          <span>Class Name:</span>
          <br />
          <span>Due Date:</span>
          <br />
          <span>Time Limit:</span>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2} className="">
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
                      <TableCell sx={{ verticalAlign: 'top' }}>
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
                            sx={{ width: "150px", marginRight: "8px" }}
                            onClick={() => handleAddOption(question.id)}
                          >
                            Add option
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
              className="button"
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="button"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};


export default TeacherQuestionListPage;
