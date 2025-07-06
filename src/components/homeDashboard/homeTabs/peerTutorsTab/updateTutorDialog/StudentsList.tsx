import {
  Box,
  Heading,
  HStack,
  Wrap,
  WrapItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import StudentYearButtons from "../../../../common/filterButtons/StudentYearButtons";
import SearchBar from "../../../../common/searchBar/SearchBar";
import { useState } from "react";
import type { StudentType } from "../../../../../types/StudentTypes";

interface StudentListProps {
  students: StudentType[];
  selectedStudentIds: number[];
  toggleSelectStudentId: (id: number) => void;
}

const StudentList = ({
  students,
  selectedStudentIds,
  toggleSelectStudentId,
}: StudentListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearName, setYearName] = useState<string | null>(null);

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesYear = yearName ? student.year_name === yearName : true;
    return matchesSearch && matchesYear;
  });

  return (
    <Box px={6}>
      <HStack my={6} wrap="wrap">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search student..."
        />
        <Spacer />
        <StudentYearButtons
          selectedYear={yearName}
          onYearChange={(selectedYearId: string | null) =>
            setYearName(selectedYearId)
          }
        />
      </HStack>

      {filteredStudents.length > 0 ? (
        <Wrap  my={10} justify="center">
          {filteredStudents.map((student) => (
            <WrapItem key={student.id}>
              <Box
                onClick={() => toggleSelectStudentId(Number(student.id))}
                bg={
                  selectedStudentIds.includes(Number(student.id))
                    ? "#f2c5b5"
                    : "white"
                }
                boxShadow="2px 2px 8px rgba(0, 0, 0, 0.55)"
                borderRadius="md"
                p={4}
                m ={3}
                minW="220px"
                maxW="250px"
                cursor="pointer"
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
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Box color="gray.500">No students found.</Box>
      )}
    </Box>
  );
};

export default StudentList;
