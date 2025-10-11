import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../common/searchBar/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../../common/universal/TextButton";
import { IoIosAddCircle } from "react-icons/io";
import AssignmentsFilterButtons from "../../homeDashboard/homeTabs/assignmentsTab/AssignmentsFilterButtons";
import AssignmentsTable from "../../homeDashboard/homeTabs/assignmentsTab/AssignmetsTable";
import useAssignments from "../../../hooks/assignments/useAssignments";
import useClasses from "../../../hooks/classes/useClasses";

interface StudentDocumentBodyProps {
    studentId: number | null
}

const StudentDocumentBody = ({studentId}: StudentDocumentBodyProps) => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [classesRefetchTrigger, setClassesRefetchTrigger] = useState(0);

  const { assignments, loading, error } = useAssignments(studentId, refetchTrigger);
  const { classes } = useClasses(classesRefetchTrigger, studentId);

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

  const navigate = useNavigate();

  const handleCreateAssignment = () => {
    navigate(`/student/${studentId}/create-assignment`);
  };

  const handleNavigateAssignmentPage = (
    studentId: number,
    assignmentId: number
  ) => {
    navigate(`/student/${studentId}/assignment/${assignmentId}`);
  };

  return (
    <Box mt={10}>
      <HStack my={4}>
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
        triggerAssignmentsRefetch={() => setRefetchTrigger((prev) => prev + 1)}

      />
    </Box>
  );
};

export default StudentDocumentBody;
