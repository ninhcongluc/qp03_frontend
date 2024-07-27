import { Button, Checkbox, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = () => {
    // Perform login logic here
    axios
      .post("http://localhost:8000/auth/login", { email, password })
      .then((response) => {
        console.log(response.data);
        const { token, userInfo } = response.data.data;
        console.log(userInfo);

        // Handle successful login
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        if (userInfo.roleId === 1) {
          navigate("/admin/manage-manager");
        } else if (userInfo.roleId === 2) {
          navigate("/manager/semester");
        } else if (userInfo.roleId === 3) {
          navigate("/teacher/course-management");
        } else {
          navigate("/student/course-management");
        }
        toast.success("Login successful");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === "failed"
        ) {
          const { details } = error.response.data.error;
          details.forEach((detail) => {
            toast.error(detail.message);
          });
        } else {
          toast.error(error.response.data.error);
        }
      });
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      // Send the Google credential to the backend
      const response = await fetch("http://localhost:8000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Save the token to local storage
        localStorage.setItem("authToken", token);
        // Navigate to the home page
        navigate("/home");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div class="login-container">
      <img
        src="https://it.fpt.edu.vn/wp-content/uploads/2020/05/2017-FPTU-S-01.png"
        alt="FPT Logo"
        className="corner-logo"
      />
      <div class="login-form">
        <img
          src="https://seeklogo.com/images/F/fpt-university-logo-B3B6D84292-seeklogo.com.png"
          alt="FPT University Logo"
          className="logo"
        />
        <h5>LOGIN</h5>
        <TextField
          label="Enter Email"
          value={email}
          onChange={handleEmailChange}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <br />
        <TextField
          label="Enter Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <div className="rememberDiv">
          <div>
            {/* <Checkbox
              checked={rememberMe}
              onChange={handleRememberMeChange}
              label="Remember me"
              style={{ color: "orange" }}
            />
            <label class="remember-me-label">Remember me</label> */}
          </div>
          <div className="forgot-div">
            <a href="/forgot-password" style={{ color: "orange" }}>
              Forgot password?
            </a>
          </div>
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#fc8b03", color: "#ffffff" }} // Custom colors
          onClick={handleLogin}
          class="login-button"
        >
          Login
        </Button>
        <div class="or">OR </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </div>
    </div>
  );
}

export default Login;
