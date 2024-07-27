import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@mui/joy/styles";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChangePassword.css";
import ApiInstance from "../../axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const { userId } = useParams();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await ApiInstance.put("/user/change-password", {
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password has been change successfully.");
      setIsModalOpen(false);
    } catch (error) {
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
    }
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="change-password-container">
      <Button style={{ color: "white" }} onClick={() => setIsModalOpen(true)}>
        Change Password
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            className="Close-button"
            variant="plain"
            onClick={() => setIsModalOpen(false)}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            Change Password
          </Typography>
          <TextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
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
          <TextField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleChangePassword}
            style={{
              marginLeft: "80%",
              width: "20%",
              backgroundColor: "Highlight",
              color: "white",
            }}
          >
            Save
          </Button>
        </Sheet>
      </Modal>
    </div>
  );
}

export default ChangePassword;
