import { Box, Heading } from "@chakra-ui/react";
import StudentPageCard from "./StudentPageCard";
import type { StudentProfileType } from "../../types/StudentTypes";

interface StudentPageContentProps {
  student: StudentProfileType | null;
  profileLoading: boolean
  triggerRefetch: () => void
}

const StudentPageContent = ({ student, profileLoading, triggerRefetch }: StudentPageContentProps) => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Dashboard
      </Heading>
      <StudentPageCard student={student} profileLoading={profileLoading} triggerRefetch={triggerRefetch}/>
    </Box>
  );
};

export default StudentPageContent;
