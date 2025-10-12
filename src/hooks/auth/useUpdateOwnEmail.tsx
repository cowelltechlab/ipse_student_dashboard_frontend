import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { patchUpdateOwnEmail } from "../../services/authServices";

const useUpdateOwnEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleUpdateOwnEmail = async (
    newEmail?: string,
    newGtEmail?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data: { email?: string; gt_email?: string } = {};
      if (newEmail) data.email = newEmail;
      if (newGtEmail) data.gt_email = newGtEmail;

      await patchUpdateOwnEmail(data);
    } catch (error) {
      setError(error as ErrorType);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleUpdateOwnEmail };
};

export default useUpdateOwnEmail;
