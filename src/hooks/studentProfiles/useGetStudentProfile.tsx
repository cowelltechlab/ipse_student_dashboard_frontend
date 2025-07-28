import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getStudentProfile } from "../../services/studentProfileServices";
import type { StudentProfileType } from "../../types/StudentProfileTypes";

const useGetStudentProfile = (student_id: string) => {
  const [studentProfile, setStudentProfile] = useState<StudentProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const handleGetStudentProfile = async () => {
      try {
        setLoading(true);
        const response = await getStudentProfile(student_id);
        setStudentProfile(response);
      } catch (e) {
        console.error("Error fetching student profile:", e);
        const error = e as ErrorType;
        setError(error);
        setStudentProfile(null);
      } finally {
        setLoading(false);
      }
    };

    handleGetStudentProfile();
  });

  return { studentProfile, loading, error };
};

export default useGetStudentProfile;
