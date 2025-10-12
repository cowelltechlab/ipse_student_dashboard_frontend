import type {
  StudentDetailsType,
  StudentGroupTypeUpdate,
  StudentPptUrlsUpdate,
} from "../types/StudentGroupTypes";
import apiClient from "./apiClient";

export const getStudentsWithDetails = async (): Promise<
  StudentDetailsType[]
> => {
  const response = await apiClient.get("/student-groups/");
  return response.data;
};

export const updateStudentGroupType = async (
  student_id: number,
  data: StudentGroupTypeUpdate
): Promise<StudentDetailsType> => {
  const response = await apiClient.patch(
    `/student-groups/${student_id}/group-type`,
    data
  );
  return response.data;
};

export const updateStudentPptUrls = async (
  student_id: number,
  data: StudentPptUrlsUpdate
): Promise<StudentDetailsType> => {
  const response = await apiClient.patch(
    `/student-groups/${student_id}/ppt-urls`,
    data
  );
  return response.data;
};

