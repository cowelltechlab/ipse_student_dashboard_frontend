import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import useAuth from "../contexts/useAuth";

interface ProtectedRouteProps {
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const location = useLocation();
  const params = useParams();
  const { isAuthenticated, roles, userId } = useAuth(); // Make sure `userId` is exposed in useAuth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role-based access control
  if (requiredRoles && roles && !requiredRoles.some((role) => roles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Student self-access control for /student/:student_id
  if (location.pathname.startsWith("/student/")) {
    const routeStudentId = params.student_id;
    const isStudent = roles.includes("Student");

    if (!isStudent || routeStudentId !== userId?.toString()) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
