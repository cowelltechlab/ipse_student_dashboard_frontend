import type { TutorStudentsType } from "../types/TutorStudents";
import apiClient from "./apiClient";

export const getTutorStudentsById = async (
  tutorId: number
): Promise<TutorStudentsType[]> => {
  const response = await apiClient.get(`/tutor-students/${tutorId}`);
  return response.data;
};

export const syncTutorStudents = async (
  tutor_id: number,
  student_ids: number[]
): Promise<{
  message: string;
  added_student_ids: number[];
  removed_student_ids: number[];
}> => {
  const response = await apiClient.post("/tutor-students/sync", {
    tutor_id,
    student_ids,
  });
  return response.data;
};
