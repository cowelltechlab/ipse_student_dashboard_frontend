import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import Footer from "../components/common/universal/Footer";

interface ProtectedRouteProps {
  requiredRoles?: string[]; // optional: adds role gating on top of auth
  skipFooter?: boolean; // optional: skip footer rendering for nested ProtectedRoutes
}

const FullscreenSpinner = () => (
  <Flex height="100vh" align="center" justify="center">
    <Spinner size="xl" />
  </Flex>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles,
  skipFooter = false
}) => {
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

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Box flex="1">
        <Outlet />
      </Box>
      {!skipFooter && <Footer />}
    </Box>
  );
};

export default ProtectedRoute;
