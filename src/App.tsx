import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/AdminPanel';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './routing/ProtectedRoute';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import TeacherHome from './pages/TeacherHome';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Route>
      
      {/* Teacher / Admin only routes */}
      <Route element={<ProtectedRoute requiredRoles={["teacher"]} />}>
        <Route path="/teacher-dashboard" element={<TeacherHome />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
        <Route path="/admin-dashboard" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
};

export default App;
