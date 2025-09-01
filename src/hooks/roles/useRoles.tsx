import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getRoles } from "../../services/roleServices";
import type { RoleType } from "../../types/RoleTypes";

const useRoles = () => {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await getRoles();
        setRoles(response);
      } catch (e) {
        console.error("Failed to fetch roles:", e);
        const error = e as ErrorType;
        setError(error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
