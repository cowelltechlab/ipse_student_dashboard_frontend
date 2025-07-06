import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import useTutorStudentsById from "../../../../hooks/tutorStudents/useTutorStudentsById";

interface TutorDialogCurrentStudentsProps {
  tutorId: number;
}

const TutorDialogCurrentStudents = ({
  tutorId,
}: TutorDialogCurrentStudentsProps) => {
  const { tutorStudents, loading } = useTutorStudentsById(tutorId);

  if (loading) {
    return (
      <VStack>
        <Heading color={"#244d8a"}>Loading Current Students...</Heading>
        <Spinner size="xl" color="#244d8a" />
      </VStack>
    );
  }

  return (
    <VStack borderRadius="md" w="100%" align="center">
      <Heading mb={4} color="#244d8a">
        Current Students
      </Heading>

      {tutorStudents.length > 0 ? (
        <SimpleGrid columns={3} gap={6}>
          {tutorStudents.map((student) => (
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
                {student.student_name}
              </Heading>
              <Text>{student.student_year}</Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Box color="gray.500">No students assigned.</Box>
      )}

      <Button mt={6} bg={"#BD4F23"} color="white" w={"100%"}>
        Update Current Students
      </Button>
    </VStack>
  );
};

export default TutorDialogCurrentStudents;
