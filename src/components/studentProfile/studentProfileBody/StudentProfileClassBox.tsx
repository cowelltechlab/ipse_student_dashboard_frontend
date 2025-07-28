import { Box, HStack, Spacer, Text } from "@chakra-ui/react";

import type { StudentProfileClassType } from "../../../types/ClassTypes";

interface StudentProfileClassBoxProps {
  studentClass: StudentProfileClassType;
}

const StudentProfileClassBox = ({
  studentClass,
}: StudentProfileClassBoxProps) => {
  return (
    <Box
      border="1px solid #e2e8f0"
      borderRadius="lg"
      p={4}
      mt={3}
      w="100%"
      bg="white"
      boxShadow="sm"
    >
      <HStack
        justify="space-between"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        gap={4}
        align="center"
      >
        {/* Course code badge */}
        <Box
          bg="#244d8a"
          color="white"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="xl"
          whiteSpace="nowrap"
        >
          {studentClass.course_code}
        </Box>

        {/* Class name */}
        <Box flex={1} fontWeight="semibold">
          {studentClass.class_name}
        </Box>

        <Box display={{ base: "none", md: "block" }}>
          <Spacer />
        </Box>

        {/* Learning goal */}
        <HStack textAlign={{ base: "left", md: "right" }}>
          <Text fontWeight={"bold"}> Learning Goal:</Text>
          <Text fontStyle="italic" color="gray.600">
            {studentClass.learning_goal}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default StudentProfileClassBox;
