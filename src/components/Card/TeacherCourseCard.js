import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

const TeacherCourseCard = ({ course }) => (
  <Card style={{ maxWidth: 400, height: "100%" }}>
    <CardActionArea>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="100%"
            image={course.image}
            alt={`${course.code} course`}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.code}
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Start Date: <b>{course.startDate}</b>
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              Students: <b>{course.studentCount}</b>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </CardActionArea>
  </Card>
);

export default TeacherCourseCard;
