import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { UserType } from "../../types/UserTypes";
import { getUsers } from "../../services/userServices";

const useUsers = (refetchTrigger: number, roleId?: number) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!roleId) return; // Skip fetch

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers(roleId);
        console.log(response)
        setUsers(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [roleId, refetchTrigger]);

  return { users, loading, error };
};

export default useUsers;
