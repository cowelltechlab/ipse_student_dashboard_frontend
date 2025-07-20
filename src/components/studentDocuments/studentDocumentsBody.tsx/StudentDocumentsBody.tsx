import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../common/searchBar/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../../common/universal/TextButton";
import { IoIosAddCircle } from "react-icons/io";
import AssignmentsFilterButtons from "../../homeDashboard/homeTabs/assignmentsTab/AssignmentsFilterButtons";

const StudentDocumentBody = () => {
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
    navigate("/create-assignment");
  };

  return (
    <Box>
      <HStack>
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
      />
    </Box>
  );
};

export default StudentDocumentBody