import {
  Box,
  HStack,
  VStack,
  Text,
  Link,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { FaHeart} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="#244D8A"
      color="white"
      mt="10"
      py={8}
      px={6}
     
    >
      <Box maxW="1200px" mx="auto">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          gap={6}
        >
          {/* Left Section - About */}
          <VStack align={{ base: "center", md: "flex-start" }} gap={2} maxW="400px">
            <Text fontSize="lg" fontWeight="bold">
              MyChoice Dashboard
            </Text>
            <Text fontSize="sm" color="whiteAlpha.900" textAlign={{ base: "center", md: "left" }}>
              Empowering students through inclusive, personalized education and
              collaborative learning experiences.
            </Text>
          </VStack>

          {/* Middle Section - Quick Links */}
          <VStack align={{ base: "center", md: "flex-start" }} gap={2}>
            <Text fontSize="md" fontWeight="semibold" mb={1}>
              Quick Links
            </Text>
            <Link
              href="/dashboard"
              fontSize="sm"
              color="whiteAlpha.900"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              fontSize="sm"
              color="whiteAlpha.900"
              _hover={{ color: "white", textDecoration: "underline" }}
            >
              My Profile
            </Link>
          </VStack>

        
        </Stack>

        <Separator my={6} borderColor="whiteAlpha.400" />

        {/* Bottom Section - Copyright */}
        <VStack gap={2}>
          <HStack gap={1} justify="center" flexWrap="wrap">
            <Text fontSize="sm" color="whiteAlpha.900">
              Made with
            </Text>
            <FaHeart size={14} color="#BD4F23" />
            <Text fontSize="sm" color="whiteAlpha.900">
              by the
            </Text>
            <Link
              href="https://wellness.gatech.edu"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              color="white"
              fontWeight="semibold"
              _hover={{ color: "#BD4F23", textDecoration: "underline" }}
            >
              Collaborative Wellness Laboratory
            </Link>
          </HStack>
          <Text fontSize="sm" color="whiteAlpha.800">
            {currentYear} Georgia Institute of Technology.
          </Text>

        </VStack>
      </Box>
    </Box>
  );
};

export default Footer;
