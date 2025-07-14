import {
  VStack,
  Fieldset,
  Field,
  Input,
  NativeSelect,
  For,
  Icon,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import useClasses from "../../hooks/classes/useClasses";
import useAssignmentTypes from "../../hooks/assignments/useAssignmentTypes";
import { useEffect, useState } from "react";
import type { AssignmentTypeListType } from "../../types/AssignmentTypes";
import ClassDropdown from "../common/classDropdown/ClassDropdown";

interface DocumentFormProps {
  title: string;
  setTitle: (title: string) => void;
  assignmentTypeId: number | null;
  setAssignmentTypeId: (id: number | null) => void;
  classId: number | null;
  setClassId: (selection: number | null) => void; //(id: number) => void;
  classRefetch: number;
  // setClassRefetch: (value: number) => void;
  setAddClassModalOpen: (setValue: boolean) => void;
}

const DocumentForm = ({
  title,
  setTitle,
  assignmentTypeId,
  setAssignmentTypeId,
  classId,
  setClassId,
  classRefetch,
  // setClassRefetch,
  setAddClassModalOpen
}: DocumentFormProps) => {
  // const [classRefetch, setClassRefetch] = useState<number>(0);
  // const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const { classes } = useClasses(classRefetch);
  const { assignmentTypes } = useAssignmentTypes() as { assignmentTypes: AssignmentTypeListType[] };

  // TODO: Add conditional for boxes being red if neither is selected
  // useEffect(() => {
  //   if (assignmentTypes.length > 0 && assignmentTypeId === null) {
  //     setAssignmentTypeId(assignmentTypes[0].id);
  //   }
  // }, [assignmentTypes, assignmentTypeId, setAssignmentTypeId]);

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
              width="100%" // {{ base: "100%", md: "60%" }}
              appearance="none"
            />
          </Field.Root>

          <Field.Root mt={4}>
            <Field.Label fontWeight="bold" fontSize="lg">
              Select Assignment Type
            </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={assignmentTypeId ?? ""}
                onChange={(e) => setAssignmentTypeId(Number(e.target.value))}
                name="assignment-type"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                _hover={{
                  borderColor: "gray.300",
                }}
                appearance="none"
              >
                <option defaultValue="">
                  Select type
                </option>

                <For each={assignmentTypes}>
                  {(item) => (
                    <option key={item.id} value={item.id}>
                      {item.type}
                    </option>
                  )}
                </For>
              </NativeSelect.Field>
              <Icon
              as={FaChevronDown}
              position="absolute"
              right="3"
              top="30%"
              pointerEvents="none"
              color="gray.500"
              boxSize="4"
            />
            </NativeSelect.Root>  
          </Field.Root>

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
            {/* <NativeSelect.Root>
              <NativeSelect.Field
                value={classId ?? ""}
                onChange={(e) => setClassId(Number(e.target.value))}
                name="class"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                _hover={{
                  borderColor: "gray.300",
                }}
                appearance="none"
              >
                <option defaultValue="" disabled hidden>
                  Select class
                </option>
                <For each={classes}>
                  {(classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name} | {classItem.type} | {classItem.term}
                    </option>
                  )}
                </For>
              </NativeSelect.Field>
              <Icon
                as={FaChevronDown}
                position="absolute"
                right="3"
                top="30%"
                pointerEvents="none"
                color="gray.500"
                boxSize="4"
              />
            </NativeSelect.Root> */}
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default DocumentForm;
