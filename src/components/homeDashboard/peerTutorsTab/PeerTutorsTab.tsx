import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../common/searchBar/SearchBar";
import { useState } from "react";
import StudentCardGrid from "../studentsTab/studentCards.tsx/StudentCardGrid";
import TextButton from "../../common/universal/TextButton";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import StudentYearButtons from "../../common/filterButtons/StudentYearButtons";

const PeerTutorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearId, setYearId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleCreateStudent = () => {
    // TODO: Navigate to create student page.
    console.log("Create new student clicked");
  };

  const handleNavigateStudentPage = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search student..."
        />
        <Spacer />

        <TextButton onClick={handleCreateStudent}>
          <HStack gap={1}>
            <CiCirclePlus color="#bd4f23" />
            Create new Student
          </HStack>
        </TextButton>
      </HStack>

      <StudentYearButtons
        selectedYear={yearId}
        onYearChange={(selectedYearId: number | null) =>
          setYearId(selectedYearId)
        }
      />

      <StudentCardGrid
        searchTerm={searchTerm}
        year_id={yearId}
        onStudentClick={handleNavigateStudentPage}
      />
    </Box>
  );
};

export default PeerTutorsTab;
