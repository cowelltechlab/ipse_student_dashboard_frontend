import { useEffect, useState } from "react";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignmentRatingDetails } from "../../services/assignmentRatingServices";

const useGetAssignmentRatingDetails = (assignmentVersionId: string) => {
  const [assignmentRatingDetails, setAssignmentRatingDetails] =
    useState<AssignmentRatingDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignmentRatingDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAssignmentRatingDetails(assignmentVersionId);
        setAssignmentRatingDetails(response);
      } catch (e) {
        setError(e as ErrorType);
        console.error("Error fetching assignment rating details:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentRatingDetails();
  }, [assignmentVersionId]);

  return {
    assignmentRatingDetails,
    loading,
    error,
  };
};

export default useGetAssignmentRatingDetails;
