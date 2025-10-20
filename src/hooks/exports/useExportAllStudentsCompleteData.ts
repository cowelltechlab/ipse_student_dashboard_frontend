import { useState } from "react";
import { exportAllStudentsCompleteData, triggerDownload } from "../../services/exportServices";
import type { ErrorType } from "../../types/ErrorType";

const useExportAllStudentsCompleteData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const downloadAllStudentsData = async (
    studentIds?: number[],
    assignmentIds?: number[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      const blob = await exportAllStudentsCompleteData(studentIds, assignmentIds);

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `all_students_export_${timestamp}.zip`;

      triggerDownload(blob, filename);
    } catch (e) {
      console.error("Error downloading all students data:", e);
      setError(e as ErrorType);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { downloadAllStudentsData, loading, error };
};

export default useExportAllStudentsCompleteData;
