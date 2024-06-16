import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TeacherMenu from "../../components/LeftMenu/TeacherMenu";
const quiz = [
  {
    id: "1e2f3a4b-5c6d-7e8f-9012-a3b4c5d6e7f8",
    quizName: "PT1",
    code: "ACC101",
    className: "SE1848",
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    TimeofQuiz: "30 minute"
  },
  {
    id: "b9a8c7d6-e5f4-3210-fedc-ba9876543210",
    quizName: "PT2",
    code: "ECO201",
    className: "SE1849",
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    TimeofQuiz: "30 minute"
  },
  {
    id: "4d3c2b1a-f0e9-8d7c-6b5a-4321fedcba98",
    quizName: "PT2",
    code: "SWR302",
    className: "SE1850",
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    TimeofQuiz: "30 minute"
  },
];

const QuizManagementPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const quizPerPage = 6;

  // Tính toán số lượng trang
  const pageCount = Math.ceil(quiz.length / quizPerPage);


  // Lấy các khóa học cho trang hiện tại
  const displayedQuiz = quiz.slice(
    (page - 1) * quizPerPage,
    page * quizPerPage
  );

  const handleAddQuiz = () => {
    navigate("/teacher/Add-question");
  };

  const handleEditQuiz = (id) => {
    const quiz = quiz.find((c) => c.id === id);
    setSelectedQuiz(quiz);
  };

  const handleDeleteQuiz = (id) => {
    console.log(`Deleting quiz with ID: ${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleQuizChange = (event) => {
    setSelectedQuiz(event.target.value);
    setPage(1);
  };

  const handleQuizDetailClick = (id) => {
    navigate(`/teacher/quiz/${id}`);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item xs={3}>
            <TeacherMenu />
          </Grid>
          <Grid item flex={1} maxWidth={150}>
            <FormControl fullWidth>
              <InputLabel id="quiz-select-label">Class</InputLabel>
              <Select
                labelId="quiz-select-label"
                id="quiz-select"
                value={selectedQuiz}
                onChange={handleQuizChange}
              >
                <MenuItem value="">All Semesters</MenuItem>
                <MenuItem value="ACC101">ACC101</MenuItem>
                <MenuItem value="SWR302">SWR302</MenuItem>
                <MenuItem value="ECO201">ECO201</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          
              <Grid item>
                <button
                  className="add-quiz-btn"
                  onClick={handleAddQuiz}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "20px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon /> Add Course
                </button>
              </Grid>
            </Grid>
          
        <Grid
          container={displayedQuiz.length}
          spacing={4}
          sx={{ marginTop: 2, minHeight: 100 }}
        >
          {displayedQuiz.map((quiz, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <div
                className="course-card"
                style={{ padding: 16 }}
                onClick={() => handleQuizDetailClick(quiz.id)}
              >
                <h3>{quiz.quizName}</h3>
                <p>{quiz.code}</p>
                <p>Class: {quiz.className}</p>
                <p>Start Date: {quiz.startDate}</p>
                <p>End Date: {quiz.endDate}</p>
                <p>Time: {quiz.TimeofQuiz}</p>

                <div className="quiz-actions">
                  <EditIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditQuiz(quiz.id);
                    }}
                  />
                  <DeleteIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteQuiz(quiz.id);
                    }}
                  />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Container>

    </div>
  );
};



export default QuizManagementPage;
