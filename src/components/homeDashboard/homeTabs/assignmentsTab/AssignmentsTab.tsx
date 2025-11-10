"use client";

import { Box, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import SearchBar from "../../../common/searchBar/SearchBar";
import TextButton from "../../../common/universal/TextButton";
import AssignmentsTable from "./AssignmentsTable";
import AssignmentsFilterButtons from "./AssignmentsFilterButtons";
import AssignmentsSortDropdown, {
  type SortOption,
} from "../../../common/assignments/AssignmentsSortDropdown";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import useAssignments from "../../../../hooks/assignments/useAssignments";
import useClasses from "../../../../hooks/classes/useClasses";

const AssignmentsTab = () => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [classesRefetchTrigger, setClassesRefetchTrigger] = useState(0);

  const { assignments, loading, error } = useAssignments(
    undefined,
    refetchTrigger
  );
  const { classes } = useClasses(classesRefetchTrigger);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [filterByNeedsRating, setFilterByNeedsRating] =
    useState<boolean>(false);

  const [filterByNotFinalized, setFilterByNotFinalized] =
    useState<boolean>(false);

  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);

  const navigate = useNavigate();

  const handleCreateAssignment = () => {
    navigate("/create-assignment");
  };

  const handleNavigateAssignmentPage = (
    studentId: number,
    assignmentId: number
  ) => {
    navigate(`/student/${studentId}/assignment/${assignmentId}`);
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack px={4}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Assignments..."
        />
        <Spacer />
        <TextButton color="#bd4f23" onClick={handleCreateAssignment}>
          <HStack gap={1}>
            <IoIosAddCircle color="#bd4f23" />
            Create New Assignment
          </HStack>
        </TextButton>
      </HStack>

      <HStack px={4} gap={3}>
        <AssignmentsFilterButtons
          dateRange={dateRange}
          setDateRange={setDateRange}
          setFilterByNeedsRating={setFilterByNeedsRating}
          setFilterByNotFinalized={setFilterByNotFinalized}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          classes={classes}
          openClassAddModal={() => setClassesRefetchTrigger((prev) => prev + 1)}
        />
        <Spacer />
        <Box minW="250px">
          <AssignmentsSortDropdown
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </Box>
      </HStack>

      <AssignmentsTable
        assignments={assignments}
        assignmentsLoading={loading}
        assignmentsError={error}
        dateRange={dateRange}
        searchTerm={searchTerm}
        selectedClassId={selectedClassId}
        onAssignmentClick={handleNavigateAssignmentPage}
        filterByNeedsRating={filterByNeedsRating}
        filterByNotFinalized={filterByNotFinalized}
        selectedSort={selectedSort}
        triggerAssignmentsRefetch={() => setRefetchTrigger((prev) => prev + 1)}
      />
    </Box>
  );
};

export default AssignmentsTab;
