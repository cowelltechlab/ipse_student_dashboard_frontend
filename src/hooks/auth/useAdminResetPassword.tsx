import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postAdminResetPassword } from "../../services/authServices";

const useAdminResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleAdminResetPassword = async (userId: number, newPassword: string) => {
    setLoading(true);
    try {
      const response = await postAdminResetPassword(userId, newPassword);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { handleAdminResetPassword, loading };
};

export default useAdminResetPassword;