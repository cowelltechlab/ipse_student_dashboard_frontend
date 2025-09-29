import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAllStudentProfiles } from "../../services/studentProfileServices";
import type { StudentProfileType } from "../../types/StudentProfileTypes";

const useGetAllStudentProfiles = () => {
  const [studentProfiles, setStudentProfiles] = useState<StudentProfileType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const handleGetAllStudentProfiles = async () => {
      try {
        setLoading(true);
        const response = await getAllStudentProfiles();
        setStudentProfiles(response);
      } catch (e) {
        console.error("Error fetching student profiles:", e);
        const error = e as ErrorType;
        setError(error);
        setStudentProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    handleGetAllStudentProfiles();
  }, []);

  return { studentProfiles, loading, error };
};

export default useGetAllStudentProfiles;
