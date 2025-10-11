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

import modifiedAssignmentIcon from "../../assets/icons/note.png";
import { BsStars } from "react-icons/bs";

import viewIcon from "../../assets/icons/research.png";

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

  const toggleOriginalVisibility = () =>
    setIsOriginalVisible(!isOriginalVisible);
  const toggleVersionOptionsVisibility = () =>
    setIsOptionsVisible(!isOptionsVisible);
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
    <Box p={6} >
      {/* Info Banner */}
      <Alert.Root status="info" mb={4}>
        <Alert.Content>
          <HStack>
            <Image h={"50px"} src={viewIcon} />

            <VStack align={"start"}  pl={4}>
              <Heading fontWeight={"bold"} fontSize={"xl"} color="black">
                View-Only Mode
              </Heading>
              <Alert.Description fontSize={"lg"}color={"black"}>
                This page displays the details of a saved assignment version. To
                generate new options, click "Change Assignment" below.
              </Alert.Description>
            </VStack>
          </HStack>
        </Alert.Content>
      </Alert.Root>

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
          Change <BsStars />
        </Button>
      </Box>

      {/* Three-column layout */}
      <Grid
        templateColumns={`${isOriginalVisible ? "1fr" : "0fr"} ${
          isOptionsVisible ? "1fr" : "0fr"
        } ${isNewVisible ? "1fr" : "0fr"}`}
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
            </Flex>
            <HtmlContentBox htmlContent={generatedHtml || ""} />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default AssignmentVersionDetailsPageContent;
