// file: AssignmentVersionHistoryTable.tsx

import { Box, Table, Text } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import AssignmentDetailsDocLine from "./AssignmentDetailsDocLine";
import AssignmentsVersionHistoryTableRowButtons from "./AssignmentVersionHistoryTableButtons";

interface AssignmentVersionHistoryTableProps {
  assignment: AssignmentDetailType | null;

  handleSelectVersionClick: (selectedVersionId: string) => void;
  finalizeVersion: (finalizedVersionDocumentId: string) => void;
}

const AssignmentVersionHistoryTable = ({
  assignment,
  handleSelectVersionClick,
  finalizeVersion,
}: AssignmentVersionHistoryTableProps) => {
  if (!assignment) {
    return <Text>No assignment data</Text>;
  }

  return (
    <Box overflowX="auto" p={6}>
      <Table.Root>
        <Table.Body>
          {assignment.versions.map((version) => (
            <Table.Row
              key={version.document_id}
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() => handleSelectVersionClick(version.document_id)}
            >
              <AssignmentDetailsDocLine
                assignment={assignment}
                versionNumber={`Version ${version.version_number}`}
              >
                <AssignmentsVersionHistoryTableRowButtons
                  fileName={assignment.title}
                  fileType={assignment.source_format}
                  handleVersionFinalization={() =>
                    version.version_number
                      ? finalizeVersion(version.document_id)
                      : () => {}
                  }
                />
              </AssignmentDetailsDocLine>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default AssignmentVersionHistoryTable;
