import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { AssignmentVersionData } from "../../types/AssignmentModificationTypes";
import { getAssignmentVersionOptions } from "../../services/assignmentVersionServices";

const useAssignmentVersionOptions = (assignmentId: string) => {
  const [versionOptions, setsetVersionOptions] = useState<AssignmentVersionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await getAssignmentVersionOptions(assignmentId);
        setsetVersionOptions(response);
      } catch (e) {
        console.error(e);
        const error = e as ErrorType;
        setError(error);
        setsetVersionOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [assignmentId]);

  return { versionOptions, loading, error };
};

export default useAssignmentVersionOptions;
