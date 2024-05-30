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

const LeftMenu = () => {
  const navigate = useNavigate();

  const handleManagerManagementClick = () => {
    navigate("/admin/manage-manager");
  };

  const handleLogoutClick = () => {
    // Add your logout logic here
  };

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <List>
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
