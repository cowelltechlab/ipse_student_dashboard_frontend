import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { updateUserEmails } from "../../services/userServices";

const useUpdateUserEmails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleUpdateUserEmails = async (
    userId: number,
    newEmail?: string,
    newGtEmail?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data: { email?: string; gt_email?: string } = {};
      if (newEmail) data.email = newEmail;
      if (newGtEmail) data.gt_email = newGtEmail;

      await updateUserEmails(userId, data);
    } catch (error) {
      setError(error as ErrorType);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleUpdateUserEmails };
};

export default useUpdateUserEmails;
