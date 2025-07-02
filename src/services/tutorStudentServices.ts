import type { TutorStudentsType } from "../types/TutorStudents";
import apiClient from "./apiClient";

export const getTutorStudentsById = async (
  tutorId: number
): Promise<TutorStudentsType[]> => {
  const response = await apiClient.get(`/tutor-students/${tutorId}`);
  return response.data;
};
