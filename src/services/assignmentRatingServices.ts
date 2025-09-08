import type { RatingUpdateRequest } from "../types/AssignmentRatingTypes";
import apiClient from "./apiClient";

export const getAssignmentRatingDetails = async (assignment_version_id: string) => {
    const response = await apiClient.get(`/rating-and-feedback/${assignment_version_id}`);
    return response.data;
}

export const postAssignmentRating = async (assignment_version_id: string, ratingData: RatingUpdateRequest) => {
    const response = await apiClient.post(`/rating-and-feedback/${assignment_version_id}`, ratingData);
    return response.data;
}