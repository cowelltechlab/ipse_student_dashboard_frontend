import { Fieldset, Field, VStack } from "@chakra-ui/react";
// import StudentYearButtons from "./selectStudents/StudentYearButtons";
import { useState } from "react";
import CreateAssignmentStudentCardGrid from "./selectStudents/CreateAssignmentStudentCardGrid";
import StudentYearButtons from "../common/filterButtons/StudentYearButtons";

interface SelectStudentsSectionProps {
  studentIds: Set<number>; // number[];
  setStudentIds: (ids: Set<number>) => void; //(ids: number[]) => void;
}

const SelectStudentsSection = ({
  studentIds,
  setStudentIds,
}: SelectStudentsSectionProps) => {
  const [yearId, setYearId] = useState<number | null>(null);

  const handleOnStudentClick = (clickedStudentId: string) => {
    console.log(clickedStudentId);
    const studentId = Number(clickedStudentId);

    // TODO: move if-statement into here so it doesn't return an updater function

    setStudentIds((prevSelectedIds: Set<number>) => {
      const newSet = new Set(prevSelectedIds); // Create a new Set from the previous one
      const studentId = Number(clickedStudentId);
      if (newSet.has(studentId)) {
        newSet.delete(studentId); // Deselect
      } else {
        newSet.add(studentId);   // Select
      }
      return newSet; // Return the new Set
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
          {/* <StudentYearButtons
            selectedYear={yearId}
            onYearChange={(selectedYearId: number | null) =>
              setYearId(selectedYearId)
            }
          /> */}
          <StudentYearButtons 
            selectedYear={yearId}
            onYearChange={
              (selectedYearId: number | null) => setYearId(selectedYearId)
            }
          />
          <Field.Root>
            <CreateAssignmentStudentCardGrid
              year_id={yearId}
              onStudentClick={handleOnStudentClick}
            />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default SelectStudentsSection;
