import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../common/searchBar/SearchBar";
import { useState } from "react";
import StudentCardGrid from "./studentCards.tsx/StudentCardGrid";
import TextButton from "../../common/universal/TextButton";
import { CiCirclePlus } from "react-icons/ci";
import StudentYearButtons from "./StudentYearButtons";

const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearId, setYearId] = useState<number | null>(null);

  const handleCreateStudent = () => {
    // TODO: Navigate to create student page.
    console.log("Create new student clicked");
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
        onYearChange={(selectedYearId: number) => setYearId(selectedYearId)}
      />

      <StudentCardGrid
        searchTerm={searchTerm}
        year_id={yearId}
        onStudentClick={(studentId) => {
          console.log("Student clicked:", studentId);
        }}
      />
    </Box>
  );
};

export default StudentsTab;
