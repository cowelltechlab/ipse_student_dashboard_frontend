import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignmentTypes } from "../../services/assignmentServices";
import type { AssignmentTypeListType } from "../../types/AssignmentTypes";

const useAssignmentTypes = () => {
  const [assignmentTypes, setAssignmentTypes] = useState<AssignmentTypeListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignmentTypes();
        setAssignmentTypes(response);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setAssignmentTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return { assignmentTypes, loading, error };
};


export default useAssignmentTypes;
