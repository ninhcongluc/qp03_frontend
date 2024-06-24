// src/pages/ChangePassword.js
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ChangePassword.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChangePassword({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    axios
      .post("http://localhost:8000/auth/change-password", {
        currentPassword,
        newPassword,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Password changed successfully");
      })
      .catch((error) => {
        console.error(error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="change-password-form">
      <h2>Change Password</h2>
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
        fullWidth
        className="change-password-button"
      >
        Change Password
      </Button>
    </div>
  );
}

export default ChangePassword;
