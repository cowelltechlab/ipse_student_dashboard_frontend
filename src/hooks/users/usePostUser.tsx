import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postUserInvite } from "../../services/userServices";

const usePostUserInvite = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostUserInvite = async (
    google_email: string,
    school_email: string,
    role_ids: string[],
  ) => {
    try {
      setLoading(true);
      const response = await postUserInvite({
        google_email,
        school_email,
        role_ids,
      });
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostUserInvite };
};

export default usePostUserInvite;