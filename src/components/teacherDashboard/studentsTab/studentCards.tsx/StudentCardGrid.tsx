import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import useStudents from "../../../../hooks/students/useStudents";
import StudentCard from "./StudentCard";

interface StudentCardGridProps {
  searchTerm: string | null;
  year_id: number | null;
  onStudentClick?: (studentId: string) => void;
}

const StudentCardGrid = ({
  searchTerm,
  year_id,
  onStudentClick,
}: StudentCardGridProps) => {
  const { students, loading, error } = useStudents(searchTerm, year_id);

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
      minChildWidth="320px"
      gap="40px"
      p={4}
      maxW={"1500px"}
      mx="auto"
    >
      {students.map((student) => (
        <StudentCard
          key={student.id}
          firstName={student.first_name}
          lastName={student.last_name}
          classYear={student.class_year}
          profilePictureUrl={student.profile_picture_url}
          onClick={() => onStudentClick?.(student.id)}
        />
      ))}
    </SimpleGrid>
  );
};

export default StudentCardGrid;
