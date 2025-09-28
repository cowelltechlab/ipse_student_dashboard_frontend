"use client";

import { Box, Button, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import SearchBar from "../../../common/searchBar/SearchBar";
import StudentVersionsTable from "./StudentVersionsTable";
import StudentVersionsFilterButtons from "./StudentVersionsFilterButtons";
import PowerPointUrlsModal from "./PowerPointUrlsModal";
import useStudentsWithDetails from "../../../../hooks/studentGroups/useStudentsWithDetails";
import type { StudentDetailsType } from "../../../../types/StudentGroupTypes";
import useDownloadAllStudentProfiles from "../../../../hooks/studentProfiles/useDownloadAllStudentProfiles";

const StudentVersionsTab = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const { students, loading, error } = useStudentsWithDetails(refetchTrigger);

  const [searchTerm, setSearchTerm] = useState("");
  const [groupTypeFilter, setGroupTypeFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentDetailsType | null>(null);

  const { downloadProfiles, loading: downloading } =
    useDownloadAllStudentProfiles();

  const handleDownloadProfileData = () => {
    downloadProfiles();
  };

  const handlePptClick = (student: StudentDetailsType) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleStudentUpdate = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  const handleModalUpdate = () => {
    handleStudentUpdate();
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Students..."
        />
        <Spacer />
        <Button
          bg={"#bd4f23"}
          _hover={{ bg: "#A43E1E" }}
          color={"white"}
          onClick={handleDownloadProfileData}
          loading={downloading}
          borderRadius={"lg"}
        >
          Download Profile Information
        </Button>
      </HStack>

      <StudentVersionsFilterButtons setGroupTypeFilter={setGroupTypeFilter} />

      <StudentVersionsTable
        students={students}
        studentsLoading={loading}
        studentsError={error}
        searchTerm={searchTerm}
        groupTypeFilter={groupTypeFilter}
        onPptClick={handlePptClick}
        onStudentUpdate={handleStudentUpdate}
      />

      <PowerPointUrlsModal
        open={modalOpen}
        setOpen={setModalOpen}
        student={selectedStudent}
        onUpdate={handleModalUpdate}
      />
    </Box>
  );
};

export default StudentVersionsTab;
