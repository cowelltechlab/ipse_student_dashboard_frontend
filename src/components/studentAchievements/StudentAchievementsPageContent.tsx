import { Box, Heading, Separator } from "@chakra-ui/react";
import StudentPageCard from "../studentPage/StudentPageCard";
import type { StudentProfileType } from "../../types/StudentTypes";

interface StudentAchievementsPageContentProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
    triggerRefetch: () => void;

}

const StudentAchievementsPageContent = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentAchievementsPageContentProps) => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Achievements
      </Heading>
      <StudentPageCard
        student={student}
        profileLoading={profileLoading}
        triggerRefetch={triggerRefetch}
      />
      <Separator my={6} />
      
    </Box>
  );
};

export default StudentAchievementsPageContent;
