import { Button, HStack, Text, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import usePostManyAssignments from "../../hooks/assignments/usePostManyAssignments";
import type { ErrorType } from "../../types/ErrorType";
import { toaster } from "../ui/toaster";
import type {
  AssignmentDetailType,
} from "../../types/AssignmentTypes";
import { useState } from "react";

interface SubmitFormProps {
  studentIds: Set<number>;
  title: string;
  classId: number | null;
  file: File | null;
  assignmentTypeId: number | null;

  openSuccessDialog: () => void;
}

const SubmitForm = ({ 
  studentIds, 
  title, 
  classId, 
  file, 
  assignmentTypeId, 
  openSuccessDialog 
}: SubmitFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { handlePostManyAssignments } = usePostManyAssignments();

  const commonButtonStyles = {
    borderRadius: 8,
    borderColor: "#BD4F23",
  };

  const handleAssignmentCreateClick = async () => {
    setIsSubmitting(true);

    try {
      if (studentIds.size === 0) {
        throw new Error("Student selection is required");
      }

      if (!title) {
        throw new Error("Document name (title) is required");
      }

      if (Number.isNaN(classId) || classId === null || classId === undefined || typeof classId !== 'number') {
        throw new Error("Class is required");
      }

      if (!file) {
        throw new Error("File is required");
      }

      if (Number.isNaN(assignmentTypeId) || assignmentTypeId === null || assignmentTypeId === undefined || typeof assignmentTypeId !== 'number') {
        throw new Error("Assignment Type is required");
      }

      const response: AssignmentDetailType[] = await handlePostManyAssignments(
        Array.from(studentIds),
        title,
        classId,
        file,
        assignmentTypeId
      );

      toaster.create({
        description: `Assignment "${response[0].title}" created successfully!`,
        type: "success",
      });

      openSuccessDialog();
      console.log(`Assignment "${response[0].title}" created successfully!`);
    } catch (e) {
      const error = e as ErrorType;
      toaster.create({
        description: error?.message || "An unexpected error occurred.",
        type: "error",
        duration: 10000,
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <HStack justifyContent="center" width="100%" my={6}>
      <Button 
        color="#BD4F23" 
        backgroundColor="white" 
        {...commonButtonStyles}
        disabled={isSubmitting}
      >
        <Text>Cancel Upload</Text>
      </Button>
      <Button
        onClick={handleAssignmentCreateClick}
        loading={isSubmitting}
        backgroundColor="#BD4F23"
        color="white"
        {...commonButtonStyles}
        loadingText="Submitting" 
        spinnerPlacement="end"
        disabled={isSubmitting}
      >
        <Text>Finish Upload</Text>
        {!isSubmitting && ( // Only show the icon when not submitting
            <Box ml={2}>
                <FaCheckCircle color="white" />
            </Box>
        )}
      </Button>
    </HStack>
  );
};

export default SubmitForm;
