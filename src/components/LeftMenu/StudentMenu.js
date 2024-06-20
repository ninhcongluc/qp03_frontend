import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { yellow } from "@mui/material/colors";
import "./StudentMenu.css";

const StudentMenu = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/profile');
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);


  const handleCourseManagementClick = () => {
    navigate("/student/course-management");
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
          <div className="Student_Menu">
            <Stack direction="row" spacing={2} className="menu-header">
              <Avatar sx={{ bgcolor: yellow[500] }}>S</Avatar>
              <h3>{userData.firstName} {userData.lastName}</h3>
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

export default StudentMenu;
