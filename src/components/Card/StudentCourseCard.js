import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const CourseCard = ({ course }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={`${course.code} course`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.instructor}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default CourseCard;
