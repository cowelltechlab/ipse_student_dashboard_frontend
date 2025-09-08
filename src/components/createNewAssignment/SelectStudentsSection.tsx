import { Fieldset, Field, VStack, HStack } from "@chakra-ui/react";
import { useState } from "react";
import CreateAssignmentStudentCardGrid from "./selectStudents/CreateAssignmentStudentCardGrid";
import StudentYearButtons from "../common/filterButtons/StudentYearButtons";
import SearchBar from "../common/searchBar/SearchBar";
import useStudents from "../../hooks/students/useStudents";

interface SelectStudentsSectionProps {
  selectedStudentIds: Set<number>; // number[];
  setSelectedStudentIds: React.Dispatch<React.SetStateAction<Set<number>>> 
}

const SelectStudentsSection = ({
  selectedStudentIds,
  setSelectedStudentIds,
}: SelectStudentsSectionProps) => {
  const [yearName, setYearName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const {
    students, loading, error
    }  = useStudents()

  const handleOnStudentClick = (clickedStudentId: number | null) => {

    setSelectedStudentIds((prevSelectedIds: Set<number>) => {
      const newSet = new Set(prevSelectedIds); 
      const studentId = Number(clickedStudentId);

      if (newSet.has(studentId)) {
        newSet.delete(studentId); 
      } else {
        newSet.add(studentId);   
      }
      return newSet; 
    });
  };


  return (
    <VStack flex="1">
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label fontWeight="bold" fontSize="lg">
              Select Students
            </Field.Label>
          </Field.Root>

          <HStack justifyContent="space-between">
            <StudentYearButtons 
            selectedYear={yearName}
            onYearChange={
              (selectedYearName: string | null) => setYearName(selectedYearName)
            }
          />
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search student..."
          />
          </HStack>
          
          <Field.Root>
            <CreateAssignmentStudentCardGrid
              searchTerm={searchTerm}
              yearName={yearName}
              loading={loading}
              error={error}
              selectedStudentIds={selectedStudentIds}
              students={students}
              onStudentClick={handleOnStudentClick}
            />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default SelectStudentsSection;
