import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignments } from "../../services/assignmentServices";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";

const useAssignments = (studentId?: number | null) => {
  const [assignments, setAssignments] = useState<AssignmentDetailType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignments(studentId ?? undefined);
        setAssignments(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if studentId is a number or undefined
    if (studentId !== null) {
      fetchAssignments();
    } else {
      setLoading(false);
      setAssignments([]);
    }
  }, [studentId]);

  return { assignments, loading, error };
};

export default useAssignments;
