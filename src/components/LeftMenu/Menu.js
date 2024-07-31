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
  Button,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiInstance from "../../axios";
import "./Menu.css";

const MenuComponent = ({ role }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userId: "",
  });

  // call api to get user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiInstance.get(`/user/profile`);
        setUserData({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          userId: response.data.data.id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userData.userId}`);
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
      {
        text: "Grades",
        icon: <PortraitIcon />,
        onClick: () => navigate("/teacher/teacher-grade"),
      },

      {
        text: "Calendar",
        icon: <PortraitIcon />,
        onClick: () => navigate("/teacher/calendar"),
      },
    ],
    student: [
      {
        text: "Course",
        icon: <PortraitIcon />,
        onClick: () => navigate("/student/course-management"),
      },
      {
        text: "Grades",
        icon: <PortraitIcon />,
        onClick: () => navigate("/student/grade"),
      },

      {
        text: "Student Rank",
        icon: <PortraitIcon />,
        onClick: () => navigate("/student/rank"),
      },
      {
        text: "View Exam Schedule",
        icon: <PortraitIcon />,
        onClick: () => navigate("/student/viewSchedule"),
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
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "270px",
        }}
      >
        <div class="menu">
          <Stack alignItems={"center"} spacing={2}>
            <Avatar
              alt={role}
              src=""
              sx={{ width: 80, height: 80 }}
              onClick={() => handleProfileClick()}
              style={{ cursor: "pointer" }}
            />
            <Typography variant="h6">
              {userData.firstName} {userData.lastName}
            </Typography>
          </Stack>
        </div>

        {menuItems[role]?.map((item) => (
          <div className="itemList">
            <ListItem button onClick={item.onClick}>
              <ListItemIcon className="itemIcon">{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography className="textItem" variant="subtitle1">
                  {item.text}
                </Typography>
              </ListItemText>
            </ListItem>
          </div>
        ))}
      </List>
      <div className="Logout">
        <Button onClick={handleLogoutClick}>
          <ExitToAppOutlined className="itemIcon" />
          <Typography className="textLogout">Logout</Typography>
        </Button>
      </div>
    </Drawer>
  );
};

export default MenuComponent;