import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { UserType } from "../../types/UserTypes";
import { getUsers } from "../../services/userServices";

const useUsers = (roleId: number | null = null) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers(roleId);
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
  }, [roleId]);

  return { users, loading, error };
};

export default useUsers;
