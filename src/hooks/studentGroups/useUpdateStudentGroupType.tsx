import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentDetailsType, StudentGroupTypeUpdate } from "../../types/StudentGroupTypes";
import { updateStudentGroupType } from "../../services/studentGroupsServices";

const useUpdateStudentGroupType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleUpdateGroupType = async (
    student_id: number,
    group_type: string | null
  ): Promise<StudentDetailsType | null> => {
    try {
      setLoading(true);
      setError(null);

      const data: StudentGroupTypeUpdate = { group_type };
      const result = await updateStudentGroupType(student_id, data);

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
    handleUpdateGroupType,
    loading,
    error,
  };
};

export default useUpdateStudentGroupType;