import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignment } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const useAssignment = (assignmentId: number) => {
  const [assignment, setAssignment] = useState<AssignmentDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignment(assignmentId);
        console.log(response)
        setAssignment(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setAssignment(null);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if assignmentId is a number
    if (assignmentId !== null) {
      fetchAssignments();
    } else {
      setLoading(false);
      setAssignment(null);
    }
  }, [assignmentId]);

  return { assignment, loading, error };
};

export default useAssignment;
