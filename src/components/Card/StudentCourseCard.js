import React from "react";
<<<<<<< HEAD
import { Link as RouterLink } from "react-router-dom";
=======
>>>>>>> 698b65fce880e2ec75b9c3a378fdc2cfa37bb2cb
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
<<<<<<< HEAD
import Link from "@mui/material/Link";

const CourseCard = ({ course }) => (
  <Card sx={{ maxWidth: 345 }}>
    <Link component={RouterLink} to={course.url} underline="none">
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
    </Link>
=======

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
>>>>>>> 698b65fce880e2ec75b9c3a378fdc2cfa37bb2cb
  </Card>
);

export default CourseCard;
