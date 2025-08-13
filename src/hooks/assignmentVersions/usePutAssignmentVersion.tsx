import { useState } from "react";
import { putAssignmentVersion } from "../../services/assignmentVersionServices";
import type { AssignmentJson } from "../../components/assignmentModification/JsonAssignmentEditor";

const usePutAssignmentVersion = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePutAssignmentVersion = async (
    assignmentVersionId: string,
    updatedJsonContent: AssignmentJson
  ) => {
    try {
      setLoading(true);
      const response = await putAssignmentVersion(
        assignmentVersionId,
        updatedJsonContent
      );
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePutAssignmentVersion };
};

export default usePutAssignmentVersion;
