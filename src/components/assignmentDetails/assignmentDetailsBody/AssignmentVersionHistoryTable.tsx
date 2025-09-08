// file: AssignmentVersionHistoryTable.tsx

import { Box, Table, Text } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import AssignmentDetailsDocLine from "./AssignmentDetailsDocLine";
import AssignmentsVersionHistoryTableRowButtons from "./AssignmentVersionHistoryTableButtons";
import useDownloadAssignmentVersion from "../../../hooks/assignmentVersions/useDownloadAssignmentVersion";

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
  const { getDownloadBlob } = useDownloadAssignmentVersion();

  const handleDownload = async (version_document_id: string, fileName: string) => {
    if (!version_document_id) {
      throw new Error("No document_id provided for version.");
    }

    try {
      const blob = await getDownloadBlob(version_document_id);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading version:", error);
      throw new Error("Failed to download version document.");
    }
  };

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
                  onDownload={() => handleDownload(version.document_id, assignment.title)}
                  
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
