import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (window.gapi && window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
    window.location.replace("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box flexGrow={1} />
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleAvatarClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
