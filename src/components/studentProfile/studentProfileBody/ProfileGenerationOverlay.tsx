import { Box, Text, VStack } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ProfileGenerationOverlay = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.8)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={6}>
        <DotLottieReact
          src="https://lottie.host/e2884197-ec9c-48f7-b5d9-c12f12330558/JaG9omssx9.lottie"
          loop
          autoplay
          style={{ width: "300px", height: "300px" }}
        />
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          color="white"
          textAlign="center"
          textShadow="2px 2px 4px rgba(0,0,0,0.5)"
        >
          Generating the perfect profile
        </Text>
        <Text
          fontSize="md"
          color="gray.300"
          textAlign="center"
          textShadow="1px 1px 2px rgba(0,0,0,0.5)"
        >
          This may take a few moments...
        </Text>
      </VStack>
    </Box>
  );
};

export default ProfileGenerationOverlay;