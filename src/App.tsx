import React from "react";
import { Routes, Route } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<OAuthCallbackHandler />} />
      <Route path="/complete-invite" element={<Register />} />
      <Route
        path="/unauthorized"
        element={<div>You are not authorized to view this page.</div>}
      />

      {/* Protected Routes - Admin, Advisor, Peer Tutor */}
      <Route
        element={
          <ProtectedRoute requiredRoles={["Admin", "Advisor", "Peer Tutor"]} />
        }
      >
        <Route path="/dashboard" element={<Home />} />
      </Route>

      {/* Student Routes */}
      {/* TODO: Update student routes so students cannot access other students' pages */}
      <Route path="/student/:student_id" element={<Student />} />
      <Route path="/student/:student_id/profile" element={<StudentProfile />} />
      <Route
        path="/student/:student_id/documents"
        element={<StudentDocuments />}
      />
      <Route
        path="/student/:student_id/achievements"
        element={<StudentAchievements />}
      />

      <Route
        path="/student/:student_id/assignment/:assignment_id"
        element={<AssignmentDetails />}
      />
      <Route
        path="/student/:student_id/assignment/:assignment_id/modification"
        element={<AssignmentModifications />}
      />

      {/* Student Profile Creation */}
      <Route
        path="/profile-creation/:user_id"
        element={<StudentProfileCreation />}
      />

      {/* Protected Routes - Admin, Advisor Only */}
      <Route element={<ProtectedRoute requiredRoles={["Admin", "Advisor"]} />}>
        <Route path="/create-assignment" element={<CreateNewAssignment />} />
      </Route>

      {/* Default/Fallback Route */}
      <Route path="/dashboard" element={<Home />} />
      <Route path="*" element={<Login />} />

  
    </Routes>
  );
};

export default App;
