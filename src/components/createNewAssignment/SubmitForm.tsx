import { Button, HStack, Text, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import usePostAssignment from "../../hooks/assignments/usePostAssignment";
import type { ErrorType } from "../../types/ErrorType";
import { toaster } from "../ui/toaster";
import type {
  AssignmentDetailType,
} from "../../types/AssignmentTypes";

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
  const commonButtonStyles = {
    borderRadius: 8,
    borderColor: "#BD4F23",
  };

  const { handlePostAssignment } = usePostAssignment();

  const handleAssignmentCreateClick = async () => {
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

      if (Number.isNaN(classId) || assignmentTypeId === null || assignmentTypeId === undefined || typeof assignmentTypeId !== 'number') {
        throw new Error("Assignment Type is required");
      }

      const response: AssignmentDetailType[] = await handlePostAssignment(
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
    }
  };

  return (
    <HStack justifyContent="center" width="100%" my={6}>
      <Button color="#BD4F23" backgroundColor="white" {...commonButtonStyles}>
        <Text>Cancel Upload</Text>
      </Button>
      <Button
        onClick={handleAssignmentCreateClick}
        backgroundColor="#BD4F23"
        color="white"
        {...commonButtonStyles}
      >
        <Text>Finish Upload</Text>
        <Box>
          <FaCheckCircle color="white" />
        </Box>
      </Button>
    </HStack>
  );
};

export default SubmitForm;
