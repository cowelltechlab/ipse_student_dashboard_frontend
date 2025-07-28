import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postProfilePicture } from "../../services/studentProfileServices";

const usePostProfilePicture = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostProfilePicture = async (
    studentId: number | unknown,
    profilePictureUrl: string | null,
    profilePictureUpload: File | null
  ) => {
    try {
      setLoading(true);
      const response = await postProfilePicture(
        studentId,
        profilePictureUrl,
        profilePictureUpload
      );
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostProfilePicture };
};

export default usePostProfilePicture;
