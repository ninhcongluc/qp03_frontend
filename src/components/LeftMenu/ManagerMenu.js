import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PortraitIcon from "@mui/icons-material/Portrait";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./ManagerMenu.css";
import axios from "axios";

const ManagerMenu = () => {
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
    <Box className="leftSideBar" >
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#101214",
          },
        }}
      >
        <div class="menu">
          <Stack alignItems={"center"}>
            <Avatar alt="Manager" 
            src="https://th.bing.com/th/id/R.79ffc87ca100b039540692db6de15913?rik=xGPt1mwMRUlg2w&riu=http%3a%2f%2fwww.thisisanfield.com%2fwp-content%2fuploads%2fPROP150218-018-Liverpool_Press_Conf.jpg&ehk=munj9fKuzHU4K86gRLtsP9wJFCvRPeJ%2f7BKKBLLQACI%3d&risl=&pid=ImgRaw&r=0" 
            sx={{ width: 70, height: 70 }} />
            <Typography className="avatarText" sx={{ fontSize: 20}}>
              {userData.firstName} {userData.lastName}
            </Typography>
          </Stack>
        </div>
        <div>
          <List>
            <ListItem button onClick={handleSemesterClick} className="itemList">
              <ListItemIcon >
                <DashboardOutlined className="itemIcon" />
              </ListItemIcon>
              <ListItemText >
                <Typography className="itemText" sx={{ fontSize:18}}>
                  Semester
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem button onClick={handleTeacherInformationClick} className="itemList">
              <ListItemIcon >
                <PermIdentityIcon className="itemIcon" />
              </ListItemIcon>
              <ListItemText >
                <Typography className="itemText" sx={{ fontSize:18}}>Teacher List</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button onClick={handleCourseClick} className="itemList">
              <ListItemIcon >
                <PortraitIcon className="itemIcon" />
              </ListItemIcon>
              <ListItemText >
                <Typography className="itemText" sx={{ fontSize:18}}>Course</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button onClick={handleLogoutClick}
              className="Logout"
              sx={{
                marginTop: "300px",
              }}
            >
              <ListItemIcon >
                <ExitToAppOutlined className="itemIcon" />
              </ListItemIcon>
              <ListItemText >
                <Typography className="itemText" sx={{ fontSize:18}}>Logout</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </div>

      </Drawer>
    </Box>
  );
};

export default ManagerMenu;


