import { Box, Flex, Image, Text } from "@chakra-ui/react";

import loginImage from "../assets/Login.svg";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
  return (
    <Flex minH="100vh" width="full" direction={{ base: "column", lg: "row" }}>
      {/* Left Side: Login Form */}
      <Box
        bg="white"
        width={{ base: "100%", lg: "50%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={8}
        py={12}
      >
        <Image width="full" src={loginImage} alt="Login" objectFit="contain" />
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Step into a smarter, more inclusive way to learn
        </Text>
      </Box>

      {/* Right Side: Optional Background Image or Content */}
      <Box
        width={{ base: "100%", lg: "50%" }}
        bg="#244d8a"
        display={{ base: "none", lg: "block" }}
      >
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default Login;
