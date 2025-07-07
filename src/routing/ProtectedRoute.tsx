import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { Flex, Spinner } from "@chakra-ui/react";

interface ProtectedRouteProps {
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const location = useLocation();
  const params = useParams();
  const { isAuthenticated, roles, studentId, loading } = useAuth(); // Make sure `userId` is exposed in useAuth

  // While loading, return a full-page spinner or placeholder
  if (loading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Student self-access control for /student/:student_id
  if (location.pathname.startsWith("/student/")) {
    const routeStudentId = params.student_id;
    console.log("Route Student ID:", routeStudentId);
    console.log("Student ID:", studentId);
    const isStudent = roles.includes("Student");

    if (!isStudent || routeStudentId !== studentId?.toString()) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Role-based access control
  if (
    requiredRoles &&
    roles &&
    !requiredRoles.some((role) => roles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
