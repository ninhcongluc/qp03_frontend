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

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {  deepPurple } from '@mui/material/colors';
import "./ManagerMenu.css";



const ManagerMenu = () => {
  const navigate = useNavigate();

  const handleTeacherManagementClick = () => {
    navigate("/manager/manage-teacher");
  };

  const handleStudentManagementClick = () => {
    navigate("/manager/manage-student");
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
        <div class="Manager_Menu">
            <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar>
          </Stack>
          </div>

          <ListItem button onClick={handleTeacherManagementClick}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Teacher Account Management" />
          </ListItem>

          <ListItem button onClick={handleStudentManagementClick}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Student Account Management" />
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

export default ManagerMenu;
