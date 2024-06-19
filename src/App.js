import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminPage from "./pages/Admin/Admin";
import ManagerManagementPage from "./pages/Admin/ManagerManagement";
import Login from "./pages/Login/Login";
import CourseDetailPage from "./pages/Manager/CourseDetailManagement";
import CourseManagementPage from "./pages/Manager/CourseManagement";
import SemesterManagement from "./pages/Manager/SemesterManagement";
import TeacherPage from "./pages/Teacher/Teacher";
import TeacherCourseListPage from "./pages/Teacher/TeacherCourseList";
import TeacherQuizListPage from "./pages/Teacher/TeacherQuizList";
import TeacherManagementPage from "./pages/Manager/TeacherManagement";
import ProfilePage from "./pages/Profile";
import StudentPage from "./pages/Student/Student";
import StudentCourseListPage from "./pages/Student/StudentCourseList";
import StudentQuizPage from "./pages/Student/StudentQuizPage";
import StudentQuizDetail from "./pages/Student/StudentQuizDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/manage-manager" element={<ManagerManagementPage />} />

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerPage />}>
          <Route path="semester" element={<SemesterManagement />} />
          <Route path="teacher-information" element={<TeacherManagementPage />} />
          <Route path="course" element={<CourseManagementPage />} />
          <Route path="course/:id" element={<CourseDetailPage />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherPage />}>
          <Route path="course-management" element={<TeacherCourseListPage />} />
          <Route path="quiz" element={<TeacherQuizListPage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentPage />}>
          <Route path="course-management" element={<StudentCourseListPage />} />
          <Route path="course-management/quiz" element={<StudentQuizPage />} />
          <Route path="course-management/quiz/:courseId" element={<StudentQuizPage />} />
          <Route path="course-management/quiz/:courseId/:quizId" element={<StudentQuizDetail />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
