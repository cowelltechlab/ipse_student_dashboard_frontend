import { Button, HStack, Text, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import usePostAssignment from "../../hooks/assignments/usePostAssignment";
import type { ErrorType } from "../../types/ErrorType";
import { toaster } from "../ui/toaster";
import type {
  AssignmentDetailType,
} from "../../types/AssignmentTypes";

interface SubmitFormProps {
  studentIds: number[];
  title: string;
  classId: number | null;
  file: File;

  openSuccessDialog: () => void;
}

const SubmitForm = ({ studentIds, title, classId, file, openSuccessDialog }: SubmitFormProps) => {
  const commonButtonStyles = {
    borderRadius: 8,
    borderColor: "#BD4F23",
  };

  const { handlePostAssignment } = usePostAssignment();

  const handleAssignmentCreateClick = async () => {
    try {
        // Todo: make it so submit is not allowed without a classId (without throwing an error)
      if (!classId) {
        throw new Error("Class ID is required");
      }

    //    TODO: Update the hook to handle multiple students
      const response = await handlePostAssignment(
        studentIds,
        title,
        classId,
        file
      );
      const responseDict = response.data as AssignmentDetailType;
      toaster.create({
        description: `Assignment "${responseDict.title}" created successfully!`,
        type: "success",
      });

      openSuccessDialog();
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
