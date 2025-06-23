"use client";

import { Box, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import SearchBar from "../../common/searchBar/SearchBar";
import TextButton from "../../common/universal/TextButton";
import AssignmentsTable from "./AssignmetsTable";
import AssignmentsFilterButtons from "./AssignmentsFilterButtons";
import { useNavigate } from "react-router-dom";

const AssignmentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const navigate = useNavigate();

  const handleCreateAssignment = () => {
    console.log("Create new assignment clicked");
  };

  const handleNavigateAssignmentPage = (studentId: number, assignmentId: number) => {
    console.log(`Navigate to assignment page with ID: ${assignmentId} for student ID: ${studentId}`);
    navigate(`/student/${studentId}/assignment/${assignmentId}`);
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Assignments..."
        />
        <Spacer />
        <TextButton onClick={handleCreateAssignment}>
          <HStack gap={1}>
            <CiCirclePlus color="#bd4f23" />
            Create New Assignment
          </HStack>
        </TextButton>
      </HStack>

      <AssignmentsFilterButtons
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <AssignmentsTable
        dateRange={dateRange}
        searchTerm={searchTerm}
        onAssignmentClick={handleNavigateAssignmentPage}
      />
    </Box>
  );
};

export default AssignmentsTab;
