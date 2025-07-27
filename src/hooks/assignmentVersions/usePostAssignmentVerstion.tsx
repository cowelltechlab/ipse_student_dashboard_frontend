import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postAssignmentVersion } from "../../services/assignmentVersionServices";

const usePostAssignmentVersion = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostAssignmentVersion = async (
    assignmentVersionId: string,
    selectedOptions: string[],
    additionalEditSuggestions?: string
  ) => {
    try {
      setLoading(true);
      const response = await postAssignmentVersion(
        assignmentVersionId,
        selectedOptions,
        additionalEditSuggestions
      );
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostAssignmentVersion };
};

export default usePostAssignmentVersion;
