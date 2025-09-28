import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { updateAssignment } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const useUpdateAssignmentMetadata = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleUpdateAssignmentMetadata = async (
    assignment_id: number,
    data: Partial<{
      title: string;
      class_id: number;
      assignment_type_id: number;
    }>
  ): Promise<AssignmentDetailType | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedAssignment = await updateAssignment(assignment_id, data);
      return updatedAssignment;
    } catch (error) {
      setError(error as ErrorType);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleUpdateAssignmentMetadata };
};

export default useUpdateAssignmentMetadata;
