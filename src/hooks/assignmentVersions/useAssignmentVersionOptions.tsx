import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { AssignmentVersionData } from "../../types/AssignmentModificationTypes";
import { getAssignmentVersionOptions } from "../../services/assignmentVersionServices";

const useAssignmentVersionOptions = (assignmentId?: number, fromVersionDocId?: string) => {
  const [versionOptions, setVersionOptions] =
    useState<AssignmentVersionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const handleFetchAssignmentVersionOptions = async () => {
      if (!assignmentId) {
        return;
      }
      try {
        setLoading(true);
        const response = await getAssignmentVersionOptions(assignmentId, fromVersionDocId);
        setVersionOptions(response);
      } catch (e) {
        console.error(e);
        const error = e as ErrorType;
        setError(error);
        setVersionOptions(null);
      } finally {
        setLoading(false);
      }
    };

    handleFetchAssignmentVersionOptions();
  }, [assignmentId, fromVersionDocId]);

  return { versionOptions, loading, error };
};

export default useAssignmentVersionOptions;
