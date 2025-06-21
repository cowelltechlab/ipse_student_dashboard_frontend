import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../ui/password-input";

import georgiaTechLogo from "../../assets/gt_logo_white.svg";
import googleLogo from "../../assets/google_logo_icon.png";
import useAuth from "../../contexts/useAuth";

const LoginForm = () => {
  const [formDisplay, setFormDisplay] = useState<
    "googleLogin" | "usernameLogin"
  >("googleLogin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loginWithEmail,
    loginWithGoogle,
    roles,
    isAuthenticated,
  } = useAuth();
  const navigate = useNavigate();

  const onEmailLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      // Let the redirect happen via useEffect once roles are available
    } catch (err) {
      console.error("Email login failed:", err);
    }
  };

  const onGoogleLogin = async () => {
    try {
      await loginWithGoogle(); // Redirects immediately via window.location
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const onGTLogin = async () => {
    try {
      await loginWithGoogle(); // Reuse Google login logic for GT
    } catch (err) {
      console.error("GT login failed:", err);
    }
  };

  useEffect(() => {
    const redirectUser = (roles: string[]) => {
      if (roles.includes("Admin")) navigate("/admin-dashboard");
      else if (roles.includes("Advisor")) navigate("/teacher-dashboard");
      else navigate("/dashboard");
    };

    if (isAuthenticated && roles.length > 0) {
      redirectUser(roles);
    }
  }, [isAuthenticated, roles, navigate]);

  return (
    <Box>
      {formDisplay === "googleLogin" ? (
        <Box>
          <VStack>
            <Button
              variant="outline"
              borderColor="gray.300"
              bg="white"
              _hover={{ bg: "gray.100" }}
              width="fit-content"
              px={4}
              py={2}
              boxShadow="sm"
              borderRadius="md"
              onClick={onGoogleLogin}
            >
              <Flex align="center" gap={2}>
                <Image src={googleLogo} alt="Google Logo" boxSize="20px" />
                <Text fontSize="sm" color="gray.700">
                  Login with Google
                </Text>
              </Flex>
            </Button>

            <Button
              bg={"white"}
              color={"#244d8a"}
              display="flex"
              alignItems="center"
              px={0}
              overflow="hidden"
              outline={"none"}
              onClick={onGTLogin}
            >
              <Box
                bg={"#BAA169"}
                borderRadius="md"
                height="40px"
                width="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={3}
              >
                <Image src={georgiaTechLogo} alt="GT Logo" />
              </Box>
              <Box flex="1" textAlign="left" px={2}>
                Sign in with GT ID
              </Box>
            </Button>
          </VStack>

          <Text textAlign="center" my={4}>
            or
          </Text>

          <Text
            width="full"
            textAlign="center"
            mb={4}
            color={"white"}
            onClick={() => setFormDisplay("usernameLogin")}
            style={{ cursor: "pointer" }}
            _hover={{ textDecoration: "underline" }}
          >
            Log in with Username and Password
          </Text>
        </Box>
      ) : (
        <form onSubmit={onEmailLoginSubmit}>
          <Box>
            <Stack gap="4" align="flex-start" maxW="sm">
              <Input
                placeholder="Enter Email"
                _placeholder={{ color: "white" }}
                color={"white"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="flushed"
              />
              <PasswordInput
                placeholder="Enter Password"
                _placeholder={{ color: "white" }}
                color={"white"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="flushed"
              />
              <Button type="submit" colorScheme="blue">
                Login
              </Button>
            </Stack>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default LoginForm;
