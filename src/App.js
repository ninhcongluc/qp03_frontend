import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminPage from "./pages/Admin/Admin";
import ManagerManagementPage from "./pages/Admin/ManagerManagement";
import Login from "./pages/Login/Login";
import CourseDetailPage from "./pages/Manager/ CourseDetailManagement";
import CourseManagementPage from "./pages/Manager/ CourseManagement";
import SemesterManagement from "./pages/Manager/ SemesterManagement";
import ManagerPage from "./pages/Manager/Manager";
import TeacherManagementPage from "./pages/Manager/TeacherManagement";
import ProfilePage from "./pages/Profile";
import StudentPage from "./pages/Student/Student";
import StudentCourseListPage from "./pages/Student/StudentCourseList";
import TeacherPage from "./pages/Teacher/Teacher";
import TeacherCourseListPage from "./pages/Teacher/TeacherCourseList";
import TeacherQuizListPage from "./pages/Teacher/TeacherQuizList";
import StudentQuizPage from "./pages/Student/StudentQuizPage";
import StudentQuizDetail from "./pages/Student/StudentQuizDetail";
import StudentDoQuiz from "./pages/Student/StudentDoQuiz";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/manage-manager"
          element={<ManagerManagementPage />}
        />

        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/manager/semester" element={<SemesterManagement />} />
        <Route
          path="/manager/teacher-information"
          element={<TeacherManagementPage />}
        />
        <Route path="/manager/course" element={<CourseManagementPage />} />
        <Route path="/manager/course/:id" element={<CourseDetailPage />} />

        <Route path="/teacher" element={<TeacherPage />} />
        <Route
          path="/teacher/course-management"
          element={<TeacherCourseListPage />}
        />
        <Route path="/teacher/quiz" element={<TeacherQuizListPage />} />

        <Route path="/student" element={<StudentPage />} />
        <Route
          path="/student/course-management"
          element={<StudentCourseListPage />}
        />

        <Route
          path="/student/course-management/quiz"
          element={<StudentQuizPage />}
        />

        <Route
          path="/student/course-management/quiz/:courseId"
          element={<StudentQuizPage />}
        />

        <Route
          path="/student/course-management/quiz/:courseId/:quizId"
          element={<StudentQuizDetail />}
        />

        <Route
          path="/student/course-management/quiz/:courseId/:quizId/start&page=:page"
          element={<StudentDoQuiz />}
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
