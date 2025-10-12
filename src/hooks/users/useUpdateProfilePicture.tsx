import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postUpdateProfilePicture } from "../../services/userServices";

const useUpdateProfilePicture = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateProfilePicture = async (
    profile_picture: File | null,
    existingBlobUrl: string | null
  ) => {
    setLoading(true);
    try {
      const response = await postUpdateProfilePicture(
        profile_picture,
        existingBlobUrl
      );
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateProfilePicture, loading };
};

export default useUpdateProfilePicture;
