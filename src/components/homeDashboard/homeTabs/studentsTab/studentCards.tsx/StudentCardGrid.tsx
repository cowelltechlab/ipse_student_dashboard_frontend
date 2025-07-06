import { SimpleGrid, Box, Text, Spinner } from "@chakra-ui/react";
import StudentCard from "./StudentCard";
import type { UserType } from "../../../../../types/UserTypes";
import type { ErrorType } from "../../../../../types/ErrorType";

interface StudentCardGridProps {
  searchTerm: string | null;
  yearName: string | null;

  loading: boolean;
  error: ErrorType | null;

  students?: UserType[];
  onStudentClick?: (studentId: number | null) => void;
}

const StudentCardGrid = ({
  searchTerm,
  loading,
  error,
  yearName,
  onStudentClick,
  students,
}: StudentCardGridProps) => {
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
        <Text color="red.500">Failed to load users.</Text>
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

  //   Filter users based on search term and year
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();

    const matchesSearch = fullName.includes(searchTerm?.toLowerCase() || "");
    const matchesYear = yearName
      ? student.student_profile?.year_name == yearName
      : true;
    return matchesSearch && matchesYear;
  });

  return (
    <SimpleGrid
      minChildWidth="320px"
      gap="40px"
      p={4}
      maxW={"1500px"}
      mx="auto"
    >
      {filteredStudents.map((student) => (
        <StudentCard
          key={student.id}
          firstName={student.first_name}
          lastName={student.last_name}
          classYear={student.student_profile?.year_name || null}
          profilePictureUrl={student.profile_picture_url}
          profile_tag={student.profile_tag || null}
          onClick={() =>
            onStudentClick?.(student.student_profile?.student_id || null)
          }
        />
      ))}
    </SimpleGrid>
  );
};

export default StudentCardGrid;
