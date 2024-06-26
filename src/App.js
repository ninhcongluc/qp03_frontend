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
import StudentQuizReview from "./pages/Student/StudentQuizReview";
import TeacherQuestionListPage from "./pages/Teacher/TeacherAddQuetions";
import TeacherCourseDetailPage from "./pages/Teacher/TeacherCourseDetail";
import QuizQuestionsPage from "./pages/Teacher/TeacherSetUpQA";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ChangePassword from "./components/ChangePassword/ChangePassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
        <Route
          path="/teacher/course-management/:courseId"
          element={<TeacherCourseDetailPage />}
        />
        <Route path="/teacher/quiz" element={<TeacherQuizListPage />} />
        <Route path="/teacher/quiz/:quizId" element={<QuizQuestionsPage />} />

        <Route
          path="/teacher/add-question"
          element={<TeacherQuestionListPage />}
        />
        <Route path="/changePass" element={<ChangePassword />} />

        <Route path="/student" element={<StudentPage />} />
        <Route
          path="/student/course-management"
          element={<StudentCourseListPage />}
        />

        <Route
          path="/student/course-management/class/:courseId"
          element={<StudentQuizPage />}
        />

        <Route
          path="/student/course-management/class/:courseId/:quizId"
          element={<StudentQuizDetail />}
        />

        <Route
          path="/student/course-management/class/:courseId/:quizId/start"
          element={<StudentDoQuiz />}
        />

        <Route
          path="/student/course-management/class/:courseId/:quizId/review"
          element={<StudentQuizReview />}
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
