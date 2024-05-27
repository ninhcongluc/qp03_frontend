import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile/Profile";
import AdminHomePage from "./components/Admin/AdminHomePage";
import ManagerHomePage from "./components/Manager/ManagerHomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/manager" element={<ManagerHomePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
