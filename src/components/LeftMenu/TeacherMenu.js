import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import PortraitIcon from "@mui/icons-material/Portrait";
import QuizIcon from "@mui/icons-material/Quiz";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./LeftMenu.css";

const TeacherMenu = () => {
  const navigate = useNavigate();

  const handleMyCourseClick = () => {
    navigate("/teacher/course-management");
  };

  const handleCourseManagementClick = () => {
    navigate("/teacher/course-management");
  };

  const handleQuizClick = () => {
    navigate("/teacher/quiz");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#fff",
          },
        }}
      >
        <List>
          <div class="menu">
            <Stack direction="row" spacing={2}>
              <Avatar alt="Teacher" src="" sx={{ width: 50, height: 50 }} />
              <h3>Teacher</h3>
            </Stack>
          </div>
          <ListItem button onClick={handleMyCourseClick}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="My Courses" />
          </ListItem>

          <ListItem button onClick={handleCourseManagementClick}>
            <ListItemIcon>
              <PortraitIcon />
            </ListItemIcon>
            <ListItemText primary="Class" />
          </ListItem>

          <ListItem button onClick={handleCourseManagementClick}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="List Student" />
          </ListItem>

          <ListItem button onClick={handleQuizClick}>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="Quiz" />
          </ListItem>

          <ListItem button onClick={handleLogoutClick}>
            <ListItemIcon>
              <ExitToAppOutlined />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default TeacherMenu;
