import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { deleteAssignment } from "../../services/assignmentServices";

const useDeleteAssignment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleDeleteAssignment = async (
    assignment_id: number
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await deleteAssignment(assignment_id);
    } catch (error) {
      setError(error as ErrorType);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleDeleteAssignment };
};

export default useDeleteAssignment;
