import { Box, HStack, Button, Icon } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import { useState } from "react";

import { FaCircleCheck } from "react-icons/fa6";
import useAssignmentVersionOptions from "../../hooks/assignmentVersions/useAssignmentVersionOptions";
import OriginalAssignmentSection from "./OriginalAssignmentSection";
import ModificationOptionsSection from "./ModificationOptionsSection";
import { IoArrowForwardCircle } from "react-icons/io5";
import usePostAssignmentVersion from "../../hooks/assignmentVersions/usePostAssignmentVerstion";
import usePutAssignmentVersion from "../../hooks/assignmentVersions/usePutAssignmentVersion";
import { toaster } from "../ui/toaster";
import AssignmentModificationCompletionDialog from "./AssignmentModificationCompletionDialog";
import UpdatedAssignmentSection from "./UpdatedAssignmentSection";
import AssignmentModificationVisibilityButtons from "./AssignmentModificationVisibilityButtons";

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

  const [updatedAssignment, setUpdatedAssignment] = useState<string>("");
  const [isCompletionModalOpen, setIsCompletionModalOpen] =
    useState<boolean>(false);

    const { versionOptions, loading: versionsLoading } =
      useAssignmentVersionOptions(assignment?.assignment_id);

//   const { versionOptions, loading: versionsLoading } =
//     useAssignmentVersionOptions();

  const { handlePostAssignmentVersion, loading: loadingAssignmentGeneration } =
    usePostAssignmentVersion();

  const { handlePutAssignmentVersion, loading: loadingAssignmentUpdate } =
    usePutAssignmentVersion();

  const handleAssignmentGenerationClick = async () => {
    if (!versionOptions?.version_document_id) return;

    try {
      const response = await handlePostAssignmentVersion(
        selectedLearningPathways,
        versionOptions.version_document_id,
        ideasForChange
      );

      if (response) {
        const { html_content } = response;

        setUpdatedAssignment(html_content);
      }
    } catch (error) {
      console.error("Error generating assignment version:", error);
    }
  };

  //  For Updating Assignment
  const handleSaveChangesClick = async () => {
    if (!versionOptions?.version_document_id) return;

    try {
      const response = await handlePutAssignmentVersion(
        versionOptions.version_document_id,
        updatedAssignment
      );
      if (response) {
        const { html_content } = response;

        setUpdatedAssignment(html_content);
      }

      setIsCompletionModalOpen(true);
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
              disabled={selectedLearningPathways.length < 1}
              onClick={handleAssignmentGenerationClick}
            >
              Generate Assignment
              <Icon as={IoArrowForwardCircle} />
            </Button>
          </Box>
        )}

        {isNewVisible && (
          <Box flex="1">
            <UpdatedAssignmentSection
              updatedAssignment={updatedAssignment}
              setUpdatedAssignment={setUpdatedAssignment}
              loadingAssignmentGeneration={loadingAssignmentGeneration}
            />
            <Button
              borderRadius="xl"
              mt={4}
              bg="#bd4f23"
              color="white"
              w="100%"
              disabled={!updatedAssignment}
              loading={loadingAssignmentUpdate}
              onClick={handleSaveChangesClick}
            >
              Save Changes
              <Icon as={FaCircleCheck} />
            </Button>
          </Box>
        )}
      </HStack>

      {assignment && studentId && isCompletionModalOpen && (
        <AssignmentModificationCompletionDialog
          student_id={studentId}
          assignment_id={assignment?.assignment_id}
          isModalOpen={isCompletionModalOpen}
          setIsModalOpen={setIsCompletionModalOpen}
        />
      )}
    </Box>
  );
};

export default AssignmentDetailsPageContent;
