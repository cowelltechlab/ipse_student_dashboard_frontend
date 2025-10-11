import { Box, Grid, Skeleton, Alert } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAssignmentVersionByDocId from "../../hooks/assignmentVersions/useGetAssignmentVersionByDocId";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import OriginalAssignmentSection from "../assignmentModification/OriginalAssignmentSection";
import AssignmentModificationVisibilityButtons from "../assignmentModification/AssignmentModificationVisibilityButtons";
import HtmlContentBox from "../common/universal/HTMLContentDisplay";
import VersionOptionsDisplaySection from "./VersionOptionsDisplaySection";
import { buildModifiedHtml } from "../../utils/assignmentHtml";
import TextButton from "../common/universal/TextButton";

interface AssignmentVersionDetailsPageContentProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
  studentId: string | undefined;
  assignmentId: string | undefined;
  versionDocumentId: string | null;
}

const AssignmentVersionDetailsPageContent = ({
  assignment,
  assignmentLoading,
  studentId,
  assignmentId,
  versionDocumentId,
}: AssignmentVersionDetailsPageContentProps) => {
  const navigate = useNavigate();

  const [isOriginalVisible, setIsOriginalVisible] = useState(true);
  const [isOptionsVisible, setIsOptionsVisible] = useState(true);
  const [isNewVisible, setIsNewVisible] = useState(true);

  const toggleOriginalVisibility = () => setIsOriginalVisible(!isOriginalVisible);
  const toggleVersionOptionsVisibility = () => setIsOptionsVisible(!isOptionsVisible);
  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible);

  const { assignmentVersion, loading: versionLoading } =
    useGetAssignmentVersionByDocId(versionDocumentId);

  const isLoading = assignmentLoading || versionLoading;

  const handleChangeAssignment = () => {
    if (studentId && assignmentId) {
      navigate(
        `/student/${studentId}/assignment/${assignmentId}/modify-assignment`
      );
    }
  };

  // Build the HTML content from structured data or fallback to legacy
  const generatedHtml = assignmentVersion
    ? buildModifiedHtml(assignmentVersion)
    : "";

  if (isLoading) {
    return (
      <Box p={6} maxW="1800px" mx="auto">
        <Skeleton height="40px" width="200px" mb={4} />
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={4}
          alignItems="start"
          mb={4}
        >
          <Skeleton height="400px" />
          <Skeleton height="400px" />
          <Skeleton height="400px" />
        </Grid>
      </Box>
    );
  }

  if (!assignment || !assignmentVersion) {
    return (
      <Box p={6} maxW="1800px" mx="auto">
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Error Loading Version Details</Alert.Title>
            <Alert.Description>
              Could not load assignment version details. Please try again.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1800px" mx="auto">
      {/* Header with visibility toggles and Change Assignment button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <AssignmentModificationVisibilityButtons
          isOriginalVisible={isOriginalVisible}
          isOptionsVisible={isOptionsVisible}
          isNewVisible={isNewVisible}
          toggleOriginalVisibility={toggleOriginalVisibility}
          toggleVersionOptionsVisibility={toggleVersionOptionsVisibility}
          toggleNewVisibility={toggleNewVisibility}
        />
        <TextButton color="#bd4f23" onClick={handleChangeAssignment}>
          Change Assignment
        </TextButton>
      </Box>

      {/* Three-column layout */}
      <Grid
        templateColumns={`${isOriginalVisible ? "1fr" : "0fr"} ${isOptionsVisible ? "1fr" : "0fr"} ${isNewVisible ? "1fr" : "0fr"}`}
        gap={4}
        alignItems="start"
      >
        {/* Column 1: Original Assignment */}
        {isOriginalVisible && (
          <Box>
            <OriginalAssignmentSection
              originalAssignmentHTML={assignment.html_content}
              assignmentLoading={assignmentLoading}
            />
          </Box>
        )}

        {/* Column 2: Selected Options & Comments */}
        {isOptionsVisible && (
          <Box>
            <VersionOptionsDisplaySection
              generatedOptions={assignmentVersion.generated_options || []}
              selectedOptions={assignmentVersion.selected_options || []}
              additionalSuggestions={
                assignmentVersion.additional_edit_suggestions ||
                assignmentVersion.extra_ideas_for_changes ||
                ""
              }
              skillsForSuccess={assignmentVersion.skills_for_success || ""}
            />
          </Box>
        )}

        {/* Column 3: Generated Content */}
        {isNewVisible && (
          <Box>
            <HtmlContentBox
              htmlContent={generatedHtml || ""}
            />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default AssignmentVersionDetailsPageContent;
