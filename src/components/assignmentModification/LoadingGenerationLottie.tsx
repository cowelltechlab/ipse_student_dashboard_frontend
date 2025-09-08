import { Box, Text } from "@chakra-ui/react";
// import DOMPurify from 'dompurify'; // optional
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


const LoadingGenerationLottie = () => {
  return (
    <Box textAlign="center" py={8} px={4}>
      <DotLottieReact
        src="https://lottie.host/749207af-f4b1-47e3-8768-449bb1d7e5c5/66y1ECtWZR.lottie"
        loop
        autoplay
        height="100px"
      />
      <Text fontSize="lg" fontWeight="semibold" color="gray.700" mt={4}>
        Generating the Ideal Modified Assignment
      </Text>
      <Text fontSize="sm" color="gray.500" mt={1}>
        This may take a few moments...
      </Text>
    </Box>
  );
};

export default LoadingGenerationLottie;