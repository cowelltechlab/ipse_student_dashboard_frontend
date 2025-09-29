import { useState } from "react";
import { updateStudentEmails } from "../../services/studentGroupsServices";
import type { ErrorType } from "../../types/ErrorType";

const useUpdateStudentEmails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleUpdateStudentEmails = async (
    studentId: number,
    newEmail?: string,
    newGtEmail?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data: { email?: string; gt_email?: string } = {};
      if (newEmail) data.email = newEmail;
      if (newGtEmail) data.gt_email = newGtEmail;

      await updateStudentEmails(studentId, data);
    } catch (error) {
      setError(error as ErrorType);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleUpdateStudentEmails };
};

export default useUpdateStudentEmails;
