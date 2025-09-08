import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PasswordInput } from "../ui/password-input";
import TextButton from "../common/universal/TextButton";
import { toaster } from "../ui/toaster";
import useResetPassword from "../../hooks/auth/useResetPassword";

const ResetPasswordForm = () => {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const navigate = useNavigate();

  const { handlePasswordReset, loading } = useResetPassword();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  const onPasswordResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toaster.create({
        description: "Passwords do not match.",
        type: "error",
      });
      return;
    }


    try {
      await handlePasswordReset(
        token,
        email,
        password
      );

      toaster.create({
        description: "Password reset successfully.",
        type: "success",
      });
      navigate("/login");
    } catch (e) {
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };
      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating account: ${errorMessage}`,
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Heading
        fontSize="5xl"
        color="white"
        mb={6}
        textAlign="center"
        mt={{ base: 4, lg: 20 }}
      >
        Reset your Password
      </Heading>

      <form onSubmit={onPasswordResetSubmit}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height={{ base: "auto", lg: "80vh" }}
          px={{ base: 0, lg: 4 }}
        >
          <Box maxW={{ base: "full", lg: "sm" }} w="lg">
            <Stack spaceY={6} w="full" align="center">
              <Input
                placeholder="Enter Email"
                _placeholder={{ color: "white" }}
                color="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
                autoComplete="off"
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
                autoComplete="new-password"
              />
              <PasswordInput
                placeholder="Confirm Password"
                _placeholder={{ color: "white" }}
                color="white"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
                autoComplete="new-password"
              />

      

              <Button
                type="submit"
                w="full"
                bg="#bd4f23"
                color="white"
                loading={loading}
                _hover={{ bg: "#a43e1c" }}
              >
                Reset Password
              </Button>

              <TextButton onClick={() => navigate("/login")} color="white">
                Remembered your password? Log in
              </TextButton>
            </Stack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
