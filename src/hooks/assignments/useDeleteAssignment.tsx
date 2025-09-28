import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { deleteAssignment } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const useDeleteAssignment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleDeleteAssignment = async (
    assignment_id: number
  ): Promise<AssignmentDetailType | null> => {
    try {
      setLoading(true);
      setError(null);
      await deleteAssignment(assignment_id);
      return null;
    } catch (error) {
      setError(error as ErrorType);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleDeleteAssignment };
};

export default useDeleteAssignment;
