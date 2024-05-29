import React, { useState } from "react";
import { TextField, Checkbox, Button } from "@material-ui/core";
import "./Login.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = () => {
    window.open("http://localhost:8000/auth/login", "_self");
    // Perform login logic here
    console.log("Login clicked");
    axios
      .post("http://localhost:8000/auth/login", { username, password })
      .then((response) => {
        console.log(response.data);
        const { token, userInfo } = response.data.data;
        console.log(userInfo);

        // Handle successful login
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));

        toast.success("Login successful");
        if (userInfo.roleId === 1) {
          navigate("/admin");
        } else if (userInfo.roleId === 2) {
          navigate("/manager");
        } else {
          navigate("/admin");
        }
      })
      .catch((error) => {
        // Handle login error
        // Handle login error
        console.error(error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const responseGoogle = (response) => {
    // Perform login logic here
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>LOGIN</h2>

        <TextField
          label="Enter username"
          value={username}
          onChange={handleUsernameChange}
          InputLabelProps={{ style: { color: "black" } }}
        />
        <TextField
          label="Enter password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          InputLabelProps={{ style: { color: "black" } }}
        />
        <div>
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            label="Remember me"
            style={{ color: "orange" }}
          />
          <label className="remember-me-label">Remember me</label>

          <a href="!#" style={{ color: "#ff4a02" }}>
            Forgot password?
          </a>
        </div>

        <Button
          variant="contained"
          style={{ backgroundColor: "#fc8b03", color: "#ffffff" }} // Custom colors
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </Button>
        <div className="or">OR </div>

        <GoogleLogin
          clientId="136665406201-o3244ge21kai14aaehs4gtvrbo3vomih.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          style={{ borderRadius: "10%" }}
        />
      </div>
    </div>
  );
}

export default Login;
