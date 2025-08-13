import {
  VStack,
} from "@chakra-ui/react";

import RichTextEditor from "../common/universal/EditableHTMLContentBox";

interface UpdatedAssignmentSectionProps {
  updatedAssignment: string;
  setUpdatedAssignment: (HTMLContent: string) => void;
}

const UpdatedAssignmentSection = ({
  updatedAssignment,
  setUpdatedAssignment,
}: UpdatedAssignmentSectionProps) => {
  return (
    <VStack>
      <RichTextEditor
        value={updatedAssignment || ""}
        onChange={(newHtml) => setUpdatedAssignment(newHtml)}
      />
    
    </VStack>
  );
};

export default UpdatedAssignmentSection;
