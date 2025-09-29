import { VStack } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import AssignmentDetailsTag from "./AssignmentDetailsTag";
import AssignmentDetailsDocLine from "./AssignmentDetailsDocLine";

interface AssignmentSectionProps {
  tagContent: string;
  assignment: AssignmentDetailType | null;
  downloadUrl?: string;
  children?: React.ReactNode; // allow custom buttons or actions
}

const AssignmentSection = ({
  tagContent,
  assignment,
  downloadUrl,
  children,
}: AssignmentSectionProps) => {
  return (
    <VStack align={"left"} mt={10} mx={10}>
      <AssignmentDetailsTag tagContent={tagContent} />

      <AssignmentDetailsDocLine
        assignment={assignment}
        fileName={assignment?.title}
        downloadUrl={downloadUrl}
      >
        {children}
      </AssignmentDetailsDocLine>
    </VStack>
  );
};

export default AssignmentSection;
