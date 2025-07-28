import {
  Box,
  Text,
  Image,
  Button,
  Dialog,
  Portal,
  CloseButton,
  Icon,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import completeDocumentCreationImage from "../../assets/Document Modification_FinalModal.svg";
import { FaArrowCircleLeft } from "react-icons/fa";

interface AssignmentModificationCompletionDialogProps {
  student_id: string;
  assignment_id: number;

  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AssignmentModificationCompletionDialog = ({
  student_id,
  assignment_id,

  isModalOpen,
  setIsModalOpen,
}: AssignmentModificationCompletionDialogProps) => {
  const navigate = useNavigate();

  const handleNavigationClick = () => {
    navigate(`/student/${student_id}/assignment/${assignment_id}`);
  };

  const handleReturnClick = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog.Root
      lazyMount
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
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
              <Box pt="5%" pb="5%">
                <Image
                  src={completeDocumentCreationImage}
                  alt="An illustration of a teacher with a student"
                  margin={2}
                  padding={6}
                  flexShrink={0}
                />
              </Box>

              <Text
                textAlign="center"
                fontWeight="bold"
                justifyContent="center"
                fontSize="md"
                mr="5%"
                ml="5%"
              >
                All set! Your document version has been saved successfully.
              </Text>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <Button bg="#BD4F23" color={"white"} onClick={handleReturnClick}>
                <Icon as={FaArrowCircleLeft} />
                I'm not done yet. Keep Editing
              </Button>
              <Button
                bg="#BD4F23"
                color={"white"}
                onClick={handleNavigationClick}
              >
                View Assignment Versions
              </Button>
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
