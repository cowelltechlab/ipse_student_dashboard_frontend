import { useState } from "react";
import { putAssignmentVersion } from "../../services/assignmentVersionServices";

const usePutAssignmentVersion = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePutAssignmentVersion = async (
    assignmentVersionId: string,
    updatedHtmlContent: string
  ) => {
    try {
      setLoading(true);
      const response = await putAssignmentVersion(
        assignmentVersionId,
        updatedHtmlContent
      );
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePutAssignmentVersion };
};

export default usePutAssignmentVersion;
