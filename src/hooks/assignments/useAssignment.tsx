import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignment } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const useAssignment = (assignmentId: number | null, refetchTrigger?:number) => {
  const [assignment, setAssignment] = useState<AssignmentDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignment(assignmentId!);
        setAssignment(response);
        setError(null);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setAssignment(null);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if assignmentId is a valid number
    if (assignmentId !== null && assignmentId !== undefined) {
      fetchAssignments();
    } else {
      setLoading(false);
      setAssignment(null);
      setError(null);
    }
  }, [assignmentId, refetchTrigger]);

  return { assignment, loading, error };
};

export default useAssignment;
