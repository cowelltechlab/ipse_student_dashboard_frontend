import {
  Wrap,
  Box,
  Spinner,
  Text,
  WrapItem,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import type { UserType } from "../../../types/UserTypes";
import type { ErrorType } from "../../../types/ErrorType";
import TextButton from "../../common/universal/TextButton";

interface StudentCardGridProps {
  yearName: string | null;
  loading: boolean;
  error: ErrorType | null;
  selectedStudentIds: Set<number>;
  students: UserType[];
  onStudentClick: (studentId: number | null) => void;
}

const CreateAssignmentStudentCardGrid = ({
  yearName,
  loading,
  error,
  selectedStudentIds,
  students,
  onStudentClick,
}: StudentCardGridProps) => {
  const [visibleCount, setVisibleCount] = useState(15);

  const filteredStudents = students.filter((student) => {
    const matchesYear = yearName
      ? student.student_profile?.year_name === yearName
      : true;
    return matchesYear;
  });

  const studentsToShow = filteredStudents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudents.length;

  if (loading) {
    return (
      <VStack textAlign="center" py={10} w={"100%"}>
        <Spinner size="xl" />
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack textAlign="center" py={10}>
        <Text color="red.500">Failed to load students.</Text>
      </VStack>
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
    <VStack w={"100%"}>
      {filteredStudents.length > 0 ? (
        <Wrap  p={4} mx="auto" justify="center">
          {studentsToShow.map((student) => (
            <WrapItem key={student.student_profile?.student_id}>
              <Box
                onClick={() => onStudentClick(Number(student.student_profile?.student_id))}
                bg={
                  selectedStudentIds.has(Number(student.student_profile?.student_id))
                    ? "#f2c5b5"
                    : "white"
                }
                boxShadow="2px 2px 8px rgba(0, 0, 0, 0.55)"
                borderRadius="md"
                p={4}
                m={3}
                minW="220px"
                maxW="250px"
                cursor="pointer"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Heading size="md" textAlign="center" color="black">
                  {student.first_name} {student.last_name}
                </Heading>
                <Text color="black">
                  {student.student_profile?.year_name || null}
                </Text>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Box color="gray.500">No students found.</Box>
      )}

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

export default CreateAssignmentStudentCardGrid;
