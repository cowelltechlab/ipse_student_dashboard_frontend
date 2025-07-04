import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getRoles } from "../../services/roleServices";
import type { ClassType } from "../../types/ClassTypes";

const useClasses = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await getRoles();
        setClasses(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classes, loading, error };
};

export default useClasses;
