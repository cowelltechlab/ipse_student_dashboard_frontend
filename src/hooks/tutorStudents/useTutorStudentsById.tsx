import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { TutorStudentsType } from "../../types/TutorStudents";
import { getTutorStudentsById } from "../../services/tutorStudentServices";

const useTutorStudentsById = (tutorId: number) => {
  const [tutorStudents, setTutorStudents] = useState<TutorStudentsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchTutorStudentsById = async () => {
      try {
        setLoading(true);
        const response = await getTutorStudentsById(tutorId);
        setTutorStudents(response);
      } catch (e) {
        console.error("Error fetching tutor students by ID:", e);
        const error = e as ErrorType;
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorStudentsById();
  }, [tutorId]);

  return { tutorStudents, loading, error };
};

export default useTutorStudentsById;
