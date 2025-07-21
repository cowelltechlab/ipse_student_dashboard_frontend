import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postEmbedUrl } from "../../services/studentProfileServices";

const usePostEmbedUrl = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostEmbedUrl = async (studentId: number, embedUrl: string, editUrl: string) => {
    try {
      setLoading(true);
      const response = await postEmbedUrl(studentId, embedUrl, editUrl)
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostEmbedUrl };
};

export default usePostEmbedUrl;
