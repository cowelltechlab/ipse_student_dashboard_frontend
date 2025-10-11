import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postUpdateOwnPassword } from "../../services/authServices";

const useUpdateOwnPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateOwnPassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    try {
      const response = await postUpdateOwnPassword(currentPassword, newPassword);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateOwnPassword, loading };
};

export default useUpdateOwnPassword;
