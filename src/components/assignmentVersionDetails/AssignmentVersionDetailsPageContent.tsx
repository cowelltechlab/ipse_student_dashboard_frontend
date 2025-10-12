import {
  Box,
  Grid,
  Skeleton,
  Alert,
  Flex,
  Image,
  Heading,
  Button,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAssignmentVersionByDocId from "../../hooks/assignmentVersions/useGetAssignmentVersionByDocId";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import OriginalAssignmentSection from "../assignmentModification/OriginalAssignmentSection";
import AssignmentModificationVisibilityButtons from "../assignmentModification/AssignmentModificationVisibilityButtons";
import HtmlContentBox from "../common/universal/HTMLContentDisplay";
import VersionOptionsDisplaySection from "./VersionOptionsDisplaySection";
import { buildModifiedHtml } from "../../utils/assignmentHtml";
import SingleHTMLEditor from "../assignmentModification/SingleHTMLEditor";
import usePutAssignmentVersion from "../../hooks/assignmentVersions/usePutAssignmentVersion";
import { toaster } from "../ui/toaster";
import AssignmentModificationCompletionDialog from "../assignmentModification/AssignmentModificationCompletionDialog";
import { sanitizeForSave } from "../../utils/sanitizeForSave";

import modifiedAssignmentIcon from "../../assets/icons/note.png";
import { BsStars } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

import viewIcon from "../../assets/icons/research.png";
import finalizedIcon from "../../assets/icons/user.png";

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

  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState<string | null>(null);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const toggleOriginalVisibility = () =>
    setIsOriginalVisible(!isOriginalVisible);
  const toggleVersionOptionsVisibility = () =>
    setIsOptionsVisible(!isOptionsVisible);
  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible);

  const { assignmentVersion, loading: versionLoading } =
    useGetAssignmentVersionByDocId(versionDocumentId, refetchTrigger);

  const { handlePutAssignmentVersion, loading: loadingAssignmentUpdate } =
    usePutAssignmentVersion();

  const isLoading = assignmentLoading || versionLoading;

  const handleChangeAssignment = () => {
    if (studentId && assignmentId) {
      navigate(`/student/${studentId}/assignment/${assignmentId}/modification`);
    }
  };

  const handleGenerateWithOptions = () => {
    if (studentId && assignmentId && versionDocumentId) {
      navigate(
        `/student/${studentId}/assignment/${assignmentId}/modification?from_version=${versionDocumentId}`
      );
    }
  };

  // Build the HTML content from structured data or fallback to legacy
  const generatedHtml = assignmentVersion
    ? buildModifiedHtml(assignmentVersion)
    : "";

  // Can only edit if assignment has NOT been rated (regardless of finalization status)
  // An assignment is considered "rated" if it has any rating status other than "not_rated"
  const needsRating =
    (assignment?.rating_status === "Pending" && assignment.finalized) ||
    assignment?.rating_status === "Partially Rated";
  const canEdit = needsRating;

  const handleEditClick = () => {
    if (!canEdit) {
      toaster.create({
        description: "Cannot edit a rated assignment version.",
        type: "warning",
      });
      return;
    }
    setEditedHtml(generatedHtml);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedHtml(null);
  };

  const handleSaveChanges = async () => {
    if (!versionDocumentId) {
      toaster.create({
        description: "No version document ID available.",
        type: "warning",
      });
      return;
    }
    if (!editedHtml) {
      toaster.create({
        description: "Nothing to save.",
        type: "warning",
      });
      return;
    }

    const cleaned = sanitizeForSave(editedHtml);

    try {
      const response = await handlePutAssignmentVersion(
        versionDocumentId,
        cleaned
      );

      if (response?.html_content) {
        setEditedHtml(response.html_content);
        toaster.create({ description: "Saved successfully.", type: "success" });
        setIsCompletionModalOpen(true);
        setIsEditing(false);
        // Trigger refetch to update the read-only view
        setRefetchTrigger((prev) => prev + 1);
      } else {
        toaster.create({
          description: "Save completed, but no content returned.",
          type: "info",
        });
      }
    } catch (e) {
      console.error("[Save] error", e);
      const err = e as {
        message: string;
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      toaster.create({
        description: `Save failed: ${errorMessage}`,
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <Box p={6} mx="auto">
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
      <Box p={6} mx="auto">
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
    <Box p={6}>
      {/* Info Banner */}
      <Alert.Root status="info" mb={4}>
        <Alert.Content>
          <HStack>
            <Image h={"50px"} src={viewIcon} />

            <VStack align={"start"} pl={4}>
              <Heading fontWeight={"bold"} fontSize={"xl"} color="black">
                View-Only Mode
              </Heading>
              <Alert.Description fontSize={"lg"} color={"black"}>
                This page displays the details of a saved assignment version. To
                generate new options, click "Change Assignment" below.
              </Alert.Description>
            </VStack>
          </HStack>
        </Alert.Content>
      </Alert.Root>

      {!canEdit && (
        <Alert.Root status="warning" mb={4}>
          <Alert.Content>
            <HStack>
              <Image h={"50px"} src={finalizedIcon} />

              <VStack align={"start"} pl={4}>
                <Heading fontWeight={"bold"} fontSize={"xl"} color="black">
                  Not Editable
                </Heading>
                <Alert.Description fontSize={"lg"} color={"black"}>
                  This assignment version has been rated. To make any changes,
                  generate a new version.
                </Alert.Description>
              </VStack>
            </HStack>
          </Alert.Content>
        </Alert.Root>
      )}

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

        <Button
          color="white"
          bg="#BD4F23"
          borderRadius={"xl"}
          onClick={handleChangeAssignment}
        >
          Generate New Version <BsStars />
        </Button>
      </Box>

      {/* Three-column layout */}
      <HStack gap={4} alignItems="start" w="100%">
        {/* Column 1: Original Assignment */}
        {isOriginalVisible && (
          <Box flex="1">
            <OriginalAssignmentSection
              originalAssignmentHTML={
                assignment?.html_content || assignment?.content || ""
              }
              assignmentLoading={assignmentLoading}
            />
          </Box>
        )}

        {/* Column 2: Selected Options & Comments */}
        {isOptionsVisible && (
          <Box flex="1">
            <VersionOptionsDisplaySection
              generatedOptions={assignmentVersion.generated_options || []}
              selectedOptions={assignmentVersion.selected_options || []}
              additionalSuggestions={
                assignmentVersion.additional_edit_suggestions ||
                assignmentVersion.extra_ideas_for_changes ||
                ""
              }
              skillsForSuccess={assignmentVersion.skills_for_success || ""}
              onGenerateWithOptions={handleGenerateWithOptions}
            />
          </Box>
        )}

        {/* Column 3: Generated Content */}
        {isNewVisible && (
          <Box flex="1" display="flex" flexDir="column">
            {/* Card shell */}
            <Box
              borderWidth="1px"
              borderRadius="md"
              borderColor="#244d8a"
              w="100%"
              display="flex"
              flexDir="column"
              h="80vh"
            >
              {/* Header */}
              <Flex
                bg="#244d8a"
                color="white"
                px={4}
                py={2}
                align="center"
                justify="space-between"
                borderTopRadius="md"
                flexShrink={0}
              >
                <Image src={modifiedAssignmentIcon} height="50px" />
                <Heading size="md">Modified Assignment</Heading>
                {!isEditing && (
                  <Button
                    color="black"
                    bg="white"
                    borderRadius={"xl"}
                    _hover={{ bg: "rgba(209, 209, 209, 0.2)", color: "White" }}
                    onClick={handleEditClick}
                    disabled={!canEdit}
                  >
                    <Icon fontSize="lg">
                      <FiEdit />
                    </Icon>
                    Edit Final Content
                  </Button>
                )}
              </Flex>

              {/* Body */}
              <Box flex="1" overflow="hidden">
                {isEditing ? (
                  <SingleHTMLEditor
                    value={editedHtml || generatedHtml || ""}
                    onChange={setEditedHtml}
                  />
                ) : (
                  <HtmlContentBox
                    htmlContent={generatedHtml || ""}
                    height="100%"
                    padding={3}
                  />
                )}
              </Box>

              {/* Footer - Show save buttons only when editing */}
              {isEditing && (
                <Box
                  p={3}
                  borderTopWidth="1px"
                  borderColor="#eaeef4"
                  flexShrink={0}
                >
                  <HStack gap={2}>
                    <Button
                      flex="1"
                      borderRadius="xl"
                      bg="#bd4f23"
                      color="white"
                      disabled={!editedHtml}
                      loading={loadingAssignmentUpdate}
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                      <Icon as={FaCircleCheck} />
                    </Button>
                    <Button
                      borderRadius="xl"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </HStack>

      {/* Completion Modal */}
      {assignment &&
        studentId &&
        isCompletionModalOpen &&
        (editedHtml || generatedHtml) &&
        versionDocumentId && (
          <AssignmentModificationCompletionDialog
            student_id={studentId}
            assignment_id={assignment.assignment_id}
            assignmentHtml={editedHtml || generatedHtml || ""}
            versionDocumentId={versionDocumentId}
            assignmentTitle={assignment.title || "modified-assignment"}
            isModalOpen={isCompletionModalOpen}
            setIsModalOpen={setIsCompletionModalOpen}
          />
        )}
    </Box>
  );
};

export default AssignmentVersionDetailsPageContent;
