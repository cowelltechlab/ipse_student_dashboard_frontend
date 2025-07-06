import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import StudentYearButtons from "../../../../common/filterButtons/StudentYearButtons";
import SearchBar from "../../../../common/searchBar/SearchBar";
import { useState } from "react";
import type { StudentType } from "../../../../../types/StudentTypes";

interface StudentListProps {
  students: StudentType[];
  selectedStudentIds: number[];
  toggleSelectStudentId: (id: number) => void;
}

const StudentList = ({ students, selectedStudentIds, toggleSelectStudentId }: StudentListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearName, setYearName] = useState<string | null>(null);

  //   Filter users based on search term and year
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();

    const matchesSearch = fullName.includes(searchTerm?.toLowerCase() || "");
    const matchesYear = yearName ? student.year_name == yearName : true;
    return matchesSearch && matchesYear;
  });

  return (
    <Box>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StudentYearButtons
        selectedYear={yearName}
        onYearChange={(selectedYearId: string | null) =>
          setYearName(selectedYearId)
        }
      />

      {filteredStudents.length > 0 ? (
        <SimpleGrid columns={5} gap={6}>
          {filteredStudents.map((student) => (
            <Box
              key={student.id}
              onClick={() => toggleSelectStudentId(Number(student.id))}
              w="100%"
              bg={
                selectedStudentIds.includes(Number(student.id))
                  ? "#f2c5b5"
                  : "white"
              }
              boxShadow="2px 2px 8px rgba(0, 0, 0, 0.55)"
              borderRadius="md"
              p={2}
              h="100%"
              minH="100px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading size="md" textAlign="center">
                {student.first_name} {student.last_name}
              </Heading>
              <Text>{student.year_name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Box color="gray.500">No students assigned.</Box>
      )}
    </Box>
  );
};

export default StudentList;
