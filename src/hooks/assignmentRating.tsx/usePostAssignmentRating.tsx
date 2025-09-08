import { useState } from "react";
import { postAssignmentRating } from "../../services/assignmentRatingServices";
import type { RatingUpdateRequest } from "../../types/AssignmentRatingTypes";
import type { ErrorType } from "../../types/ErrorType";

const usePostAssignmentRating = () => {
  const [loading, setLoading] = useState(false);

  const handlePostAssignmentRating = async (
    assignment_version_id: string,
    ratingData: RatingUpdateRequest
  ) => {
    try {
      setLoading(true);
      const response = await postAssignmentRating(
        assignment_version_id,
        ratingData
      );
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostAssignmentRating };
};

export default usePostAssignmentRating;
