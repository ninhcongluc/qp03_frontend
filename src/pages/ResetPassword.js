import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  // const email = new URLSearchParams(window.location.search).get("email");
  const handleResetPassword = async () => {
    // Gửi yêu cầu tới server để đặt lại mật khẩu
    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, newPassword }),
      });

      if (response.ok) {
        alert("Password has been reset successfully.");
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Reset Password
      </Typography>
      <TextField
        label="OTP"
        variant="outlined"
        fullWidth
        margin="normal"
        value={otp}
        onChange={handleOtpChange}
      />
      <TextField
        label="New Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleResetPassword}
      >
        Reset Password
      </Button>
    </Container>
  );
};

export default ResetPassword;
