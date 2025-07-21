import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getPrefillStudentProfile } from "../../services/studentProfileServices";
import type { StudentProfilePrefillType } from "../../types/StudentProfileTypes";

const useGetPrefillStudentProfile = (user_id?: string | null) => {
  const [studentProfile, setStudentProfile] =
    useState<StudentProfilePrefillType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!user_id) return; // Skip fetch

    const handleGetPrefillStudentProfile = async () => {
      try {
        setLoading(true);
        const response = await getPrefillStudentProfile(user_id);
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

    handleGetPrefillStudentProfile();
  }, [user_id]);

  return { studentProfile, loading, error };
};

export default useGetPrefillStudentProfile;
