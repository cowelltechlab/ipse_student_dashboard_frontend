import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postAssignment } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const usePostAssignment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostAssignment = async (
    student_id: number,
    title: string,
    class_id: number,
    file: File,
    assignment_type_id: number
  ): Promise<AssignmentDetailType> => {
    try {
      setLoading(true);
      const response = await postAssignment({
        student_id,
        title,
        class_id,
        file,
        assignment_type_id
      });
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostAssignment };
};

export default usePostAssignment;