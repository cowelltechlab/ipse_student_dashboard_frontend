import { VStack } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import AssignmentDetailsTag from "./AssignmentDetailsTag";
import AssignmentDetailsDocLine from "./AssignmentDetailsDocLine";

interface AssignmentSectionProps {
    tagContent: string
  assignment: AssignmentDetailType | null;
  downloadUrl?: string
}

const AssignmentSection = ({
    tagContent,
  assignment,
  downloadUrl
}: AssignmentSectionProps) => {
  return (
    <VStack align={"left"} mt={10} mx={10}>
      <AssignmentDetailsTag tagContent={tagContent} />

      <AssignmentDetailsDocLine
        assignment={assignment}
        fileName={assignment?.title}
        downloadUrl={downloadUrl}
      />
    </VStack>
  );
};

export default AssignmentSection;
