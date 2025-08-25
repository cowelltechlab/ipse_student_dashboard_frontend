import { Box, Flex, Image, Text } from "@chakra-ui/react";

import loginImage from "../assets/Login.svg";
import LoginForm from "../components/login/LoginForm";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { useEffect } from "react";
import { toaster } from "../components/ui/toaster";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { userId } = useAuth();

  // Do not navigate during render
  useEffect(() => {
    if (userId) {
      navigate("/dashboard", { replace: true });
    }
  }, [userId, navigate]);

  // Read any error passed from redirects 
  useEffect(() => {
    const err = (location.state as { error?: string } | null)?.error;
    if (err) {
      toaster.create({
        title: "Sign-in failed",
        description: err,
        type: "error",
        duration: 6000,
      });
      // Clear history state so the toast does not repeat on back/refresh
      navigate("/login", { replace: true, state: null });
    }
  }, [location.state, navigate]);

  return (
    <Flex
      minH="100vh"
      width="full"
      direction={{ base: "column", lg: "row" }}
      bg="#244d8a"
    >
      {/* Top on mobile / Left on desktop */}
      <Box
        bg="white"
        width={{ base: "100%", lg: "50%" }}
        display="flex"
        flexDirection={{ base: "row", lg: "column" }}
        alignItems="center"
        justifyContent="center"
        px={8}
        py={12}
        pt={{ base: "12", lg: "4" }}
      >
        <Image
          width={{ base: "3xs", lg: "full" }}
          src={loginImage}
          alt="Login"
          objectFit="contain"
        />
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Step into a smarter, more inclusive way to learn
        </Text>
      </Box>

      {/* Bottom on mobile / Right on desktop */}
      <Box
        width={{ base: "100%", lg: "50%" }}
        bg="#244d8a"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={8}
        py={12}
      >
        <LoginForm />
      </Box>
    </Flex>
  );
};



export default Login;