import { Box, Heading } from "@chakra-ui/react";
import StudentProfilePageStudentSummary from "../common/studentProfilePages/StudentSummaryHeaderCard";
import type { StudentProfileType } from "../../types/StudentTypes";

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
        Documents
      </Heading>

      <StudentProfilePageStudentSummary
        student={student}
        profileLoading={profileLoading}
      />
    </Box>

    
  );
};

export default StudentDocumentsPageContent;
