import {
  Box,
  Text,
  Button,
  Dialog,
  Portal,
  CloseButton,
  Icon,
  Heading,
  VStack,
  Stack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaDownload } from "react-icons/fa";
import type { AssignmentJson } from "./JsonAssignmentEditor";
import { convertAssignmentJsonToHtml } from "../../utils/assignmentHtml";
import HtmlContentBox from "../common/universal/HTMLContentDisplay";
import useDownloadAssignmentVersion from "../../hooks/assignmentVersions/useDownloadAssignmentVersion";

interface AssignmentModificationCompletionDialogProps {
  student_id: string;
  assignment_id: number;
  assignmentJson: AssignmentJson;
  versionDocumentId: string;
  assignmentTitle: string;

  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AssignmentModificationCompletionDialog = ({
  student_id,
  assignment_id,
  assignmentJson,
  versionDocumentId,
  assignmentTitle,

  isModalOpen,
  setIsModalOpen,
}: AssignmentModificationCompletionDialogProps) => {
  const navigate = useNavigate();
  const { getDownloadBlob } = useDownloadAssignmentVersion();

  const handleNavigationClick = () => {
    navigate(`/student/${student_id}/assignment/${assignment_id}`);
  };

  const handleReturnClick = () => {
    setIsModalOpen(false);
  };

  const handleDownload = async () => {
    if (!versionDocumentId) {
      console.error("No version document ID available for download");
      return;
    }

    try {
      const blob = await getDownloadBlob(versionDocumentId);

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = assignmentTitle || "modified-assignment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading assignment:", error);
    }
  };

  // Convert JSON to HTML for preview
  const previewHtml = convertAssignmentJsonToHtml(assignmentJson);

  return (
    <Dialog.Root
      lazyMount
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
      size={"xl"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            backgroundColor="#EAF2FF"
            justifyContent="center"
            mt="10%"
            pt={5}
            pb={5}
          >
            <Dialog.Body alignContent="center" justifyContent="center">
              <Box textAlign="center" mb={4}>
                <Text fontWeight="bold" fontSize="lg" mb={2} color="#244d8a">
                  All set! Your document version has been saved successfully.
                </Text>
                <Heading size="md" mb={3} color="#244d8a">
                  Here's a preview of your assignment
                </Heading>
              </Box>

              <Box
                maxH="300px"
                border="1px solid #e2e8f0"
                borderRadius="md"
                overflow="hidden"
                mb={4}
              >
                <HtmlContentBox
                  htmlContent={previewHtml}
                  height="300px"
                  padding={4}
                />
              </Box>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center" gap={3}>
              <VStack w={"100%"} spaceY={3}>
                <Button
                  bg="#244d8a"
                  color={"white"}
                  onClick={handleDownload}
                  w={"100%"}
                >
                  <Icon as={FaDownload} />
                  Download Assignment
                </Button>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  gap={3}
                  w={"100%"}
                >
                  <Button
                    bg="white"
                    border="1px solid #BD4F23"
                    color={"#BD4F23"}
                    onClick={handleReturnClick}
                    flex={1}
                  >
                    <Icon as={FaArrowCircleLeft} />
                    I'm not done yet. Keep Editing
                  </Button>

                  <Button
                    bg="#BD4F23"
                    color={"white"}
                    flex={1}
                    onClick={handleNavigationClick}
                  >
                    View Assignment Versions
                  </Button>
                </Stack>
              </VStack>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="md" variant="ghost" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AssignmentModificationCompletionDialog;
