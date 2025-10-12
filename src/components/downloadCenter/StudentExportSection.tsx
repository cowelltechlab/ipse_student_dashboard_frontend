import { Box, Grid, Heading, NativeSelect } from "@chakra-ui/react";
import { FaFileCode, FaFileArchive, FaDatabase } from "react-icons/fa";
import { useState } from "react";
import DownloadCard from "./DownloadCard";
import useExportStudentAssignmentsJSON from "../../hooks/exports/useExportStudentAssignmentsJSON";
import useExportStudentAssignmentsZIP from "../../hooks/exports/useExportStudentAssignmentsZIP";
import useExportCompleteStudentData from "../../hooks/exports/useExportCompleteStudentData";
import { toaster } from "../ui/toaster";
import useStudents from "../../hooks/students/useStudents";

const StudentExportSection = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const { students, loading: studentsLoading } = useStudents();
  const { handleExportJSON, loading: jsonLoading } = useExportStudentAssignmentsJSON();
  const { handleExportZIP, loading: zipLoading } = useExportStudentAssignmentsZIP();
  const { handleExportComplete, loading: completeLoading } = useExportCompleteStudentData();

  const handleDownloadJSON = async () => {
    if (!selectedStudentId) {
      toaster.create({
        description: "Please select a student first",
        type: "warning",
      });
      return;
    }

    const success = await handleExportJSON(selectedStudentId);
    if (success) {
      toaster.create({
        description: "Student assignments JSON downloaded successfully",
        type: "success",
      });
    } else {
      toaster.create({
        description: "Failed to download student assignments JSON",
        type: "error",
      });
    }
  };

  const handleDownloadZIP = async () => {
    if (!selectedStudentId) {
      toaster.create({
        description: "Please select a student first",
        type: "warning",
      });
      return;
    }

    const success = await handleExportZIP(selectedStudentId);
    if (success) {
      toaster.create({
        description: "Student assignments ZIP downloaded successfully",
        type: "success",
      });
    } else {
      toaster.create({
        description: "Failed to download student assignments ZIP",
        type: "error",
      });
    }
  };

  const handleDownloadComplete = async () => {
    if (!selectedStudentId) {
      toaster.create({
        description: "Please select a student first",
        type: "warning",
      });
      return;
    }

    const success = await handleExportComplete(selectedStudentId);
    if (success) {
      toaster.create({
        description: "Complete student data downloaded successfully",
        type: "success",
      });
    } else {
      toaster.create({
        description: "Failed to download complete student data",
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Individual Student Exports
      </Heading>

      <Box mb={6}>
        <NativeSelect.Root size="lg" disabled={studentsLoading}>
          <NativeSelect.Field
            value={selectedStudentId?.toString() || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = e.target.value;
              setSelectedStudentId(value ? Number(value) : null);
            }}
          >
            <option value="">Select a student...</option>
            {students?.map((student) => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={4}
      >
        <DownloadCard
          title="Assignments (JSON)"
          description="Download all assignments for this student as structured JSON data."
          icon={FaFileCode}
          onDownload={handleDownloadJSON}
          loading={jsonLoading}
          disabled={!selectedStudentId}
        />

        <DownloadCard
          title="Assignments (Word Docs)"
          description="Download all assignments as a ZIP archive containing Word documents."
          icon={FaFileArchive}
          onDownload={handleDownloadZIP}
          loading={zipLoading}
          disabled={!selectedStudentId}
        />

        <DownloadCard
          title="Complete Student Data"
          description="Download student profile and all assignments in a comprehensive ZIP package."
          icon={FaDatabase}
          onDownload={handleDownloadComplete}
          loading={completeLoading}
          disabled={!selectedStudentId}
        />
      </Grid>
    </Box>
  );
};

export default StudentExportSection;
