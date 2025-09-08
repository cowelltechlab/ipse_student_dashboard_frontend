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
          console.log("Fetching classes for student ID:", studentId);
          const response = await getStudentClasses(studentId);
          setClasses(response);
        } else {
          const response = await getClasses();
          setClasses(response);
        }
      } catch (e) {
        console.error(e);
        const error = e as ErrorType;
        setError(error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [triggerRefetch, studentId]);

  return { classes, loading, error };
};

export default useClasses;
