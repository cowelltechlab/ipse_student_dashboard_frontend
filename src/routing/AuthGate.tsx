import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import useAuth from "../contexts/useAuth";

const FullscreenSpinner = () => (
  <Flex height="100vh" align="center" justify="center">
    <Spinner size="xl" />
  </Flex>
);

const AuthGate: React.FC = () => {
  const { isAuthenticated, roles, studentId, loading, userId } = useAuth();
  const location = useLocation();

  // NEW: also wait for roles to hydrate before deciding
  if (loading || roles.length === 0) return <FullscreenSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isStaff = roles.some((r) =>
    ["Admin", "Advisor", "Peer Tutor"].includes(r)
  );
  if (isStaff) return <Navigate to="/dashboard" replace />;

  if (roles.includes("Student")) {
    if (userId == null) return <FullscreenSpinner />; // wait for id
    if (studentId == null) return <Navigate to={`/complete-account/${userId}`} replace />;
    return <Navigate to={`/student/${studentId}`} replace />;
  }

  // If roles are known but not staff or student, show explicit deny
  return <Navigate to="/unauthorized" replace />;
};

export default AuthGate;
