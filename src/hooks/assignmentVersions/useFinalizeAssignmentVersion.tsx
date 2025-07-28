import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { postFinalizeAssignmentVersion } from "../../services/assignmentVersionServices";

const useFinalizeAssignmentVerstion = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinalizeAssignmentVersion = async (
    assignmentVersionId?: string
  ) => {
    if (!assignmentVersionId) return;

    try {
      setLoading(true);
      const response = await postFinalizeAssignmentVersion(assignmentVersionId);
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFinalizeAssignmentVersion };
};

export default useFinalizeAssignmentVerstion;
