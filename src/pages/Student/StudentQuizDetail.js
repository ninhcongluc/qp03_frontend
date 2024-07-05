import { Typography, Card, CardContent } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";

const StudentQuizDetail = () => {
  const { classId, quizId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [quizDetails, setQuizDetails] = useState([]);
  const detailsPerPage = 6;

  const fetchQuizDetailData = useCallback(
    async (page, limit) => {
      try {
        const response = await ApiInstance.get(
          `/student/course-management/class/${classId}/quiz/${quizId}/review?page=${page}&limit=${limit}`
        );
        const { data } = response.data;
        if (data && data.results) {
          setQuizDetails(data.results);
          setTotalItem(data.total);
        }
      } catch (error) {
        console.error("Error fetching quiz detail data:", error);
      }
    },
    [classId, quizId]
  );

  useEffect(() => {
    fetchQuizDetailData(page, detailsPerPage);
  }, [fetchQuizDetailData, page, detailsPerPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQuizDetailData(page, detailsPerPage);
    }, 30000); // Refresh data every 30 seconds

    return () => clearInterval(interval);
  }, [fetchQuizDetailData, page, detailsPerPage]);

  const pageCount = Math.ceil(totalItem / detailsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchQuizDetailData(value, detailsPerPage);
  };

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "240px" }}>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item flex={1}>
            <Typography variant="h4" component="h2">
              Quiz Detail - {quizId}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: 2, minHeight: 100 }}>
          {quizDetails
            .slice(0, detailsPerPage)
            .map((detail, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className="quiz-detail-card">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {detail.quiz.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {detail.quiz.description}
                    </Typography>
                    <Typography variant="body2">
                      Question: {detail.question.text}
                      <br />
                      Answer: {detail.answer.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />
        </Stack>
      </Container>
    </div>
  );
};

export default StudentQuizDetail;
