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
import { useState, useEffect } from "react";
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
import AssignmentStreamViewer from "./AssignmentStreamViewer";
import { useAssignmentStreamSections } from "../../hooks/assignmentVersions/useAssignmentStreamSections";
import UpdatedAssignmentStructuredEditors, {
  type AssignmentJson,
} from "./JsonAssignmentEditor";
import LoadingGenerationLottie from "./LoadingGenerationLottie";

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

  const [hasGenerated, setHasGenerated] = useState(false);
  const [generationKey, setGenerationKey] = useState(0);

  // NEW: JSON state for the editable assignment
  const [updatedJson, setUpdatedJson] = useState<AssignmentJson | null>(null);

  const [isCompletionModalOpen, setIsCompletionModalOpen] =
    useState<boolean>(false);

  const { versionOptions, loading: versionsLoading } =
    useAssignmentVersionOptions(assignment?.assignment_id);

  const { handlePutAssignmentVersion, loading: loadingAssignmentUpdate } =
    usePutAssignmentVersion();

  const {
    sections,
    isLoading: streaming,
    error: streamError,
    start: startStream,
    cancel: cancelStream,
  } = useAssignmentStreamSections();

  const hydrating = hasGenerated && !streaming && updatedJson === null;

  const handleAssignmentGenerationClick = async () => {
    if (!versionOptions?.version_document_id) return;

    setHasGenerated(true);
    setUpdatedJson(null);

    try {
      await startStream(
        versionOptions.version_document_id,
        selectedLearningPathways,
        ideasForChange
      );
    } catch (e) {
      console.error(e);
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };

      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating class: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // When streaming is done, stitch everything into one HTML for editing
  useEffect(() => {
    if (!streaming && hasGenerated) {
      const {
        assignmentInstructionsHtml,
        stepByStepPlanHtml,
        promptsHtml,
        supportTools,
        motivationalMessageHtml,
      } = sections;

      const obj = {
        assignmentInstructionsHtml: assignmentInstructionsHtml ?? "",
        stepByStepPlanHtml: stepByStepPlanHtml ?? "",
        promptsHtml: promptsHtml ?? "",
        supportTools: {
          toolsHtml: supportTools?.toolsHtml ?? "",
          aiPromptingHtml: supportTools?.aiPromptingHtml ?? "",
          aiPolicyHtml: supportTools?.aiPolicyHtml ?? "",
        },
        motivationalMessageHtml: motivationalMessageHtml ?? "",
      };

      setUpdatedJson(obj);
      setGenerationKey((k) => k + 1);
    }
  }, [streaming, sections, hasGenerated]);

  useEffect(() => {
    return () => {
      cancelStream();
    };
  }, [cancelStream]);

  //  For Updating Assignment
  const handleSaveChangesClick = async () => {
    console.debug("[Save] clicked", { versionOptions, updatedJson });

    if (!versionOptions?.version_document_id) {
      toaster.create({
        description: "No version_document_id available yet.",
        type: "warning",
      });
      return;
    }
    if (!updatedJson) {
      toaster.create({
        description: "Nothing to save yet (updatedJson is empty).",
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
        updatedJson
      );

      console.debug("[Save] response", response);

      if (response?.json_content) {
        setUpdatedJson(response.json_content);
        toaster.create({ description: "Saved.", type: "success" });
        setIsCompletionModalOpen(true);
      } else {
        toaster.create({
          description: "Save completed, but no json_content returned.",
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
              disabled={selectedLearningPathways.length < 1 || streaming}
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
              <Box flex="1"  p={3} >
                {streaming && (
                  <AssignmentStreamViewer
                    sections={sections}
                    isLoading={streaming}
                  />
                )}

                {!streaming && hydrating && <LoadingGenerationLottie />}

                {!streaming && !hydrating && !updatedJson && (
                  <Textarea
                    pt={4}
                    // remove fixed 75vh — the container controls height now
                    value="Select Changes to Generate Modified Assignment"
                    fontSize="md"
                    disabled
                  />
                )}

                {!streaming && !hydrating && updatedJson && (
                  <UpdatedAssignmentStructuredEditors
                    key={`gen-${generationKey}`}
                    value={updatedJson}
                    onChange={setUpdatedJson}
                  />
                )}

                {streamError && (
                  <Text color="red.500" mt={2}>
                    {streamError}
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
                  disabled={!updatedJson}
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

      {assignment && studentId && isCompletionModalOpen && updatedJson && versionOptions?.version_document_id && (
        <AssignmentModificationCompletionDialog
          student_id={studentId}
          assignment_id={assignment.assignment_id}
          assignmentJson={updatedJson}
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
