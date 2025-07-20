import { useState } from "react";
import { Box, Text, Spinner, Wrap, VStack } from "@chakra-ui/react";
import StudentCard from "./StudentCard";
import type { UserType } from "../../../../../types/UserTypes";
import type { ErrorType } from "../../../../../types/ErrorType";
import TextButton from "../../../../common/universal/TextButton";

interface StudentCardGridProps {
  searchTerm: string | null;
  yearName: string | null;
  loading: boolean;
  error: ErrorType | null;
  students?: UserType[];
  onStudentClick?: (
    studentId: number | null,
    userId: number,
    profileTag: string | null
  ) => void;
}

const StudentCardGrid = ({
  searchTerm,
  loading,
  error,
  yearName,
  onStudentClick,
  students,
}: StudentCardGridProps) => {
  const [visibleCount, setVisibleCount] = useState(15);

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

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm?.toLowerCase() || "");
    const matchesYear = yearName
      ? student.student_profile?.year_name === yearName
      : true;
    return matchesSearch && matchesYear;
  });

  const studentsToShow = filteredStudents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudents.length;

  return (
    <VStack>
      <Wrap gap="40px" p={4} maxW={"1800px"} mx="auto" justify="center">
        {studentsToShow.map((student) => (
          <StudentCard
            key={student.id}
            firstName={student.first_name}
            lastName={student.last_name}
            classYear={student.student_profile?.year_name || null}
            profilePictureUrl={student.profile_picture_url}
            profile_tag={student.profile_tag || null}
            onClick={() => {
              const sid = student.student_profile?.student_id ?? null;
              const tag = student.profile_tag ?? null;
              onStudentClick?.(sid, student.id, tag);
            }}
          />
        ))}
      </Wrap>

      {hasMore && (
        <TextButton
          color="#bd4f23"
          onClick={() => setVisibleCount((prev) => prev + 10)}
        >
          View 10 More
        </TextButton>
      )}
    </VStack>
  );
};

export default StudentCardGrid;
