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
import TeacherManagementPage from "./pages/Manager/TeacherManagement";
import TeacherPage from "./pages/Teacher/Teacher";
import TeacherCourseListPage from "./pages/Teacher/TeacherCourseList";
import StudentCourseListPage from "./pages/Student/StudentCourseList";
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
        <Route
          path="/manager/manage-teacher"
          element={<TeacherManagementPage />}
        />

        <Route path="/teacher" element={<TeacherPage />} />
        <Route
          path="/teacher/course-management"
          element={<TeacherCourseListPage />}
        />

        <Route path="/student" element={<StudentPage />} />
        <Route
          path="/student/course-management"
          element={<StudentCourseListPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
