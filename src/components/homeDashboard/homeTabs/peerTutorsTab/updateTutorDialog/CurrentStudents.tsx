import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import type { StudentType } from "../../../../../types/StudentTypes";
import TextButton from "../../../../common/universal/TextButton";

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
        <SimpleGrid columns={3} gap={6}>
          {tutorStudents.map((student) => (
            <Box>
              <Box
                key={student.id}
                w="100%"
                bg={"white"}
                boxShadow="2px 2px 8px rgba(0, 0, 0, 0.55)"
                borderRadius="md"
                p={2}
                h="100%"
                minH="100px"
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

              <TextButton
                color="#bd4f23"
                onClick={() => handleRemoveStudent(Number(student.id))}
              >
                Remove Student
              </TextButton>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Box color="gray.500">No students assigned.</Box>
      )}
    </VStack>
  );
};

export default CurrentStudents;
