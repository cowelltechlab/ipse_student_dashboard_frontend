import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import useAuth from "../../contexts/useAuth";

import georgiaTechLogo from "../../assets/Georgia_Tech_Yellow_Jackets_logo.png";
import googleLogo from "../../assets/google_logo_icon.png";

interface PasswordLoginProps {
  setFormDisplay: React.Dispatch<
    React.SetStateAction<"googleLogin" | "usernameLogin">
  >;
}

const SSOLogin = ({ setFormDisplay }: PasswordLoginProps) => {
  const { loginWithGoogle } = useAuth();

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

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="80vh"
      px={4}
    >
      <Box maxW="sm" w="full">
        <VStack spaceY={4} w="full">
          <Button
            variant="outline"
            bg="white"
            _hover={{ bg: "gray.100" }}
            w="full"
            onClick={onGoogleLogin}
            size={"2xl"}
          >
            <Flex align="center" justify="flex-start" w="full">
              <Image src={googleLogo} alt="Google Logo" boxSize="25px" mr={2} />
              <Text color="#244d8a" pl={1}>
                Login with Google
              </Text>
            </Flex>
          </Button>

          <Button
            variant="outline"
            bg="white"
            _hover={{ bg: "gray.100" }}
            w="full"
            onClick={onGTLogin}
            size={"2xl"}
          >
            <Flex align="center" justify="flex-start" w="full">
              <Image
                src={georgiaTechLogo}
                alt="GT Logo"
                boxSize="32px"
                mr={2}
                style={{ objectFit: "contain" }}
              />
              <Text color="#244d8a" pl={1}>
                Sign in with GT ID
              </Text>
            </Flex>
          </Button>
        </VStack>

        <VStack w="full" align="center" spaceX={4} my={12}>
          <Flex align="center" w="full">
            <Box flex="1" height="1px" bg="white" />
            <Box
              bg="white"
              px={3}
              borderRadius="full"
              mx={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              minW="40px"
              minH="32px"
            >
              <Text textAlign="center" color="#244d8a" fontWeight="bold">
                or
              </Text>
            </Box>
            <Box flex="1" height="1px" bg="white" />
          </Flex>
        </VStack>

        <Text
          width="full"
          textAlign="center"
          color="white"
          onClick={() => setFormDisplay("usernameLogin")}
          style={{ cursor: "pointer" }}
          _hover={{ textDecoration: "underline" }}
        >
          Log in with Username and Password
        </Text>
      </Box>
    </Flex>
  );
};

export default SSOLogin;
