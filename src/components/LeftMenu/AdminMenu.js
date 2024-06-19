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
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeftMenu.css";

const LeftMenu = () => {
  const navigate = useNavigate();

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
            <h3>Admin</h3>
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