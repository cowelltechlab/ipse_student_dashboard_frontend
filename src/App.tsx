import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OAuthCallbackHandler from "./pages/Callback";
import AssignmentDetails from "./pages/AssignmentDetails";
import Student from "./pages/Student";
import Register from "./pages/Register";
import CreateNewAssignment from "./pages/CreateNewAssignment";
import StudentProfileCreation from "./pages/StudentProfileCreation";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<OAuthCallbackHandler />} />
      <Route
        path="/unauthorized"
        element={<div>You are not authorized to view this page.</div>}
      />

      {/* Protected wrapper for roles */}
      <Route
        element={
          <ProtectedRoute requiredRoles={["Admin", "Advisor", "Peer Tutor"]} />
        }
      >
        <Route path="/dashboard" element={<Home />} />
      </Route>

      <Route path="/dashboard" element={<Home />} />

      {/*  TODO: Update student routes so students cannot access other students' pages. */}
      {/* Protected wrapper for students
      <Route element={<ProtectedRoute />}>
        <Route path="/student/:student_id" element={<StudentDashboard />} />
      </Route> */}

      <Route path="/complete-invite" element={<Register />} />

      <Route path="/student/:student_id" element={<Student />} />

      <Route
        path="/student/:student_id/assignment/:assignment_id"
        element={<AssignmentDetails />}
      />

      <Route
        path="/profile-creation/:user_id"
        element={<StudentProfileCreation />}
      />

      

      {/* Backup route */}
      <Route path="*" element={<div>Page not found</div>} />

      <Route
        element={
          <ProtectedRoute requiredRoles={["Admin", "Advisor"]} />
        }
      >
        <Route
          path="/create-assignment"
          element={<CreateNewAssignment/>}
        />
      </Route>

      {/* TODO: Update so student default is their own page */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
