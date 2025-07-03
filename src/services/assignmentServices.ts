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


export const postAssignment = async (assignmentData: {
  student_id: number;
  title: string;
  class_id: number;
  file: File;
}): Promise<void> => {
  const formData = new FormData();
  formData.append("student_id", assignmentData.student_id.toString());
  formData.append("title", assignmentData.title);
  formData.append("class_id", assignmentData.class_id.toString
());
  formData.append("file", assignmentData.file);

  const response = await apiClient.post("/assignments/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}