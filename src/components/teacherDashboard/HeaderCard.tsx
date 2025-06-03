import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { useAuth } from "../../contexts/useAuth";
import HomeIcon from "../../assets/Home Page.svg";

const HeaderCard = () => {
  const { firstName, lastName } = useAuth();

  return (
    <Box m={5} position="relative">
      {/* Main Banner Box */}
      <Box
        bg="#244d8a"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        zIndex={0}
        position="relative"
        overflow="visible"
      >
        <Heading color="white" fontSize="2xl" mb={2}>
          Hello {firstName} {lastName}
        </Heading>
        <Text color="white" fontSize="md">
          Let's make space for every story, celebrate every voice, and build a
          world where everyone belongs.
        </Text>
      </Box>

      {/* Overlaid Image */}
      <Image
        src={HomeIcon}
        alt="An illustration of a teacher with a student"
        position="absolute"
        top="0"
        right="0"
        transform="translate(0%, -30%)"
        width={{ base: "150px", md: "200px", lg: "400px" }}
        zIndex={1}
        pointerEvents="none"
      />
    </Box>
  );
};

export default HeaderCard;
