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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PortraitIcon from "@mui/icons-material/Portrait";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./LeftMenu.css";

const ManagerMenu = () => {
  const navigate = useNavigate();

  const handleSemesterClick = () => {
    navigate("/manager/semester");
  };

  const handleTeacherInformationClick = () => {
    navigate("/manager/teacher-information");
  };

  const handleCourseClick = () => {
    navigate("/manager/course");
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
              <Avatar alt="Manager" src="" sx={{ width: 64, height: 64 }} />
              <h3>Manager</h3>
            </Stack>
          </div>

          <ListItem button onClick={handleSemesterClick}>
            <ListItemIcon className="itemIcon">
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Semester" />
          </ListItem>

          <ListItem button onClick={handleTeacherInformationClick}>
            <ListItemIcon className="itemIcon">
              <PermIdentityIcon />
            </ListItemIcon>
            <ListItemText primary="Teacher Information" />
          </ListItem>

          <ListItem button onClick={handleCourseClick}>
            <ListItemIcon className="itemIcon">
              <PortraitIcon />
            </ListItemIcon>
            <ListItemText primary="Course" />
          </ListItem>

          <ListItem button onClick={handleLogoutClick}>
            <ListItemIcon className="itemIcon">
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
