import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftMenu.css";
import axios from "axios";

const LeftMenu = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/user/profile",
          config
        );
        console.log(response.data);
        setUserData({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleManagerManagementClick = () => {
    navigate("/admin/manage-manager");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
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
            <Avatar alt="Admin" src="" sx={{ width: 64, height: 64 }} />
            <h3>
              {userData.firstName} {userData.lastName}
            </h3>
          </Stack>
        </div>

        <ListItem button onClick={handleManagerManagementClick}>
          <ListItemIcon class="itemIcon">
            <DashboardOutlined />
          </ListItemIcon>
          <ListItemText primary="Manager Management" />
        </ListItem>

        <ListItem button onClick={handleLogoutClick}>
          <ListItemIcon class="itemIcon">
            <ExitToAppOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftMenu;
