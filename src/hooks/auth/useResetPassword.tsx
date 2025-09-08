import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postResetPasswordRequest } from "../../services/authServices";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (token: string, email: string, password: string) => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await postResetPasswordRequest(token, email, password);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };
  return { handlePasswordReset, loading };
};

export default useResetPassword;
