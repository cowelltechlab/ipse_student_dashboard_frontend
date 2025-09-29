import {
  Box,
  Text,
  Image,
  Button,
  Dialog,
  Portal,
  CloseButton,
  HStack,
} from "@chakra-ui/react";
import CreateNewAssignmentFinalModalIcon from "../../assets/Create New Assignment_FinalModal.svg";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface StudentSubmitModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  studentId?: number;
  assignmentId?: number;
}

const StudentSubmitModal = ({
  isOpen,
  setIsOpen,
  studentId,
  assignmentId,
}: StudentSubmitModalProps) => {
  const navigate = useNavigate();
  const commonButtonStyles = {
    borderRadius: 8,
    borderColor: "#BD4F23",
    fontWeight: "bold",
  };

  const handleViewInDocumentsClick = useCallback(() => {
    if (studentId) {
      navigate(`/student/${studentId}/documents`);
    } else {
      console.warn("Student ID not available, navigating to dashboard");
      // console.log("student id", studentId);
      navigate("/dashboard");
    }
    setIsOpen(false);
  }, [studentId, navigate, setIsOpen]);

  const handleModifyAssignmentClick = useCallback(() => {
    if (studentId && assignmentId) {
      navigate(`/student/${studentId}/assignment/${assignmentId}/modification`);
    } else {
      console.warn(
        "Student ID or Assignment ID not available, navigating to dashboard"
      );
      // console.log("student id", studentId);
      navigate("/dashboard");
    }
    setIsOpen(false);
  }, [studentId, assignmentId, navigate, setIsOpen]);

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
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
                  src={CreateNewAssignmentFinalModalIcon}
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
                color="#244d8a"
              >
                All set! Your document has been uploaded successfully.
              </Text>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <HStack gap={4}>
                <Button
                  color="#BD4F23"
                  backgroundColor="#eaf2ff"
                  {...commonButtonStyles}
                  onClick={handleViewInDocumentsClick}
                  _hover={{ bg: "white" }}
                >
                  <Text>View in Documents</Text>
                </Button>
                <Button
                  color="white"
                  backgroundColor="#BD4F23"
                  {...commonButtonStyles}
                  onClick={handleModifyAssignmentClick}
                  _hover={{ bg: "#A03D1A" }}
                >
                  <Text>Modify Assignment</Text>
                </Button>
              </HStack>
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

export default StudentSubmitModal;
