import {
  Box,
  HStack,
  Button,
  Icon,
  Text,
  Flex,
  Image,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import { useState } from "react";
import modifiedAssignmentIcon from "../../assets/icons/note.png";

import { FaCircleCheck } from "react-icons/fa6";
import useAssignmentVersionOptions from "../../hooks/assignmentVersions/useAssignmentVersionOptions";
import OriginalAssignmentSection from "./OriginalAssignmentSection";
import ModificationOptionsSection from "./ModificationOptionsSection";
import { IoArrowForwardCircle } from "react-icons/io5";
import usePutAssignmentVersion from "../../hooks/assignmentVersions/usePutAssignmentVersion";
import { toaster } from "../ui/toaster";
import AssignmentModificationCompletionDialog from "./AssignmentModificationCompletionDialog";
import AssignmentModificationVisibilityButtons from "./AssignmentModificationVisibilityButtons";
import SingleHTMLEditor from "./SingleHTMLEditor";
import { postAssignmentVersion } from "../../services/assignmentVersionServices";

interface AssignmentDetailsPageContentProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;

  studentId?: string;
}

const AssignmentDetailsPageContent = ({
  assignment,
  assignmentLoading,
  studentId,
}: AssignmentDetailsPageContentProps) => {
  const [isOriginalVisible, setIsOriginalVisible] = useState<boolean>(true);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(true);
  const [isNewVisible, setIsNewVisible] = useState<boolean>(true);

  const [ideasForChange, setIdeasForChange] = useState<string>("");
  const [selectedLearningPathways, setSelectedLearningPathways] = useState<
    string[]
  >([]);

  // const [hasGenerated, setHasGenerated] = useState(false);
  const [generationKey, setGenerationKey] = useState(0);

  // NEW: HTML state for the editable assignment
  const [updatedHtml, setUpdatedHtml] = useState<string | null>(null);

  const [isCompletionModalOpen, setIsCompletionModalOpen] =
    useState<boolean>(false);

  const { versionOptions, loading: versionsLoading } =
    useAssignmentVersionOptions(assignment?.assignment_id);

  const { handlePutAssignmentVersion, loading: loadingAssignmentUpdate } =
    usePutAssignmentVersion();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);


  const handleAssignmentGenerationClick = async () => {
    if (!versionOptions?.version_document_id) return;

    setIsGenerating(true);
    setGenerationError(null);
    setUpdatedHtml(null);

    try {
      const response = await postAssignmentVersion(
        versionOptions.version_document_id,
        selectedLearningPathways,
        ideasForChange
      );

      setUpdatedHtml(response.html_content);
      // setHasGenerated(true);
      setGenerationKey((k) => k + 1);
    } catch (e) {
      console.error(e);
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };

      const errorMessage = error.response?.data.message || error.message;
      setGenerationError(errorMessage);
      toaster.create({
        description: `Error generating assignment: ${errorMessage}`,
        type: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  //  For Updating Assignment
  const handleSaveChangesClick = async () => {
    console.debug("[Save] clicked", { versionOptions, updatedHtml });

    if (!versionOptions?.version_document_id) {
      toaster.create({
        description: "No version_document_id available yet.",
        type: "warning",
      });
      return;
    }
    if (!updatedHtml) {
      toaster.create({
        description: "Nothing to save yet (updatedHtml is empty).",
        type: "warning",
      });
      return;
    }

    try {
      console.debug("[Save] calling handlePutAssignmentVersion", {
        version_document_id: versionOptions.version_document_id,
      });

      const response = await handlePutAssignmentVersion(
        versionOptions.version_document_id,
        updatedHtml
      );

      console.debug("[Save] response", response);

      if (response?.html_content) {
        setUpdatedHtml(response.html_content);
        toaster.create({ description: "Saved.", type: "success" });
        setIsCompletionModalOpen(true);
      } else {
        toaster.create({
          description: "Save completed, but no html_content returned.",
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

  return (
    <Box p={4} w={"100%"}>
      <AssignmentModificationVisibilityButtons
        isOriginalVisible={isOriginalVisible}
        isOptionsVisible={isOptionsVisible}
        isNewVisible={isNewVisible}
        toggleOriginalVisibility={() =>
          setIsOriginalVisible(!isOriginalVisible)
        }
        toggleVersionOptionsVisibility={() =>
          setIsOptionsVisible(!isOptionsVisible)
        }
        toggleNewVisibility={() => setIsNewVisible(!isNewVisible)}
      />

      <HStack w="100%" align="start">
        {isOriginalVisible && (
          <Box flex="1">
            <OriginalAssignmentSection
              originalAssignmentHTML={assignment?.html_content}
              assignmentLoading={assignmentLoading}
            />
          </Box>
        )}

        {isOptionsVisible && (
          <Box flex="1">
            <ModificationOptionsSection
              versionOptions={versionOptions}
              versionOptionsLoading={versionsLoading}
              selectedLearningPathways={selectedLearningPathways}
              setSelectedLearningPathways={setSelectedLearningPathways}
              ideasForChange={ideasForChange}
              setIdeasForChange={setIdeasForChange}
            />
            <Button
              borderRadius="xl"
              bg="#bd4f23"
              color="white"
              w="100%"
              disabled={selectedLearningPathways.length < 1 || isGenerating}
              onClick={handleAssignmentGenerationClick}
            >
              Generate Assignment
              <Icon as={IoArrowForwardCircle} />
            </Button>
          </Box>
        )}

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
              </Flex>

              {/* Scrollable body */}
              <Box flex="1" p={3}>
                {isGenerating && (
                  <Box textAlign="center" py={8}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                      Generating Modified Assignment...
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      This may take a few moments...
                    </Text>
                  </Box>
                )}

                {!isGenerating && !updatedHtml && (
                  <Textarea
                    pt={4}
                    value="Select Changes to Generate Modified Assignment"
                    fontSize="md"
                    disabled
                  />
                )}

                {!isGenerating && updatedHtml && (
                  <SingleHTMLEditor
                    key={`gen-${generationKey}`}
                    value={updatedHtml}
                    onChange={setUpdatedHtml}
                  />
                )}

                {generationError && (
                  <Text color="red.500" mt={2}>
                    {generationError}
                  </Text>
                )}
              </Box>

              {/* Footer */}
              <Box
                p={3}
                borderTopWidth="1px"
                borderColor="#eaeef4"
                flexShrink={0}
              >
                <Button
                  borderRadius="xl"
                  mt={4}
                  bg="#bd4f23"
                  color="white"
                  w="100%"
                  disabled={!updatedHtml}
                  loading={loadingAssignmentUpdate}
                  onClick={handleSaveChangesClick}
                >
                  Save Changes
                  <Icon as={FaCircleCheck} />
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </HStack>

      {assignment && studentId && isCompletionModalOpen && updatedHtml && versionOptions?.version_document_id && (
        <AssignmentModificationCompletionDialog
          student_id={studentId}
          assignment_id={assignment.assignment_id}
          assignmentHtml={updatedHtml}
          versionDocumentId={versionOptions.version_document_id}
          assignmentTitle={assignment.title || 'modified-assignment'}
          isModalOpen={isCompletionModalOpen}
          setIsModalOpen={setIsCompletionModalOpen}
        />
      )}
    </Box>
  );
};

export default AssignmentDetailsPageContent;
