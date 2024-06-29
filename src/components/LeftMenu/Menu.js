import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import PortraitIcon from "@mui/icons-material/Portrait";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

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
import ApiInstance from "../../axios";
import "./Menu.css";

const MenuComponent = ({ role }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiInstance.get("/user/profile");
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

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const menuItems = {
    admin: [
      {
        text: "Manager Management",
        icon: <DashboardOutlined />,
        onClick: () => navigate("/admin/manage-manager"),
      },
    ],
    manager: [
      {
        text: "Semester",
        icon: <DashboardOutlined />,
        onClick: () => navigate("/manager/semester"),
      },
      {
        text: "Teacher Information",
        icon: <PermIdentityIcon />,
        onClick: () => navigate("/manager/teacher-information"),
      },
      {
        text: "Course",
        icon: <PortraitIcon />,
        onClick: () => navigate("/manager/course"),
      },
    ],
    teacher: [
      {
        text: "My Class",
        icon: <PortraitIcon />,
        onClick: () => navigate("/teacher/course-management"),
      },
    ],
    student: [
      {
        text: "My Class",
        icon: <PortraitIcon />,
        onClick: () => navigate("/student/course-management"),
      },
    ],
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#FFFAFA",
        },
      }}
    >
      <List>
        <div class="menu">
          <Stack direction="row" spacing={2}>
            <Avatar alt={role} src="" sx={{ width: 64, height: 64 }} />
            <h3>
              {userData.firstName} {userData.lastName}
            </h3>
          </Stack>
        </div>

        {menuItems[role].map((item) => (
          <ListItem button onClick={item.onClick}>
            <ListItemIcon className="itemIcon">{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        <ListItem button onClick={handleLogoutClick}>
          <ListItemIcon className="itemIcon">
            <ExitToAppOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuComponent;
