import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { exportStudentAssignmentsZIP, triggerDownload } from "../../services/exportServices";

const useExportStudentAssignmentsZIP = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleExportZIP = async (studentId: number, assignmentIds?: number[]) => {
    try {
      setLoading(true);
      setError(null);

      const blob = await exportStudentAssignmentsZIP(studentId, assignmentIds);

      const filename = assignmentIds?.length
        ? `student_${studentId}_assignments_${assignmentIds.join("_")}.zip`
        : `student_${studentId}_all_assignments.zip`;

      triggerDownload(blob, filename);

      return true;
    } catch (e) {
      console.error("Failed to export student assignments as ZIP:", e);
      const error = e as ErrorType;
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleExportZIP, loading, error };
};

export default useExportStudentAssignmentsZIP;
