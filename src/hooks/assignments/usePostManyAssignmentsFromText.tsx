import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postManyAssignmentsFromText } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const usePostManyAssignmentsFromText = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostManyAssignmentsFromText = async (
    student_ids: number[],
    title: string,
    class_id: number,
    content: string,
    assignment_type_id: number
  ): Promise<AssignmentDetailType[]> => {
    try {
      setLoading(true);
      const response = await postManyAssignmentsFromText({
        student_ids,
        title,
        class_id,
        content,
        assignment_type_id
      });
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostManyAssignmentsFromText };
};

export default usePostManyAssignmentsFromText;