import React, { useState } from "react";
import { TextField, Checkbox, Button } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
    console.log("Login clicked");
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>LOGIN</h2>

        <TextField
          label="Enter email"
          value={email}
          onChange={handleEmailChange}
          InputLabelProps={{ style: { color: "black" } }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Enter password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          InputLabelProps={{ style: { color: "black" } }}
          fullWidth
          margin="normal"
        />
        <div className="remember-me-container">
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            style={{ color: "orange" }}
          />
          <label className="remember-me-label">Remember me</label>
          <a href="#!" style={{ color: "#ff4a02" }}>
            Forgot password?
          </a>
        </div>

        <Button
          variant="contained"
          style={{ backgroundColor: '#fc8b03', color: '#ffffff' }}
          onClick={handleLogin}
          className="login-button"
          fullWidth
        >
          Login
        </Button>
        <div className="or">OR</div>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          style={{ borderRadius: '10%', marginTop: '10px' }}
        />
      </div>
      {/* <div className="image">
      <img src="D:\downloads\Thiết kế chưa có tên.png" />
      </div> */}
    </div>
  );
}

export default Login;

