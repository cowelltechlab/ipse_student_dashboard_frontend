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
  console.log("getStudentsWithDetails response:", response.data);
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
  console.log("updateStudentGroupType response:", response.data);
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
  console.log("updateStudentPptUrls response:", response.data);
  return response.data;
};

export const updateStudentEmails = async (
  student_id: number,
  data: { email?: string; gt_email?: string }
): Promise<StudentDetailsType> => {
  const response = await apiClient.patch(
    `/student-groups/${student_id}/emails`,
    data
  );

  console.log("updateStudentEmails response:", response.data);
  return response.data;
};
