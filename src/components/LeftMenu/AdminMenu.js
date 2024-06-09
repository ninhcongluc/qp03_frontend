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
import Avatar from "@mui/material/Avatar";

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

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        />
        <h1>Admin</h1>

        <List>
          <Link href="./profile.js">
            <div class="Admin_Menu">
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
              </Stack>
            </div>
          </Link>

          <ListItem button onClick={handleManagerManagementClick}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Manager Management" />
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

export default LeftMenu;
