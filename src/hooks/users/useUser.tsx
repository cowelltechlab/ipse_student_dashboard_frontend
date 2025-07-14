import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { UserType } from "../../types/UserTypes";
import { getUser } from "../../services/userServices";

const useUser = (userId?: number) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!userId) return; // Skip fetch

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUser(userId);
        console.log(response)
        setUser(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  return { user, loading, error };
};

export default useUser;
