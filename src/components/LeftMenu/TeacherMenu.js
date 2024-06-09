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
<<<<<<< HEAD
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { green } from "@mui/material/colors";
=======

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
>>>>>>> 2b8551a (create avatar)
import "./TeacherMenu.css";


const TeacherMenu = () => {
  const navigate = useNavigate();

  const handleCourseManagementClick = () => {
    navigate("/teacher/course-management");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <List>
<<<<<<< HEAD
          <div class="Teacher_Menu">
=======

        <div class="Teacher_Menu">
>>>>>>> 2b8551a (create avatar)
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: green[500] }}>T</Avatar>
            </Stack>
          </div>
          <ListItem button onClick={handleCourseManagementClick}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="My Courses" />
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
