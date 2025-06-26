import {
  Box,
  Image,
  Text,
  Heading,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaTasks, FaGraduationCap } from "react-icons/fa";
import { SiTarget } from "react-icons/si";

import defaultProfileImage from "../../assets/default_profile_picture.jpg";

const StudentPageCard = () => {
  return (
    <HStack
      w="100%"
      align="start"
      spaceX={6}
      p={6}
      bg="blue.800"
      color="white"
      borderRadius="lg"
    >
      {/* Profile Image */}
      <Box flexShrink={0}>
        <Image
          src={defaultProfileImage}
          alt="Student Image"
          borderRadius="md"
          boxSize="280px"
          objectFit="cover"
        />
      </Box>

      {/* Right Content */}
      <VStack align="start" spaceX={4} flex={1}>
        {/* Name and Year */}
        <Heading size="lg">Jane Smith</Heading>
        <HStack spaceX={4}>
          <Box
            bg="white"
            color="black"
            px={3}
            py={1}
            borderRadius="md"
            fontWeight="bold"
          >
            Year: Sophomore
          </Box>
          <Box
            bg="white"
            color="black"
            px={3}
            py={1}
            borderRadius="md"
            fontWeight="bold"
          >
            Inclusive Classes: HCI, Information Viz, Health & Hygiene
          </Box>
        </HStack>

        {/* Skill Summary */}
        <Box>
          <HStack mb={1}>
            <Icon as={FaChalkboardTeacher} />
            <Text fontWeight="bold">Skill Summary</Text>
          </HStack>
          <Text>Motivated, organized, quick to adapt.</Text>
        </Box>

        {/* Best Way to Assist */}
        <Box>
          <HStack mb={1}>
            <Icon as={FaTasks} />
            <Text fontWeight="bold">Best Way to assist me is:</Text>
          </HStack>
          <Text>
            Simplify tasks, provide clear instructions, and use visual aids.
          </Text>
        </Box>

        {/* Goals */}
        <Box>
          <HStack mb={1}>
            <Icon as={FaGraduationCap} />
            <Text fontWeight="bold">After college I want to:</Text>
          </HStack>
          <Text>Live independently and manage personal responsibilities.</Text>
        </Box>

        <Box>
          <HStack mb={1}>
            <Icon as={SiTarget} />
            <Text fontWeight="bold">Currently I want to achieve:</Text>
          </HStack>
          <Text>Improve time management and build confidence in tasks.</Text>
        </Box>
      </VStack>
    </HStack>
  );
};

export default StudentPageCard;
