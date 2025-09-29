import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  Heading,
} from "@chakra-ui/react";
import { toaster } from "../../ui/toaster";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";

interface AssignmentDeleteConfirmationDialogProps {
  parentModalSetOpen: (open: boolean) => void;
  deleteConfirmOpen: boolean;
  setDeleteConfirmOpen: (open: boolean) => void;
  assignmentId: number | null;
  assignment: AssignmentDetailType | null;
  handleDeleteAssignment: (assignmentId: number) => Promise<void>;
  deleteLoading: boolean;
}

const AssignmentDeleteConfirmationDialog = ({
  deleteConfirmOpen,
  setDeleteConfirmOpen,
  assignmentId,
  assignment,
  handleDeleteAssignment,
  deleteLoading,
  parentModalSetOpen,
}: AssignmentDeleteConfirmationDialogProps) => {
  const handleDelete = async () => {
    if (!assignmentId) return;

    try {
      await handleDeleteAssignment(assignmentId);

      toaster.create({
        description: "Assignment deleted successfully.",
        type: "success",
      });

      setDeleteConfirmOpen(false);
      parentModalSetOpen(false);
    } catch (e) {
      console.error("Failed to delete assignment:", e);
      toaster.create({
        description: "Failed to delete assignment.",
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root
      open={deleteConfirmOpen}
      onOpenChange={(e) => setDeleteConfirmOpen(e.open)}
      placement="center"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" borderRadius="md" p={6}>
            <Dialog.Header>
              <Heading fontSize="lg" color="red.600">
                Confirm Deletion
              </Heading>
            </Dialog.Header>

            <Dialog.Body>
              <Text color="gray.700" mb={4}>
                Are you sure you want to delete this assignment? This action
                cannot be undone.
              </Text>
              {assignment && (
                <Text color="gray.600" fontSize="sm" fontStyle="italic">
                  Assignment: "{assignment.title}"
                </Text>
              )}
            </Dialog.Body>

            <Dialog.Footer>
              <HStack gap={3} w="full" justifyContent="flex-end">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirmOpen(false)}
                  disabled={deleteLoading}
                >
                  Cancel
                </Button>
                <Button
                  bg="red.500"
                  color="white"
                  onClick={handleDelete}
                  loading={deleteLoading}
                  disabled={deleteLoading}
                  _hover={{ bg: "red.600" }}
                >
                  Delete Assignment
                </Button>
              </HStack>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AssignmentDeleteConfirmationDialog;
