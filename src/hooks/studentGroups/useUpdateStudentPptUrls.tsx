import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentDetailsType, StudentPptUrlsUpdate } from "../../types/StudentGroupTypes";
import { updateStudentPptUrls } from "../../services/studentGroupsServices";

const useUpdateStudentPptUrls = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleUpdatePptUrls = async (
    student_id: number,
    urls: StudentPptUrlsUpdate
  ): Promise<StudentDetailsType | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await updateStudentPptUrls(student_id, urls);

      return result;
    } catch (e) {
      const error = e as ErrorType;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdatePptUrls,
    loading,
    error,
  };
};

export default useUpdateStudentPptUrls;