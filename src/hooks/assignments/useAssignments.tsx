import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignments } from "../../services/assignmentServices";
import type { AssignmentBasicType } from "../../types/AssignmentTypes";

const useAssignments = (studentId?: number | null, refetchTrigger?: number, ) => {
  const [assignments, setAssignments] = useState<AssignmentBasicType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignments(studentId ?? undefined);
        console.log(response)
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
  }, [studentId, refetchTrigger]);

  return { assignments, loading, error };
};

export default useAssignments;
