import { Accordion, Span } from "@chakra-ui/react";
import AssignmentPreviews from "../assignmentDetails/assignmentDetailsBody/AssignmentPreviews";
import type { AssignmentVersionData } from "../../types/AssignmentVersionTypes";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import { buildModifiedHtml } from "../../utils/assignmentHtml";

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
  const title = "Document Information";

  return (
    <Accordion.Item key={title} value={title}>
      <Accordion.ItemTrigger bg={"#244d8a"} padding={2} fontWeight="bold" color="white" fontSize={"2xl"}>
        <Span flex="1">{title}</Span>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent bg="#white" padding={2}>
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
