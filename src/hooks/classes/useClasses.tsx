import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { ClassType } from "../../types/ClassTypes";
import { getClasses, getStudentClasses } from "../../services/classServices";

const useClasses = (triggerRefetch: number, studentId?: number | null) => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        if (studentId) {
          const response = await getStudentClasses(studentId);
          setClasses(response);
        } else {
          const response = await getClasses();
          setClasses(response);
        }
        setError(null);
      } catch (e) {
        console.error(e);
        const error = e as ErrorType;
        setError(error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if triggerRefetch is a valid positive number (not -1)
    if (triggerRefetch >= 0) {
      fetchClasses();
    } else {
      setLoading(false);
      setClasses([]);
      setError(null);
    }
  }, [triggerRefetch, studentId]);

  return { classes, loading, error };
};

export default useClasses;
