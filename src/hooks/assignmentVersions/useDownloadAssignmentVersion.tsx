import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import { getAssignmentVersionDownload } from "../../services/assignmentVersionServices";


const useDownloadAssignmentVersion = () => {
    const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType | null>(null);

    const getDownloadBlob = async (versionId: string) => {
        setLoading(true);
        setError(null);
        try {
            const blob = await getAssignmentVersionDownload(versionId);
            setDownloadBlob(blob);
            return blob;
        } catch (e) {
            setError(e as ErrorType);
            console.error("Error fetching download blob:", e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { downloadBlob, getDownloadBlob, loading, error };
};

export default useDownloadAssignmentVersion;