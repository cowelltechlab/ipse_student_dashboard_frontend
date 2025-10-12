import apiClient from "./apiClient";

/**
 * Helper function to trigger browser download of a blob
 */
export const triggerDownload = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Export all student profiles as CSV or JSON
 * @param format - 'csv' or 'json'
 */
export const downloadAllStudentProfiles = async (format: "csv" | "json") => {
  const response = await apiClient.get("/profile/export", {
    params: { format },
    responseType: "blob",
  });
  return response.data;
};

/**
 * Export student assignments as JSON
 * @param studentId - The student's user ID
 * @param assignmentIds - Optional array of specific assignment IDs to export
 */
export const exportStudentAssignmentsJSON = async (
  studentId: number,
  assignmentIds?: number[]
) => {
  const params = assignmentIds?.length
    ? { assignment_ids: assignmentIds.join(",") }
    : undefined;

  const response = await apiClient.get(
    `/assignments/export/student/${studentId}/json`,
    {
      params,
      responseType: "blob",
    }
  );
  return response.data;
};

/**
 * Export student assignments as ZIP file with Word documents
 * @param studentId - The student's user ID
 * @param assignmentIds - Optional array of specific assignment IDs to export
 */
export const exportStudentAssignmentsZIP = async (
  studentId: number,
  assignmentIds?: number[]
) => {
  const params = assignmentIds?.length
    ? { assignment_ids: assignmentIds.join(",") }
    : undefined;

  const response = await apiClient.get(
    `/assignments/export/student/${studentId}/download`,
    {
      params,
      responseType: "blob",
    }
  );
  return response.data;
};

/**
 * Export complete student data (profile + assignments)
 * @param studentId - The student's user ID
 * @param assignmentIds - Optional array of specific assignment IDs to include
 */
export const exportCompleteStudentData = async (
  studentId: number,
  assignmentIds?: number[]
) => {
  const params = assignmentIds?.length
    ? { assignment_ids: assignmentIds.join(",") }
    : undefined;

  const response = await apiClient.get(
    `/assignments/export/student/${studentId}/complete`,
    {
      params,
      responseType: "blob",
    }
  );
  return response.data;
};
