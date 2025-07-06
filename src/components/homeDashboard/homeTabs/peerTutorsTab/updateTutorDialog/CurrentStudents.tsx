import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { StudentType } from "../../../../../types/StudentTypes";
import TextButton from "../../../../common/universal/TextButton";
import { IoMdRemoveCircle } from "react-icons/io";

interface CurrentStudentsProps {
  tutorStudents: StudentType[];
  handleRemoveStudent: (studentId: number) => void;
}

const CurrentStudents = ({
  tutorStudents,
  handleRemoveStudent,
}: CurrentStudentsProps) => {
  return (
    <VStack borderRadius="md" w="100%" align="center">
      <Heading mb={4} color="#244d8a">
        Current Students
      </Heading>

      {tutorStudents.length > 0 ? (
        <Wrap justify="center" w="100%">
          {tutorStudents.map((student) => (
            <WrapItem
              key={student.id}
              flexDirection="column"
              alignItems="center"
              mt={6}
            >
              <Box
                bg="white"
                boxShadow="2px 2px 8px rgba(0, 0, 0, 0.55)"
                borderRadius="md"
                p={4}
                mx={2}
                minW="220px"
                maxW="250px"
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md" textAlign="center">
                  {student.first_name} {student.last_name}
                </Heading>
                <Text>{student.year_name}</Text>
              </Box>

              <HStack mt={2}>
                <IoMdRemoveCircle color="#bd4f23" />

                <TextButton
                  color="#bd4f23"
                  onClick={() => handleRemoveStudent(Number(student.id))}
                >
                  Remove Student
                </TextButton>
              </HStack>
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Box color="gray.500">No students assigned.</Box>
      )}
    </VStack>
  );
};

export default CurrentStudents;
