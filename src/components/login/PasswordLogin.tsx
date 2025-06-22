import { Box, Flex, Text, Button, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import useAuth from "../../contexts/useAuth";
import { useState } from "react";

interface PasswordLoginProps {
  setFormDisplay: React.Dispatch<
    React.SetStateAction<"googleLogin" | "usernameLogin">
  >;
}

const PasswordLogin = ({ setFormDisplay }: PasswordLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithEmail } = useAuth();

  const onEmailLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      // Let the redirect happen via useEffect once roles are available
    } catch (err) {
      console.error("Email login failed:", err);
    }
  };

  return (
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
  );
};

export default PasswordLogin;
