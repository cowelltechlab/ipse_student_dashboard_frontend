import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postAssignmentFromText } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const usePostAssignmentFromText = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostAssignmentFromText = async (
    student_id: number,
    title: string,
    class_id: number,
    content: string,
    assignment_type_id: number,
    date_created?: string
  ): Promise<AssignmentDetailType> => {
    try {
      setLoading(true);
      const response = await postAssignmentFromText({
        student_id,
        title,
        class_id,
        content,
        assignment_type_id,
        date_created
      });
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostAssignmentFromText };
};

export default usePostAssignmentFromText;