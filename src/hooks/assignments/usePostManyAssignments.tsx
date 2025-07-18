import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postManyAssignments } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const usePostManyAssignments = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostManyAssignments = async (
    student_ids: number[],
    title: string,
    class_id: number,
    file: File,
    assignment_type_id: number
  ): Promise<AssignmentDetailType[]> => {
    try {
      setLoading(true);
      const response = await postManyAssignments({
        student_ids,
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

  return { loading, handlePostManyAssignments };
};

export default usePostManyAssignments;