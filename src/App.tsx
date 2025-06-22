import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/StudentDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './routing/ProtectedRoute';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import TeacherHome from './pages/TeacherHome';
import OAuthCallbackHandler from './pages/Callback';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Route>
      
      {/* Teacher / Admin only routes */}
      <Route element={<ProtectedRoute requiredRoles={["Advisor"]} />}>
        <Route path="/teacher-dashboard" element={<TeacherHome />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute requiredRoles={["Admin"]} />}>
        <Route path="/admin-dashboard" element={<AdminPanel />} />
      </Route>

      <Route path="/auth/callback" element={<OAuthCallbackHandler />} />

      <Route path="/unauthorized" element={<div>You are not authorized to view this page.</div>} />

    </Routes>
  );
};

export default App;
