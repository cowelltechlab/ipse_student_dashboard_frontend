import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postCompleteUserRegistry } from "../../services/userServices";

const useCompleteUserRegistry = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompleteUserRegistry = async (
    token: string,
    first_name: string,
    last_name: string,
    password: string,
    profile_picture: File | null,
  ) => {
    try {
      setLoading(true);
      const response = await postCompleteUserRegistry({
        token,
        first_name,
        last_name,
        password,
        profile_picture,
      });
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleCompleteUserRegistry };
};

export default useCompleteUserRegistry;