import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { AssignmentVersionData } from "../../types/AssignmentModificationTypes";
import { getAssignmentVersionOptions } from "../../services/assignmentVersionServices";

const useAssignmentVersionOptions = (assignmentId?: number) => {
  const [versionOptions, setsetVersionOptions] =
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
        const response = await getAssignmentVersionOptions(assignmentId);
        console.log(response);

        setsetVersionOptions(response);
      } catch (e) {
        console.error(e);
        const error = e as ErrorType;
        setError(error);
        setsetVersionOptions(null);
      } finally {
        setLoading(false);
      }
    };

    handleFetchAssignmentVersionOptions();
  }, [assignmentId]);

  return { versionOptions, loading, error };
};

export default useAssignmentVersionOptions;
