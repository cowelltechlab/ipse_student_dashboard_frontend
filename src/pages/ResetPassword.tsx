import { Box, Flex, Image, Text } from "@chakra-ui/react";

import loginImage from "../assets/Login.svg";
import ResetPasswordForm from "../components/passwordReset/ResetPasswordForm";

const ResetPassword = () => {
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
        <ResetPasswordForm />
      </Box>
    </Flex>
  );
};

export default ResetPassword;
