import {
  Box,
  Text,
  Heading,
  HStack,
  VStack,
  Icon,
  Spacer,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaTasks, FaGraduationCap } from "react-icons/fa";
import { SiTarget } from "react-icons/si";

import type { StudentProfileType } from "../../types/StudentTypes";
import { BsStars } from "react-icons/bs";
import ProfileImageSection from "./ProfileImageSection";

interface StudentPageCardProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

const StudentPageCard = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentPageCardProps) => {
  return (
    <Stack
      w="100%"
      direction={{ base: "column", md: "row" }}
      spaceY={{ base: 4, md: 0 }}
      align="stretch"
      color="white"
      borderRadius="lg"
    >
      {/* Profile Image */}
      <ProfileImageSection
        studentId={student?.student_id}
        profilePictureUrl={student?.profile_picture_url}
        imageLoading={profileLoading}
        triggerRefetch={triggerRefetch}
      />

      {/* Right Content */}
      <VStack
        align="start"
        spaceY={2}
        flex={1}
        bg="#244d8a"
        borderRadius="lg"
        p={6}
      >
        {/* Name and Year */}
        <HStack w="100%">
          <Heading size="2xl">
            {student?.first_name} {student?.last_name}
          </Heading>
          <Spacer />
          <HStack bg="white" color="#244d8a" px={3} py={1} borderRadius="full">
            <BsStars color="#244d8a" />
            Generated by AI
          </HStack>
        </HStack>

        <HStack spaceX={4}>
          <Box bg="white" color="black" px={3} py={1} borderRadius="xl">
            Year: <b>{student?.year_name}</b>
          </Box>
          <Box bg="white" color="black" px={3} py={1} borderRadius="xl">
            Classes:{" "}
            <Text as="span" fontWeight="bold">
              {student?.classes.map((c) => c.class_name).join(", ")}
            </Text>
          </Box>
        </HStack>

        {/* Vision Statement (Full width) */}
        <Box w="100%">
          <HStack mb={1}>
            <Icon as={FaChalkboardTeacher} />
            <Text fontWeight="bold">Vision Statement</Text>
          </HStack>
          <Text>{student?.profile_summaries.vision}</Text>
        </Box>

        {/* Grid for 4 remaining sections */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="100%">
          <Box>
            <HStack mb={1}>
              <Icon as={FaChalkboardTeacher} />
              <Text fontWeight="bold">Skill Summary</Text>
            </HStack>
            <Text>{student?.profile_summaries.strengths_short}</Text>
          </Box>

          <Box>
            <HStack mb={1}>
              <Icon as={FaTasks} />
              <Text fontWeight="bold">Best Way to assist me is:</Text>
            </HStack>
            <Text>{student?.profile_summaries.best_ways_to_help}</Text>
          </Box>

          <Box>
            <HStack mb={1}>
              <Icon as={FaGraduationCap} />
              <Text fontWeight="bold">After college I want to:</Text>
            </HStack>
            <Text>{student?.profile_summaries.long_term_goals}</Text>
          </Box>

          <Box>
            <HStack mb={1}>
              <Icon as={SiTarget} />
              <Text fontWeight="bold">Currently I want to achieve:</Text>
            </HStack>
            <Text>{student?.profile_summaries.short_term_goals}</Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Stack>
  );
};

export default StudentPageCard;
