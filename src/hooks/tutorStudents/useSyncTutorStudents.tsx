import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { syncTutorStudents } from "../../services/tutorStudentServices";

const useSyncTutorStudents = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSyncTutorStudents = async (
    tutorId: number,
    studentIds: number[]
  ) => {
    try {
      setLoading(true);
      const response = await syncTutorStudents(tutorId, studentIds);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSyncTutorStudents };
};

export default useSyncTutorStudents;
