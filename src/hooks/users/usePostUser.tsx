import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postUserInvite } from "../../services/userServices";

const usePostUserInvite = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostUserInvite = async (
    schoolEmail: string,
    googleEmail: string,
    roles: string[],
  ) => {
    try {
      setLoading(true);
      const response = await postUserInvite({
        schoolEmail,
        googleEmail,
        roles,
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