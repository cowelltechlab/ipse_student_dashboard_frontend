import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { Flex, Spinner } from "@chakra-ui/react";

interface ProtectedRouteProps {
  requiredRoles?: string[]; // optional: adds role gating on top of auth
}

const FullscreenSpinner = () => (
  <Flex height="100vh" align="center" justify="center">
    <Spinner size="xl" />
  </Flex>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const location = useLocation();
  const params = useParams();
  const { isAuthenticated, roles, studentId, loading } = useAuth();

  // 1) Global auth loading (token hydration, /auth/me, etc.)
  if (loading) return <FullscreenSpinner />;

  // 2) Must be logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3) Role-gated sections
  if (requiredRoles) {
    // NEW: don't decide until roles are known
    if (roles.length === 0) {
      return <FullscreenSpinner />; // wait for roles to hydrate
    }

    if (!requiredRoles.some((r) => roles.includes(r))) {
      // NEW: soft-redirect to "/" so AuthGate can route properly
      return <Navigate to="/" replace />;
      // If you want a hard deny, use:
      // return <Navigate to="/unauthorized" replace />;
    }
  }

  // 4) Student self-access enforcement
  if (location.pathname.startsWith("/student/")) {
    const isStudent = roles.includes("Student");
    if (isStudent) {
      // Wait until studentId is known; don't 403 prematurely
      if (studentId == null) return <FullscreenSpinner />;

      const routeStudentId = params.student_id;
      if (routeStudentId !== String(studentId)) {
        return <Navigate to="/unauthorized" replace />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
