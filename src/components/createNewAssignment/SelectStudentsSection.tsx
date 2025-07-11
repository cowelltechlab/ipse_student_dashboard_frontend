import { Fieldset, Field, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CreateAssignmentStudentCardGrid from "./selectStudents/CreateAssignmentStudentCardGrid";
import StudentYearButtons from "../common/filterButtons/StudentYearButtons";
import useRoles from "../../hooks/roles/useRoles";
import useUsers from "../../hooks/users/useUsers";

interface SelectStudentsSectionProps {
  selectedStudentIds: Set<number>; // number[];
  setSelectedStudentIds: React.Dispatch<React.SetStateAction<Set<number>>> 
}

const SelectStudentsSection = ({
  selectedStudentIds,
  setSelectedStudentIds,
}: SelectStudentsSectionProps) => {
  const [yearName, setYearName] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const { roles } = useRoles();
  const studentRole = roles.find((role) => role.role_name === "Student");

  const {
    users: students,
    loading,
    error,
  } = useUsers(refetchTrigger, studentRole?.id ?? undefined);

  const handleOnStudentClick = (clickedStudentId: number | null) => {
    console.log("Selected student ID:", clickedStudentId);

    setSelectedStudentIds((prevSelectedIds: Set<number>) => {
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

          <StudentYearButtons 
            selectedYear={yearName}
            onYearChange={
              (selectedYearName: string | null) => setYearName(selectedYearName)
            }
          />
          <Field.Root>
            <CreateAssignmentStudentCardGrid
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
