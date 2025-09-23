import { useState, useEffect } from "react";
import { getExistingRatingData } from "../../services/assignmentRatingServices";
import type { ExistingRatingDataResponse } from "../../types/AssignmentRatingTypes";
import type { ErrorType } from "../../types/ErrorType";

const useGetExistingRatingData = (assignment_version_id: string) => {
  const [existingRatingData, setExistingRatingData] = useState<ExistingRatingDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchExistingRatingData = async () => {
      if (!assignment_version_id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getExistingRatingData(assignment_version_id);
        setExistingRatingData(data);
      } catch (e) {
        const errorObj = e as ErrorType;
        // If it's a 404, it means no existing data, which is not an error
        if (errorObj.code !== '404') {
          setError(errorObj);
        }
        setExistingRatingData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingRatingData();
  }, [assignment_version_id]);

  return { existingRatingData, loading, error };
};

export default useGetExistingRatingData;