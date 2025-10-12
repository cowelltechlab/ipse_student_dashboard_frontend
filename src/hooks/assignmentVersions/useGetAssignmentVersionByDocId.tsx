import { useEffect, useState, useCallback } from "react";
import type { AssignmentVersionData } from "../../types/AssignmentVersionTypes";
import type { ErrorType } from "../../types/ErrorType";
import { getDocumentByDocId } from "../../services/assignmentVersionServices";

const useGetAssignmentVersionByDocId = (documentId: string | null, refetchTrigger?: number) => {
  const [assignmentVersion, setAssignmentVerion] =
    useState<AssignmentVersionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetchAssignmentVersion = useCallback(async () => {
    if (!documentId) return;

    try {
      setLoading(true);
      const response = await getDocumentByDocId(documentId);
      setAssignmentVerion(response);
    } catch (e) {
      console.error(e);
      setError(e as ErrorType);
      setAssignmentVerion(null);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchAssignmentVersion();
  }, [fetchAssignmentVersion, refetchTrigger]);

  return { assignmentVersion, loading, error, refetch: fetchAssignmentVersion };
};

export default useGetAssignmentVersionByDocId;
