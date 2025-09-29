import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
  Input,
  Heading,
  Field,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useStudent from "../../../hooks/students/useStudent";
import useAssignment from "../../../hooks/assignments/useAssignment";
import useDeleteAssignment from "../../../hooks/assignments/useDeleteAssignment";
import useUpdateAssignmentMetadata from "../../../hooks/assignments/useUpdateAssignmentMetadata";
import useClasses from "../../../hooks/classes/useClasses";
import AssignmentTypeSelectDropdown from "./AssignmentTypeSelectDropdown";
import ClassDropdown from "../classDropdown/ClassDropdown";
import { toaster } from "../../ui/toaster";
import AssignmentDeleteConfirmationDialog from "./AssignmentDeleteConfirmationDialog";
import ClassSelectionDialog from "../classDropdown/ClassSelectionDialog";

interface AssignmentMetadataModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  assignmentId: number | null;
  studentId?: number;
}

const AssignmentMetadataModal = ({
  open,
  setOpen,
  assignmentId,
  studentId,
}: AssignmentMetadataModalProps) => {
  const { student, loading: studentLoading } = useStudent(String(studentId));
  const { assignment, loading: assignmentLoading } = useAssignment(
    Number(assignmentId)
  );

  const { handleDeleteAssignment, loading: deleteLoading } =
    useDeleteAssignment();
  const { handleUpdateAssignmentMetadata, loading: updateLoading } =
    useUpdateAssignmentMetadata();

  // Form state
  const [title, setTitle] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [assignmentTypeId, setAssignmentTypeId] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const [triggerRefetch, setTriggerRefetch] = useState<number>(0);

  const { classes } = useClasses(triggerRefetch);

  // Form validation
  const [titleError, setTitleError] = useState("");

  // Initialize form values when assignment data loads
  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title || "");
      setSelectedClassId(assignment.class_id || null);
      setAssignmentTypeId(assignment.assignment_type_id || null);
      setTitleError("");
    }
  }, [assignment]);

  // Validation functions
  const validateTitle = (value: string): string => {
    if (!value.trim()) {
      return "Title is required";
    }
    return "";
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setTitleError(validateTitle(value));
  };

  // Placeholder for class creation modal
  const openClassAddModal = () => {
    setAddClassModalOpen(true);
  };

  // Save handler
  const handleSave = async () => {
    if (!assignment || !assignmentId) return;

    // Validate form
    const currentTitleError = validateTitle(title);
    setTitleError(currentTitleError);

    if (currentTitleError) {
      toaster.create({
        description: "Please fix validation errors before saving.",
        type: "error",
      });
      return;
    }

    if (!selectedClassId || !assignmentTypeId) {
      toaster.create({
        description: "Please select both a class and assignment type.",
        type: "error",
      });
      return;
    }

    try {
      const updatedAssignment = await handleUpdateAssignmentMetadata(
        assignmentId,
        {
          title: title.trim(),
          class_id: selectedClassId,
          assignment_type_id: assignmentTypeId,
        }
      );

      if (updatedAssignment) {
        toaster.create({
          description: "Assignment metadata updated successfully.",
          type: "success",
        });
        setOpen(false);
      }
    } catch (e) {
      console.error("Failed to update assignment metadata:", e);
      toaster.create({
        description: "Failed to update assignment metadata.",
        type: "error",
      });
    }
  };

  // Determine if we should show loading state
  const isLoading = studentLoading || assignmentLoading;

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      size={"lg"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={"#244d8a"} borderRadius={"md"} pb={5}>
            <Box bg={"white"} w={"100%"} mb={4} roundedTop={"md"}>
              <VStack p={6} spaceY={2}>
                <Heading fontSize="xl" color="#244d8a">
                  Assignment Metadata
                </Heading>
                {isLoading ? (
                  <Skeleton height="20px" width="300px" mx="auto" />
                ) : (
                  <Text fontSize="md" color="gray.600" textAlign="center">
                    {assignment && student
                      ? `Manage "${assignment.title}" for ${student.first_name} ${student.last_name}`
                      : `Manage assignment metadata`}
                  </Text>
                )}
              </VStack>
            </Box>

            <Dialog.Body mx={4} mb={4}>
              <VStack spaceY={4} color="white">
                {isLoading ? (
                  <>
                    {/* Loading State - Title Field Skeleton */}
                    <Box w="full">
                      <Skeleton height="16px" width="120px" mb={2} />
                      <Skeleton height="40px" width="100%" />
                    </Box>

                    {/* Loading State - Class Dropdown Skeleton */}
                    <Box w="full">
                      <Skeleton height="16px" width="60px" mb={2} />
                      <Skeleton height="40px" width="100%" />
                    </Box>

                    {/* Loading State - Assignment Type Dropdown Skeleton */}
                    <Box w="full">
                      <Skeleton height="16px" width="140px" mb={2} />
                      <Skeleton height="40px" width="100%" />
                    </Box>
                  </>
                ) : (
                  <>
                    {/* Title Field */}
                    <Box w="full">
                      <Field.Root>
                        <Field.Label fontWeight="semibold" color="white" mb={2}>
                          Assignment Title
                        </Field.Label>
                        <Input
                          value={title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Enter assignment title..."
                          bg="white"
                          color="black"
                          borderRadius="md"
                          borderColor={titleError ? "red.500" : "gray.300"}
                        />
                        {titleError && (
                          <Text fontSize="sm" color="red.300" mt={1}>
                            {titleError}
                          </Text>
                        )}
                      </Field.Root>
                    </Box>

                    {/* Class Dropdown */}
                    <Box w="full">
                      <Text mb={2} fontWeight="semibold" color="white">
                        Class
                      </Text>
                      <ClassDropdown
                        selectedClassId={selectedClassId}
                        setSelectedClassId={setSelectedClassId}
                        openClassAddModal={openClassAddModal}
                        classes={classes}
                      />
                    </Box>

                    {/* Assignment Type Dropdown */}
                    <Box w="full" color="black">
                      <AssignmentTypeSelectDropdown
                        assignmentTypeId={assignmentTypeId}
                        setAssignmentTypeId={setAssignmentTypeId}
                      />
                    </Box>
                  </>
                )}
              </VStack>
            </Dialog.Body>

            <Dialog.Footer mx={4}>
              <HStack w="full" gap={2}>
                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  flex="1"
                  onClick={() => setOpen(false)}
                  disabled={updateLoading || deleteLoading || isLoading}
                >
                  Cancel
                </Button>
                <Button
                  bg="red.500"
                  color="white"
                  flex="1"
                  onClick={() => setDeleteConfirmOpen(true)}
                  disabled={updateLoading || deleteLoading || isLoading}
                  _hover={{ bg: "red.600" }}
                >
                  Delete
                </Button>
                <Button
                  bg="#BD4F23"
                  color="white"
                  flex="1"
                  onClick={handleSave}
                  loading={updateLoading}
                  disabled={
                    updateLoading || deleteLoading || !!titleError || isLoading
                  }
                  _hover={{ bg: "#A43E1E" }}
                >
                  Save Changes
                </Button>
              </HStack>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>

        {/* Delete Confirmation Dialog */}
        <AssignmentDeleteConfirmationDialog
          parentModalSetOpen={setOpen}
          deleteConfirmOpen={deleteConfirmOpen}
          setDeleteConfirmOpen={setDeleteConfirmOpen}
          assignmentId={assignmentId}
          assignment={assignment}
          handleDeleteAssignment={handleDeleteAssignment}
          deleteLoading={deleteLoading}
        />

        {/* Add Class Modal */}
        <ClassSelectionDialog
          open={addClassModalOpen}
          setOpen={(val) => setAddClassModalOpen(val)}
          triggerRefetch={() => setTriggerRefetch((prev) => prev + 1)}
        />
      </Portal>
    </Dialog.Root>
  );
};

export default AssignmentMetadataModal;
