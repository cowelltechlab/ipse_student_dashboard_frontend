import {
    Fieldset,
    Field,
    VStack
} from "@chakra-ui/react"
import StudentYearButtons from "./selectStudents/StudentYearButtons";
import { useState } from "react";
import CreateAssignmentStudentCardGrid from "./selectStudents/CreateAssignmentStudentCardGrid";

const SelectStudentsSection = () => {
    const [yearId, setYearId] = useState<number | null>(null);
    
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
                        selectedYear={yearId}
                        onYearChange={(selectedYearId: number | null) =>
                            setYearId(selectedYearId)
                        }
                    />
                    <Field.Root>
                        <CreateAssignmentStudentCardGrid
                            year_id={yearId}
                            onStudentClick={() => console.log(yearId)}
                        />
                    </Field.Root>
                </Fieldset.Content>
            </Fieldset.Root>
        </VStack>
    );
}

export default SelectStudentsSection;