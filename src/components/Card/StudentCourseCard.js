import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
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
  </Card>
);

export default CourseCard;
