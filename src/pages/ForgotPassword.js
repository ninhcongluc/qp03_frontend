import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isEmailValid = (email) => {
    // Basic email validation
    const emailRegex = /^[\w+]+([.-]?[\w+])*@[\w+]+([.-]?[\w+])*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    if (!isEmailValid(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
    navigate(`/reset-password?email=${email}`);
    // Gửi yêu cầu tới server để gửi OTP
    try {
      const response = await fetch('http://localhost:8000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        alert('OTP has been sent to your email.');
      } else {
        alert('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Forgot Password
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSendOtp}
      >  
        Send OTP
      </Button>
    </Container>
  );
};

export default ForgotPassword;
