import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { ProfilePictureType } from "../../types/UserTypes";
import { getDefaultProfilePictures } from "../../services/userServices";

const useDefaultProfilePictures = () => {
  const [defaultProfilePictures, setDefaultProfilePictures] = useState<ProfilePictureType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {

    const fetchDefaultProfilePictures = async () => {
      try {
        setLoading(true);
        const response = await getDefaultProfilePictures();
        setDefaultProfilePictures(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setDefaultProfilePictures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultProfilePictures();
  }, []);

  return { defaultProfilePictures, loading, error };
};

export default useDefaultProfilePictures;
