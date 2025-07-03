import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spacer,
  Spinner,
  VStack,
  HStack,
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
    <Flex direction="column" p={4} bg="white" borderRadius="md" w={"100%"} alignItems={"center"}>
      <Heading mb={4} color={"#244d8a"} >Current Students</Heading>

      {tutorStudents.length > 0 ? (
        tutorStudents.map((student) => (
          <HStack spaceY={2} key={student.id} mb={2} bg="gray.100" p={3} borderRadius="md" w={"100%"} alignItems="center">
            <Heading size="md">{student.student_name}</Heading>
            <Spacer />
            <Text>{student.student_year}</Text>
          </HStack>
        ))
      ) : (
        <Box color="gray.500">No students assigned.</Box>
      )}

      <Button mt={4} bg={"#244d8a"} color={"white"}>Update Current Students</Button>
    </Flex>
  );
};

export default TutorDialogCurrentStudents;
