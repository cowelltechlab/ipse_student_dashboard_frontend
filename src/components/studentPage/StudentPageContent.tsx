import { Box, Heading } from "@chakra-ui/react";
import StudentPageCard from "./StudentPageCard";
import type { StudentProfileType } from "../../types/StudentTypes";

interface StudentPageContentProps {
  student: StudentProfileType | null;
}

const StudentPageContent = ({ student }: StudentPageContentProps) => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Dashboard
      </Heading>
      <StudentPageCard student={student}/>
    </Box>
  );
};

export default StudentPageContent;
