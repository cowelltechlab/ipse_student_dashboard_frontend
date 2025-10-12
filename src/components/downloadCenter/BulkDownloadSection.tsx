import { Box, Grid, Heading } from "@chakra-ui/react";
import { FaFileCsv, FaFileCode } from "react-icons/fa";
import DownloadCard from "./DownloadCard";
import useDownloadAllStudentProfiles from "../../hooks/studentProfiles/useDownloadAllStudentProfiles";
import { toaster } from "../ui/toaster";

const BulkDownloadSection = () => {
  const { downloadProfiles, loading } =
    useDownloadAllStudentProfiles();

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

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Bulk Profile Exports
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
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
      </Grid>
    </Box>
  );
};

export default BulkDownloadSection;
