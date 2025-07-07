import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import useStudents from "../../../hooks/students/useStudents";
import CreateAssignmentStudentCard from "./CreateAssignmentStudentCard";

interface StudentCardGridProps {
  year_id: number | null;
  onStudentClick?: (studentId: string) => void;
}

const CreateAssignmentStudentCardGrid = ({
  year_id,
  onStudentClick,
}: StudentCardGridProps) => {
  // TODO: break into chunks of 20-24
  const { students, loading, error } = useStudents("", year_id);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Failed to load students.</Text>
      </Box>
    );
  }

  if (!students || students.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No students found.</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid
      minChildWidth="120px"
      gap="20px"
      p={1}
      maxW="100%"
      mx="auto"
    >
      {students.map((student) => (
        <CreateAssignmentStudentCard
          key={student.id}
          firstName={student.first_name}
          lastName={student.last_name}
          classYear={student.year_name}
          onClick={() => onStudentClick?.(student.id)}
        />
      ))}
    </SimpleGrid>
  );
};

export default CreateAssignmentStudentCardGrid;
