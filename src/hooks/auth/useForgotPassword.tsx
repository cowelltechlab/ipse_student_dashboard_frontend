import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postForgotPasswordRequest } from "../../services/authServices";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handlePasswordResetRequest = async (email: string) => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await postForgotPasswordRequest(email);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };
  return { handlePasswordResetRequest, loading };
};

export default useForgotPassword;
