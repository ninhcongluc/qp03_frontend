import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminPage from "./pages/Admin/Admin";
import ManagerPage from "./pages/Manager/Manager";
import StudentPage from "./pages/Student/Student";
import Login from "./pages/Login/Login";
import ManagerManagementPage from "./pages/Admin/ManagerManagement";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/manage-manager"
          element={<ManagerManagementPage />}
        />

        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
