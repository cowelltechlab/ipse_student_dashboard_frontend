import { Box, Grid, Heading } from "@chakra-ui/react";
import { FaFileCsv, FaFileCode, FaFileArchive } from "react-icons/fa";
import DownloadCard from "./DownloadCard";
import useDownloadAllStudentProfiles from "../../hooks/studentProfiles/useDownloadAllStudentProfiles";
import useExportAllStudentsCompleteData from "../../hooks/exports/useExportAllStudentsCompleteData";
import { toaster } from "../ui/toaster";

const BulkDownloadSection = () => {
  const { downloadProfiles, loading } =
    useDownloadAllStudentProfiles();
  const { downloadAllStudentsData, loading: loadingCompleteData } =
    useExportAllStudentsCompleteData();

  const handleDownloadCSV = async () => {
    try {
      await downloadProfiles("csv");
      toaster.create({
        description: "Student profiles CSV downloaded successfully",
        type: "success",
      });
    } catch {
      toaster.create({
        description: "Failed to download student profiles CSV",
        type: "error",
      });
    }
  };

  const handleDownloadJSON = async () => {
    try {
      await downloadProfiles("json");
      toaster.create({
        description: "Student profiles JSON downloaded successfully",
        type: "success",
      });
    } catch {
      toaster.create({
        description: "Failed to download student profiles JSON",
        type: "error",
      });
    }
  };

  const handleDownloadAllStudentsData = async () => {
    try {
      await downloadAllStudentsData();
      toaster.create({
        description: "All students complete data downloaded successfully",
        type: "success",
      });
    } catch {
      toaster.create({
        description: "Failed to download all students data",
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Bulk Profile Exports
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={4}
      >
        <DownloadCard
          title="All Student Profiles (CSV)"
          description="Download all student profiles as a CSV spreadsheet. Ideal for Excel analysis and data processing."
          icon={FaFileCsv}
          onDownload={handleDownloadCSV}
          loading={loading}
        />

        <DownloadCard
          title="All Student Profiles (JSON)"
          description="Download all student profiles as structured JSON data. Best for programmatic use and data integration."
          icon={FaFileCode}
          onDownload={handleDownloadJSON}
          loading={loading}
        />

        <DownloadCard
          title="All Students Complete Data (ZIP)"
          description="Download comprehensive data for all students including profiles, assignments, versions, and ratings in a master ZIP file with organized folder structure."
          icon={FaFileArchive}
          onDownload={handleDownloadAllStudentsData}
          loading={loadingCompleteData}
          accentColor="#244D8A"
          warningMessage="This download may take some time due to the large amount of data being processed."
        />
      </Grid>
    </Box>
  );
};

export default BulkDownloadSection;
