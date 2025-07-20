import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { putStudentProfile } from "../../services/studentProfileServices";
import type { StudentProfileUpdatePayload } from "../../types/StudentProfileTypes";

const usePutStudentProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePutStudentProfile = async (
    user_id: number,
    updatePayload: StudentProfileUpdatePayload
  ) => {
    try {
      setLoading(true);
      const response = await putStudentProfile(user_id, updatePayload);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePutStudentProfile };
};

export default usePutStudentProfile;
