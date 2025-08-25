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

  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // wait for hydration
    if (isAuthenticated) {
      navigate("/", { replace: true }); 
    }
  }, [loading, isAuthenticated, navigate]);

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
