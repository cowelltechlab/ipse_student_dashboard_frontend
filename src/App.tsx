import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./routing/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OAuthCallbackHandler from "./pages/Callback";

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

      {/* Protected wrapper for students */}
      <Route element={<ProtectedRoute requiredRoles={["Student"]} />}>
        <Route path="/student/:student_id" element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
