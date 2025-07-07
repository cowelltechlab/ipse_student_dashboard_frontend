import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentType } from "../../types/StudentTypes";
import { getStudentByUserId } from "../../services/studentServices";

const useGetStudentByUserId = (userId: number) => {
  const [student, setStudent] = useState<StudentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await getStudentByUserId(userId);
        setStudent(response);
      } catch (e) {
        console.error("Error fetching student by user ID:", e);
        const error = e as ErrorType;
        setError(error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [userId]);

  return { student, loading, error };
};

export default useGetStudentByUserId;
