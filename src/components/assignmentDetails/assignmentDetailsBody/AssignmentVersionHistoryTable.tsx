import { Box, Table, Text, Heading, VStack, Separator } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import AssignmentDetailsDocLine from "./AssignmentDetailsDocLine";
import AssignmentsVersionHistoryTableRowButtons from "./AssignmentVersionHistoryTableButtons";
import useDownloadAssignmentVersion from "../../../hooks/assignmentVersions/useDownloadAssignmentVersion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { getDownloadBlob } = useDownloadAssignmentVersion();

  const handleViewDetails = (versionDocumentId: string) => {
    const studentId = assignment?.student.id;
    const assignmentId = assignment?.assignment_id;

    if (studentId && assignmentId) {
      navigate(
        `/student/${studentId}/assignment/${assignmentId}/version/${versionDocumentId}`
      );
    }
  };

  const handleDownload = async (
    version_document_id: string,
    fileName: string,
    studentFirstName: string,
    studentLastName: string,
    dateModified: string,
  ) => {
    if (!version_document_id) {
      throw new Error("No document_id provided for version.");
    }

    try {
      const blob = await getDownloadBlob(version_document_id);

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}_${studentFirstName}_${studentLastName}_${dateModified}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading version:", error);
      throw new Error("Failed to download version document.");
    }
  };

  // Group versions by modifier role
  const groupVersionsByRole = (versions: AssignmentDetailType["versions"]) => {
    const roleOrder = ["Admin", "Student", "Peer Tutor", "Advisor"];
    const grouped: Record<string, typeof versions> = {};

    versions.forEach((version) => {
      const role = version.modifier_role || "Other";
      if (!grouped[role]) {
        grouped[role] = [];
      }
      grouped[role].push(version);
    });

    // Sort groups by role priority
    const sortedGroups: Array<{ role: string; versions: typeof versions }> = [];

    roleOrder.forEach((role) => {
      if (grouped[role] && grouped[role].length > 0) {
        sortedGroups.push({ role, versions: grouped[role] });
      }
    });

    // Add any remaining roles not in the priority list
    Object.keys(grouped).forEach((role) => {
      if (!roleOrder.includes(role) && grouped[role].length > 0) {
        sortedGroups.push({ role, versions: grouped[role] });
      }
    });

    return sortedGroups;
  };

  if (!assignment) {
    return <Text>No assignment data</Text>;
  }

  const groupedVersions = groupVersionsByRole(assignment.versions);

  return (
    <Box overflowX="auto" p={6}>
      <VStack align="stretch" gap={6}>
        {groupedVersions.map(({ role, versions }) => (
          <Box key={role}>
            <Heading size="md" color="#244d8a" mb={3}>
              Modified by {role}
            </Heading>
            <Table.Root>
              <Table.Body>
                {versions.map((version) => (
                  <Table.Row
                    key={version.document_id}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() =>
                      handleSelectVersionClick(version.document_id)
                    }
                  >
                    <Table.Cell>
                      <AssignmentDetailsDocLine
                        assignment={assignment}
                        versionNumber={`Version ${version.version_number}`}
                        dateModified={version.date_modified}
                      >
                        <AssignmentsVersionHistoryTableRowButtons
                          fileName={assignment.title}
                          fileType={assignment.source_format}
                          onDownload={() =>
                            handleDownload(
                              version.document_id,
                              assignment.title,
                              assignment.student.first_name,
                              assignment.student.last_name,
                              version.date_modified ||
                                assignment.date_modified ||
                                assignment.date_created
                            )
                          }
                          handleVersionFinalization={() =>
                            version.version_number
                              ? finalizeVersion(version.document_id)
                              : () => {}
                          }
                          onViewDetails={() =>
                            handleViewDetails(version.document_id)
                          }
                        />
                      </AssignmentDetailsDocLine>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            {/* Add separator between role groups, except for the last one */}
            {groupedVersions.indexOf(
              groupedVersions.find((g) => g.role === role)!
            ) <
              groupedVersions.length - 1 && <Separator my={4} />}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AssignmentVersionHistoryTable;
