import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ApiInstance from "../../axios";

import MenuComponent from "../../components/LeftMenu/Menu";

const ExamSchedule = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    ApiInstance.get(`/quiz/student-exam/schedular`)
      .then((response) => {
        const rs = response.data.data.map((item) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);

          const pad = (num) => (num < 10 ? "0" + num : num);

          return {
            id: item.id,
            name: item.name,
            date: `${startDate.getFullYear()}-${pad(
              startDate.getMonth() + 1
            )}-${pad(startDate.getDate())}`,
            startTime: `${pad(startDate.getHours())}:${pad(
              startDate.getMinutes()
            )}`,
            endTime: `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`,
            course: item.course,
          };
        });
        setData(rs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MenuComponent role="student" />
      <Container sx={{ marginLeft: "70px", marginTop: "-30%" }}>
        <Typography variant="h4" gutterBottom className="exam-schedule-title">
          Exam Schedules
        </Typography>
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
            }}
            className="exam-schedule-table-container"
          >
            <Table stickyHeader className="exam-schedule-table">
              <TableHead className="exam-schedule-table-head">
                <TableRow className="exam-schedule-table-row">
                  <TableCell className="exam-schedule-table-cell">NO</TableCell>
                  <TableCell className="exam-schedule-table-cell">
                    SUBJECT CODE
                  </TableCell>
                  <TableCell className="exam-schedule-table-cell">
                    SUBJECT NAME
                  </TableCell>
                  <TableCell className="exam-schedule-table-cell">
                    START DATE
                  </TableCell>

                  <TableCell className="exam-schedule-table-cell">
                    END DATE
                  </TableCell>
                  <TableCell className="exam-schedule-table-cell">
                    EXAM NAME
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="exam-schedule-table-body">
                {data.map((item, index) => (
                  <TableRow
                    key={item.id}
className={`exam-schedule-table-row-${index}`}
                  >
                    <TableCell className="exam-schedule-table-cell">
                      {index + 1}
                    </TableCell>
                    <TableCell className="exam-schedule-table-cell">
                      {item.course.code}
                    </TableCell>
                    <TableCell className="exam-schedule-table-cell">
                      {item.course.name}
                    </TableCell>
                    <TableCell className="exam-schedule-table-cell">
                      {item.date}
                    </TableCell>

                    <TableCell className="exam-schedule-table-cell">
                      {item.startTime} - {item.endTime}
                    </TableCell>
                    <TableCell className="exam-schedule-table-cell">
                      {item.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default ExamSchedule;
