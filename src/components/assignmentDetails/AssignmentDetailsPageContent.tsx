import { Box, Heading, Separator } from "@chakra-ui/react";
import StudentSummaryHeaderCard from "../common/studentProfilePages/StudentSummaryHeaderCard";
import type { StudentProfileType } from "../../types/StudentTypes";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import AssignmentDetailsBody from "./assignmentDetailsBody/AssignmentDetailsBody";

interface AssignmentDetailsPageContentProps {
  student: StudentProfileType | null;
  assignment: AssignmentDetailType | null;
  profileLoading: boolean;
  assignmentLoading: boolean;
  triggerRefetch: () => void;
}

const AssignmentDetailsPageContent = ({
  student,
  assignment,
  profileLoading,
  assignmentLoading,
  triggerRefetch,
}: AssignmentDetailsPageContentProps) => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Assignment Details
      </Heading>
      <StudentSummaryHeaderCard
        student={student}
        profileLoading={profileLoading}
      />
      <Separator my={6} />
      <AssignmentDetailsBody
        assignment={assignment}
        assignmentLoading={assignmentLoading}
        triggerRefetch={triggerRefetch}
      />
    </Box>
  );
};

export default AssignmentDetailsPageContent;
