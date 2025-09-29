  import { useState } from "react";
  import type { ErrorType } from "../../types/ErrorType";    
  import { downloadAllStudentProfiles } from
  "../../services/studentProfileServices";

  const useDownloadAllStudentProfiles = () => {
    const [loading, setLoading] =
  useState<boolean>(false);
    const [error, setError] = useState<ErrorType |
  null>(null);

    const downloadProfiles = async (format: 'csv' |
  'json' = 'csv') => {
      try {
        setLoading(true);
        setError(null);

        const blob = await
        downloadAllStudentProfiles(format);

        // Automatically trigger browser download
        const url = window.URL.createObjectURL(blob);        
        const link = document.createElement('a');
        link.href = url;
        link.download = `student_profiles.${format}`;        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (e) {
        console.error("Error downloading student  profiles:", e);
        setError(e as ErrorType);
      } finally {
        setLoading(false);
      }
    };

    return { downloadProfiles, loading, error };
  };

    export default useDownloadAllStudentProfiles;