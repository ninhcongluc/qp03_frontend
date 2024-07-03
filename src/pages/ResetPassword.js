import React, { useState, useEffect } from 'react';
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [countdown, setCountdown] = useState(300); 
  const [showResendButton, setShowResendButton] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setShowResendButton(true);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const email = new URLSearchParams(window.location.search).get("email");
  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otpCode: otp, newPassword, email }),
      });

      if (response.ok) {
        toast.success('Password has been reset successfully.');
        navigate('/');
      } else {
        toast.error('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('OTP has been resent.');
        setCountdown(300); 
        setShowResendButton(false);
      } else {
        toast.error('Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
        type={showNewPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={handleNewPasswordChange} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowNewPassword} edge="end">
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="body2" align="right" gutterBottom>
        {showResendButton ? (
          <Button variant="contained" color="primary" onClick={handleResendOtp}>
            Resend OTP
          </Button>
        ) : (
          `OTP expiration time: ${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}`
        )}
      </Typography>
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