import { Box, Heading } from "@chakra-ui/react";
import type { StudentProfileType } from "../../types/StudentTypes";
import StudentSummaryHeaderCard from "../common/studentProfilePages/StudentSummaryHeaderCard";
import StudentProfileBody from "./studentProfileBody/StudentProfileBody";

interface StudentProfilePageContentProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

const StudentProfilePageContent = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentProfilePageContentProps) => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Student Profile
      </Heading>

      <StudentSummaryHeaderCard
        student={student}
        profileLoading={profileLoading}
      />

      <StudentProfileBody
        student={student}
        profileLoading={profileLoading}
        triggerRefetch={triggerRefetch}
      />
    </Box>
  );
};

export default StudentProfilePageContent;
