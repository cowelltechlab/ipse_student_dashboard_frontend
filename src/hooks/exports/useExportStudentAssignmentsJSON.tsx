import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { exportStudentAssignmentsJSON, triggerDownload } from "../../services/exportServices";

const useExportStudentAssignmentsJSON = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleExportJSON = async (studentId: number, assignmentIds?: number[]) => {
    try {
      setLoading(true);
      setError(null);

      const blob = await exportStudentAssignmentsJSON(studentId, assignmentIds);

      const filename = assignmentIds?.length
        ? `student_${studentId}_assignments_${assignmentIds.join("_")}.json`
        : `student_${studentId}_all_assignments.json`;

      triggerDownload(blob, filename);

      return true;
    } catch (e) {
      console.error("Failed to export student assignments as JSON:", e);
      const error = e as ErrorType;
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleExportJSON, loading, error };
};

export default useExportStudentAssignmentsJSON;
