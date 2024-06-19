import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { formatDateDay } from "../../commons/function";

const TeacherCourseCard = ({ course }) => (
  <Card style={{ maxWidth: 500, height: "100%" }}>
    <CardActionArea>
      <Grid container>
        <Grid item xs={15}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.code}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.description}

            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Semester: <b>{course.semesterName}</b>
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Start Date: <b>{course.startDate}</b>


            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Semester: <b>{course?.semester?.name}</b>
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Start Date: <b>{formatDateDay(course?.semester.startDate)}</b>
            </Typography>
            
          </CardContent>
        </Grid>
      </Grid>
    </CardActionArea>
  </Card>
);

export default TeacherCourseCard;