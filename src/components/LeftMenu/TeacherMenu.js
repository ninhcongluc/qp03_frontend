import { ExitToAppOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PortraitIcon from "@mui/icons-material/Portrait";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./LeftMenu.css";

const TeacherMenu = () => {
  const navigate = useNavigate();

  const handleMyCourseClick = () => {
    navigate("/teacher/course-management");
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
              <PortraitIcon />
            </ListItemIcon>
            <ListItemText primary="My Class" />
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
