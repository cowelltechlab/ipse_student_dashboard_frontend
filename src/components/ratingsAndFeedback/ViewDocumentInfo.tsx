import { Accordion, Span } from "@chakra-ui/react";
import AssignmentPreviews from "../assignmentDetails/assignmentDetailsBody/AssignmentPreviews";
import type { AssignmentVersionData } from "../../types/AssignmentVersionTypes";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import { buildModifiedHtml } from "../../utils/assignmentHtml";
import { useEffect } from "react";

interface ViewDocumentInfoProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
  assignmentVersion: AssignmentVersionData | null;
  assignmentVersionLoading: boolean;
}

const ViewDocumentInfo = ({
  assignment,
  assignmentLoading,
  assignmentVersion,
  assignmentVersionLoading,
}: ViewDocumentInfoProps) => {
  const title = "View Document Information";

  useEffect (() => {
    console.log("Assignment Version in ViewDocumentInfo: ", assignmentVersion);
  }, [assignmentVersion]);

  return (
    <Accordion.Item
      key={title}
      value={title}
      my={10}
      border="1px solid #ccc"
      borderRadius="8px"
      overflow="hidden"
    >
      <Accordion.ItemTrigger
        bg={"#244d8a"}
        padding={2}
        fontWeight="bold"
        color="white"
        p={4}
        fontSize={"4xl"}
      >
        <Span flex="1">{title}</Span>
        <Accordion.ItemIndicator color={"white"} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent bg="#white" p={4}>
        <Accordion.ItemBody>
          <AssignmentPreviews
            assignment={assignment}
            assignmentLoading={assignmentLoading}
            selectedVersionHTML={buildModifiedHtml(assignmentVersion)}
            selectedVersionLoading={assignmentVersionLoading}
            isFinalizedVersion={true} // <- always true for rating and feedback
          />
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default ViewDocumentInfo;
