import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { deleteUser } from "../../services/userServices";

const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      const response = await deleteUser(userId);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDeleteUser };
};

export default useDeleteUser;