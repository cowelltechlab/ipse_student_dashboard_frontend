import { Box, Flex, Text, Button, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import useAuth from "../../contexts/useAuth";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";
import TextButton from "../common/universal/TextButton";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

interface PasswordLoginProps {
  setFormDisplay: React.Dispatch<
    React.SetStateAction<"googleLogin" | "usernameLogin">
  >;
}

const PasswordLogin = ({ setFormDisplay }: PasswordLoginProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { loginWithEmail } = useAuth();

  const onEmailLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const ok = await loginWithEmail(email, password);
      if (ok) {
        navigate("/", { replace: true });
      }

      if (!ok) {
        // If loginWithEmail resolves false on bad credentials
        toaster.create({
          title: "Invalid credentials",
          description: "Please check your email and password and try again.",
          type: "error",
          duration: 6000,
        });
      }
    } catch (err) {
      console.error(err);
      // If loginWithEmail throws on failure
      toaster.create({
        title: "Login failed",
        description: "There was a problem signing you in. Please try again.",
        type: "error",
        duration: 6000,
      });
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={onEmailLoginSubmit}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height={{ base: "60vh", lg: "80vh" }}
          px={{ base: 0, lg: 4 }}
        >
          <Box maxW={{ base: "full", lg: "sm" }} w="lg">
            <Stack spaceY={6} w="full">
              <Input
                placeholder="Enter Email"
                _placeholder={{ color: "white" }}
                color="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
              />
              <PasswordInput
                placeholder="Enter Password"
                _placeholder={{ color: "white" }}
                color="white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
              />
              <TextButton
                color="gray.100"
                fontWeight="light"
                onClick={() => setShowForgotPassword(true)}
                fontSize="sm"
              >
                Forgot Password? Click here to send reset link
              </TextButton>
              <Button
                type="submit"
                w="full"
                bg={"#bd4f23"}
                color="white"
                _hover={{ bg: "#a43e1c" }}
              >
                Login
              </Button>
              <Text
                width="full"
                textAlign="center"
                color="white"
                onClick={() => setFormDisplay("googleLogin")}
                style={{ cursor: "pointer" }}
                _hover={{ textDecoration: "underline" }}
              >
                Back to SSO Login
              </Text>
            </Stack>
          </Box>
        </Flex>
      </form>

      {showForgotPassword && (
        <ForgotPasswordDialog
          open={showForgotPassword}
          setOpen={setShowForgotPassword}
        />
      )}
    </>
  );
};

export default PasswordLogin;
