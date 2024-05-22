import React, { useState } from "react";
import { TextField, Checkbox, Button } from "@material-ui/core";
import "./Login.css";
import { GoogleLogin } from "react-google-login";

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

  // const handleLoginWithGoogle = () => {
  //   // Perform login with Google logic here
  //   console.log("Login with Google clicked");
  // };

  return (
    <div className="login-container">
      <div className="login-form">
        <TextField label="Email" value={email} onChange={handleEmailChange} />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Checkbox
          checked={rememberMe}
          onChange={handleRememberMeChange}
          label="Remember me"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </Button>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
