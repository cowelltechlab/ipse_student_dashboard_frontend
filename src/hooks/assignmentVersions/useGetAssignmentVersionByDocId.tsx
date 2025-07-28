import { useEffect, useState } from "react";
import type { AssignmentVersionData } from "../../types/AssignmentVersionTypes";
import type { ErrorType } from "../../types/ErrorType";
import { getDocumentByDocId } from "../../services/assignmentVersionServices";

const useGetAssignmentVersionByDocId = (documentId: string | null) => {
  const [assignmentVersion, setAssignmentVerion] =
    useState<AssignmentVersionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!documentId) return;

    const fetchAssignmentVersion = async () => {
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
    };

    fetchAssignmentVersion();
  }, [documentId]);

  return { assignmentVersion, loading, error };
};

export default useGetAssignmentVersionByDocId;
