import { Box, Heading } from "@chakra-ui/react";
import StudentProfilePageStudentSummary from "../common/studentProfilePages/StudentSummaryHeaderCard";
import type { StudentProfileType } from "../../types/StudentTypes";
import StudentDocumentBody from "./studentDocumentsBody.tsx/StudentDocumentsBody";

interface StudentDocumentsPageContentProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
}

const StudentDocumentsPageContent = ({
  student,
  profileLoading,
}: StudentDocumentsPageContentProps) => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Student Documents
      </Heading>

      <StudentProfilePageStudentSummary
        student={student}
        profileLoading={profileLoading}
      />

      <StudentDocumentBody studentId={student?.student_id || null} />
    </Box>


  );
};

export default StudentDocumentsPageContent;
