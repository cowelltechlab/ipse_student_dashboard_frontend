import { useEffect, useState } from "react";
import { type StudentProfileType } from "../../types/StudentTypes";
import { type ErrorType } from "../../types/ErrorType";
import { getStudentProfile } from "../../services/studentServices";

const useStudent = (studentId: string | undefined, refetchTrigger?: number) => {
  const [student, setStudent] = useState<StudentProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        setStudent(null);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const response = await getStudentProfile(studentId);
        setStudent(response);
        setError(null);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, refetchTrigger]);

  return { student, loading, error };
};

export default useStudent;
