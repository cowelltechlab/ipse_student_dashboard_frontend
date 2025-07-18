import type { AssignmentDetailType, AssignmentTypeListType } from "../types/AssignmentTypes";
import apiClient from "./apiClient";

export const getAssignments = async () => {
  // const params = new URLSearchParams();
  // if (dateRange) {
  //   params.append("startDate", dateRange[0].toISOString());
  //   params.append("endDate", dateRange[1].toISOString());
  // }
  // if (searchTerm && searchTerm.trim() !== "") {
  //   params.append("searchTerm", searchTerm);
  // }

  const response = await apiClient.get("/assignments");
  return response.data;
};


export const postManyAssignments = async (assignmentData: {
  student_ids: number[];
  title: string;
  class_id: number;
  file: File;
  assignment_type_id: number;
}): Promise<AssignmentDetailType[]> => {
  const formData = new FormData();

  assignmentData.student_ids.forEach(id => {
    formData.append("student_ids", id.toString()); // Append each ID individually as a string
  });

  formData.append("title", assignmentData.title);
  formData.append("class_id", assignmentData.class_id.toString());
  formData.append("file", assignmentData.file);
  formData.append("assignment_type_id", assignmentData.assignment_type_id.toString());

  const response = await apiClient.post("/assignments/upload/bulk", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}


export const postAssignment = async (assignmentData: {
  student_id: number;
  title: string;
  class_id: number;
  file: File;
  assignment_type_id: number;
}): Promise<AssignmentDetailType> => {
  const formData = new FormData();

  formData.append("student_id", assignmentData.student_id.toString());
  formData.append("title", assignmentData.title);
  formData.append("class_id", assignmentData.class_id.toString());
  formData.append("file", assignmentData.file);
  formData.append("assignment_type_id", assignmentData.assignment_type_id.toString());

  const response = await apiClient.post("/assignments/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}


export const getAssignmentTypes = async (): Promise<AssignmentTypeListType> => {
  const response = await apiClient.get("/assignments/types");
  return response.data;
};