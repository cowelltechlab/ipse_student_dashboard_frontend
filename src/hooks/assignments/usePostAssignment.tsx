import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postAssignment } from "../../services/assignmentServices";

const usePostAssignment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostAssignment = async (
    student_ids: number[],
    title: string,
    class_id: number,
    file: File
  ) => {
    try {
      setLoading(true);
      const response = await postAssignment({
        student_ids,
        title,
        class_id,
        file,
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