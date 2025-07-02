import { Box, Heading, Separator } from "@chakra-ui/react";
import useTutorStudentsById from "../../../../hooks/tutorStudents/useTutorStudentsById";

interface TutorDialogCurrentStudentsProps {
  tutorId: number;
}

const TutorDialogCurrentStudents = ({
  tutorId,
}: TutorDialogCurrentStudentsProps) => {
  const { tutorStudents } = useTutorStudentsById(tutorId);

  return (
    <Box>
      <Heading color={"#244d8a"}>Current Students</Heading>

      <Separator orientation="horizontal" mb={4} />

      {tutorStudents.length > 0 ? (
        tutorStudents.map((student) => (
          <Box key={student.id} mb={2}>
            <Heading size="md">
              {student.student_name} (ID: {student.student_id})
            </Heading>
          </Box>
        ))
      ) : (
        <Box color="gray.500">No current students assigned.</Box>
      )}
    </Box>
  );
};

export default TutorDialogCurrentStudents;
