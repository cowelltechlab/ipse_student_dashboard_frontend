import {
  Box,
  Heading,
  HStack,
  Image,
  VStack,
  Flex,
  Button,
  Icon,
  Textarea,
  Spinner,
  Text,
} from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import { useState } from "react";

import modifiedAssignmentIcon from "../../assets/icons/note.png";
import { FaCircleCheck } from "react-icons/fa6";
import RichTextEditor from "../common/universal/EditableHTMLContentBox";
import useAssignmentVersionOptions from "../../hooks/assignmentVersions/useAssignmentVersionOptions";
import OriginalAssignmentSection from "./OriginalAssignmentSection";
import ModificationOptionsSection from "./ModificationOptionsSection";
import { IoArrowForwardCircle } from "react-icons/io5";
import usePostAssignmentVersion from "../../hooks/assignmentVersions/usePostAssignmentVerstion";
import usePutAssignmentVersion from "../../hooks/assignmentVersions/usePutAssignmentVersion";
import { toaster } from "../ui/toaster";
import AssignmentModificationCompletionDialog from "./AssignmentModificationCompletionDialog";

interface AssignmentDetailsPageContentProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;

  studentId?: string
}

const AssignmentDetailsPageContent = ({
  assignment,
  assignmentLoading,
  studentId
}: AssignmentDetailsPageContentProps) => {
  const [ideasForChange, setIdeasForChange] = useState<string>("");
  const [selectedLearningPathways, setSelectedLearningPathways] = useState<
    string[]
  >([]);

  const [updatedAssignment, setUpdatedAssignment] = useState<string>("");
  const [isCompletionModalOpen, setIsCompletionModalOpen] =
    useState<boolean>(true);

  // const { versionOptions, loading: versionsLoading } =
  //   useAssignmentVersionOptions(assignment?.assignment_id);

  const { versionOptions, loading: versionsLoading } =
    useAssignmentVersionOptions();

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
      <HStack w="100%" align={"start"}>
        <Box w="33%">
          <OriginalAssignmentSection
            originalAssignmentHTML={assignment?.html_content}
            assignmentLoading={assignmentLoading}
          />
        </Box>
        <Box w="33%">
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

        <Box w="33%">
          <VStack>
            <Box
              borderWidth="1px"
              borderRadius="md"
              borderColor={"#244d8a"}
              w={"100%"}
            >
              <Flex
                bg="#244d8a"
                color="white"
                px={4}
                py={2}
                align="center"
                justify="space-between"
                borderTopRadius="md"
              >
                <Image src={modifiedAssignmentIcon} height={"50px"} />
                <Heading>Modified Assignment</Heading>
              </Flex>

              {loadingAssignmentGeneration ? (
                // Spinner + message while generating
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  height="80vh"
                >
                  <Spinner size="xl" color="#244d8a" />
                  <Text mt={4} fontSize="lg" color="gray.600">
                    Hang tight! Generating your new assignment...
                  </Text>
                </Flex>
              ) : updatedAssignment ? (
                <RichTextEditor
                  value={updatedAssignment || ""}
                  onChange={(newHtml) => setUpdatedAssignment(newHtml)}
                />
              ) : (
                <Textarea
                  pt={4}
                  height="80vh"
                  value="Select Changes to Generate Modified Assignment"
                  fontSize={"md"}
                  disabled
                />
              )}
            </Box>
          </VStack>

          <Button
            borderRadius={"xl"}
            mt={4}
            bg={"#bd4f23"}
            color={"white"}
            w={"100%"}
            disabled={updatedAssignment === "" || updatedAssignment === null}
            loading={loadingAssignmentUpdate}
            onClick={handleSaveChangesClick}
          >
            Save Changes
            <Icon as={FaCircleCheck} />
          </Button>
        </Box>
      </HStack>

      {assignment && studentId &&  isCompletionModalOpen && (
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
