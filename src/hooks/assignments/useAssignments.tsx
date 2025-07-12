import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignments } from "../../services/assignmentServices";
import type { AssignmentBaseType } from "../../types/AssignmentTypes";

const useAssignments = (

) => {
  const [assignments, setAssignments] = useState<AssignmentBaseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignments(
         
        );
        setAssignments(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return { assignments, loading, error };
};


export default useAssignments;
