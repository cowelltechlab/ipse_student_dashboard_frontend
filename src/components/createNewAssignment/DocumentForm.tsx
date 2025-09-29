import {
  VStack,
  Fieldset,
  Field,
  Input,
} from "@chakra-ui/react";
import useClasses from "../../hooks/classes/useClasses";
import ClassDropdown from "../common/classDropdown/ClassDropdown";
import AssignmentTypeSelectDropdown from "../common/assignments/AssignmentTypeSelectDropdown";

interface DocumentFormProps {
  title: string;
  setTitle: (title: string) => void;
  assignmentTypeId: number | null;
  setAssignmentTypeId: (id: number | null) => void;
  classId: number | null;
  setClassId: (selection: number | null) => void; //(id: number) => void;
  classRefetch: number;
  setAddClassModalOpen: (setValue: boolean) => void;
  studentId?: number | null;
}

const DocumentForm = ({
  title,
  setTitle,
  assignmentTypeId,
  setAssignmentTypeId,
  classId,
  setClassId,
  classRefetch,
  setAddClassModalOpen,
  studentId,
}: DocumentFormProps) => {
  const { classes } = useClasses(classRefetch, studentId);

  return (
    <VStack flex="1" align="stretch">
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label fontWeight="bold" fontSize="lg">
              Document Name
            </Field.Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter name for the document..."
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              _hover={{
                borderColor: "gray.300",
              }}
              width="100%"
              appearance="none"
            />
          </Field.Root>

          <AssignmentTypeSelectDropdown
            assignmentTypeId={assignmentTypeId}
            setAssignmentTypeId={setAssignmentTypeId}
          />

          <Field.Root mt={4}>
            <Field.Label fontWeight="bold" fontSize="lg">
              Select Class
            </Field.Label>
            <ClassDropdown
              selectedClassId={classId}
              setSelectedClassId={setClassId}
              openClassAddModal={() => setAddClassModalOpen(true)}
              classes={classes}
            />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default DocumentForm;
