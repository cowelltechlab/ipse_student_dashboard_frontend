import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import OAuthCallbackHandler from "./pages/Callback";
import AssignmentDetails from "./pages/AssignmentDetails";
import Student from "./pages/Student";
import Register from "./pages/Register";
import CreateNewAssignment from "./pages/CreateNewAssignment";
import StudentProfileCreation from "./pages/StudentProfileCreation";
import StudentProfile from "./pages/StudentProfile";
import StudentDocuments from "./pages/StudentDocument";
import StudentAchievements from "./pages/StudentAchievements";
import AssignmentModifications from "./pages/AssignmentModification";
import AuthGate from "./routing/AuthGate";
import ResetPassword from "./pages/ResetPassword";
import InactiveStudentHome from "./pages/InactiveStudentHome";
import StudentCreateNewAssignment from "./pages/StudentCreateNewAssignment";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<OAuthCallbackHandler />} />
      <Route path="/complete-invite" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<div>You are not authorized to view this page.</div>} />

      {/* Everything below this line requires authentication */}
      <Route element={<ProtectedRoute />}>
        {/* Smart landing: sends staff to /dashboard, students to /student/:id */}
        <Route path="/" element={<AuthGate />} />

        {/* Student pages (Students restricted to their own id by ProtectedRoute) */}
        <Route path="/student/:student_id" element={<Student />} />
        <Route path="/student/:student_id/profile" element={<StudentProfile />} />
        <Route path="/student/:student_id/documents" element={<StudentDocuments />} />
        <Route path="/student/:student_id/create-assignment" element={<StudentCreateNewAssignment />} />
        <Route path="/student/:student_id/achievements" element={<StudentAchievements />} />
        <Route path="/student/:student_id/assignment/:assignment_id" element={<AssignmentDetails />} />
        <Route path="/student/:student_id/assignment/:assignment_id/modification" element={<AssignmentModifications />} />

        {/* Student profile creation (authenticated) */}
        <Route path="/profile-creation/:user_id" element={<StudentProfileCreation />} />
        
        {/* Students without student ID - complete account setup */}
        <Route path="/complete-account/:user_id" element={<InactiveStudentHome />} />

        {/* Staff-only sections */}
        <Route element={<ProtectedRoute requiredRoles={["Admin", "Advisor", "Peer Tutor"]} />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>

        <Route element={<ProtectedRoute requiredRoles={["Admin", "Advisor"]} />}>
          <Route path="/create-assignment" element={<CreateNewAssignment />} />
        </Route>
      </Route>

      {/* Fallbacks */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} /> {/* avoid duplicate unprotected path */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
