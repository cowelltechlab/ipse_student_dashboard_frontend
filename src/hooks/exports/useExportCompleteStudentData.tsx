import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { exportCompleteStudentData, triggerDownload } from "../../services/exportServices";

const useExportCompleteStudentData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleExportComplete = async (studentId: number, assignmentIds?: number[]) => {
    try {
      setLoading(true);
      setError(null);

      const blob = await exportCompleteStudentData(studentId, assignmentIds);

      const filename = assignmentIds?.length
        ? `student_${studentId}_complete_data_${assignmentIds.join("_")}.zip`
        : `student_${studentId}_complete_data.zip`;

      triggerDownload(blob, filename);

      return true;
    } catch (e) {
      console.error("Failed to export complete student data:", e);
      const error = e as ErrorType;
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleExportComplete, loading, error };
};

export default useExportCompleteStudentData;
