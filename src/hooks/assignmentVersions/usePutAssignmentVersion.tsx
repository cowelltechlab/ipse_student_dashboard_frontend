import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { putAssignmentVersion } from "../../services/assignmentVersionServices";

const usePutAssignmentVersion = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePutAssignmentVersion = async (
    assignmentVersionId: string,
    updatedHTMLContent: string
  ) => {
    try {
      setLoading(true);
      const response = await putAssignmentVersion(
        assignmentVersionId,
        updatedHTMLContent
      );
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePutAssignmentVersion };
};

export default usePutAssignmentVersion;
