import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { ClassType } from "../../types/ClassTypes";
import { getClasses } from "../../services/classServices";

const useClasses = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await getClasses();
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
