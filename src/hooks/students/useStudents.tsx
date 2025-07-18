import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentType } from "../../types/StudentTypes";
import { getStudents } from "../../services/studentServices";

const useStudents = (
  searchTerm?: string | null,
  year_id?: number | null,
  refetchTrigger?: number
) => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudents(searchTerm, year_id);
        setStudents(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [searchTerm, year_id, refetchTrigger]);

  return { students, loading, error };
};

export default useStudents;
