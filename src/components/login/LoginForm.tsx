import { Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../contexts/useAuth";
import PasswordLogin from "./PasswordLogin";
import SSOLogin from "./SSOLogin";

const LoginForm = () => {
  const [formDisplay, setFormDisplay] = useState<
    "googleLogin" | "usernameLogin"
  >("googleLogin");

  const { roles, isAuthenticated, userId, studentId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = (roles: string[]) => {
      if (roles.includes("Admin")) navigate("/dashboard");
      else if (roles.includes("Advisor") || roles.includes("Peer Tutor"))
        navigate("/dashboard");
      else if (roles.includes("Student") && studentId)
        navigate(`/student/${studentId}`);
      else navigate("/unauthorized");
    };

    if (isAuthenticated && roles.length > 0) {
      redirectUser(roles);
    }
  }, [isAuthenticated, roles, userId, studentId, navigate]);

  return (
    <Box>
      <Heading
        fontSize="5xl"
        color="white"
        mb={6}
        textAlign="center"
        mt={{ base: 4, lg: 20 }}
      >
        Sign In
      </Heading>
      {formDisplay === "googleLogin" ? (
        <SSOLogin setFormDisplay={setFormDisplay} />
      ) : (
        <PasswordLogin setFormDisplay={setFormDisplay} />
      )}
    </Box>
  );
};

export default LoginForm;
