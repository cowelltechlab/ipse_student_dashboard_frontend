import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Separator,
} from "@chakra-ui/react";
import StudentSummaryHeaderCard from "../common/studentProfilePages/StudentSummaryHeaderCard";
import type { StudentProfileType } from "../../types/StudentTypes";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import AssignmentDetailsBody from "./assignmentDetailsBody/AssignmentDetailsBody";
import AssignmentMetadataModal from "../common/assignments/AssignmentMetadataModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

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
  const [openAssignmentMenu, setOpenAssignmentMenu] = useState(false);

  const handleAssignmentMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default action and stop event propagation
    e.preventDefault();
    e.stopPropagation();

    setOpenAssignmentMenu(true);
  };

  return (
    <Box p={4}>
      <HStack justifyContent={"space-between"} mb={4}>
        <Heading fontSize="3xl" mb={2}>
          Assignment Details
        </Heading>
        <Button
          variant={"ghost"}
          padding={0}
          onClick={handleAssignmentMenuOpen}
        >
          <Icon size="md" >
            <GiHamburgerMenu />
          </Icon>
        </Button>
      </HStack>
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

      <AssignmentMetadataModal
        open={openAssignmentMenu}
        setOpen={() => setOpenAssignmentMenu(!openAssignmentMenu)}
        assignmentId={assignment?.assignment_id ?? null}
        studentId={student?.student_id}
        triggerAssignmentsRefetch={triggerRefetch}
      />
    </Box>
  );
};

export default AssignmentDetailsPageContent;
