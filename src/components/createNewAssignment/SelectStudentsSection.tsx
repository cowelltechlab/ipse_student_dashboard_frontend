import { Fieldset, Field, VStack } from "@chakra-ui/react";
// import StudentYearButtons from "./selectStudents/StudentYearButtons";
import { useEffect, useState } from "react";
import CreateAssignmentStudentCardGrid from "./selectStudents/CreateAssignmentStudentCardGrid";
import StudentYearButtons from "../common/filterButtons/StudentYearButtons";

interface SelectStudentsSectionProps {
  studentIds: Set<number>; // number[];
  setStudentIds: React.Dispatch<React.SetStateAction<Set<number>>> // (ids: Set<number>) => void; //(ids: number[]) => void;
}

const SelectStudentsSection = ({
  studentIds,
  setStudentIds,
}: SelectStudentsSectionProps) => {
  const [yearId, setYearId] = useState<number | null>(null);

  const handleOnStudentClick = (clickedStudentId: string) => {
    // console.log("Selected student ID:", clickedStudentId);

    setStudentIds((prevSelectedIds: Set<number>) => {
      const newSet = new Set(prevSelectedIds); 
      const studentId = Number(clickedStudentId);

      if (newSet.has(studentId)) {
        // console.log("Deselected");
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
          {/* <StudentYearButtons
            selectedYear={yearId}
            onYearChange={(selectedYearId: number | null) =>
              setYearId(selectedYearId)
            }
          /> */}
          {/* <StudentYearButtons 
            selectedYear={yearId}
            onYearChange={
              (selectedYearId: number | null) => setYearId(selectedYearId)
            }
          /> */}
          <Field.Root>
            <CreateAssignmentStudentCardGrid
              year_id={yearId}
              selectedStudentIds={studentIds}
              onStudentClick={handleOnStudentClick}
            />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default SelectStudentsSection;
