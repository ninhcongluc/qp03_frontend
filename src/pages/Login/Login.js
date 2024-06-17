import { Button, Checkbox, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
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

        toast.success("Login successful");
        if (userInfo.roleId === 1) {
          navigate("/admin/manage-manager");
        } else if (userInfo.roleId === 2) {
          navigate("/manager/semester");
        } else {
          navigate("/admin");
        }
      })
      .catch((error) => {
        // Handle login error
        console.error(error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const responseGoogle = (response) => {
    // window.open("http://localhost:8000/auth/google", "_self");
    // console.log(response);
  };

  return (
    <div class="login-container">
      <div class="login-form">
        <h2>LOGIN</h2>

        <TextField
          label="Enter email"
          value={email}
          onChange={handleEmailChange}
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
          <label class="remember-me-label">Remember me</label>

          <a href="!#" style={{ color: "#ff4a02" }}>
            Forgot password?
          </a>
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
