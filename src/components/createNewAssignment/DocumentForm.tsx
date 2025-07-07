import {
  VStack,
  Fieldset,
  Field,
  Input,
  Box,
  NativeSelect,
  For,
  Icon,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import useClasses from "../../hooks/classes/useClasses";
import useAssignmentTypes from "../../hooks/assignments/useAssignmentTypes";

interface DocumentFormProps {
  title: string;
  setTitle: (title: string) => void;
  assignmentTypeId: number | null;
  setAssignmentTypeId: (id: number | null) => void;
  classId: number | null;
  setClassId: (id: number) => void;
}

const DocumentForm = ({
  title,
  setTitle,
  assignmentTypeId,
  setAssignmentTypeId,
  classId,
  setClassId,
}: DocumentFormProps) => {
  const { classes } = useClasses();
  const { assignmentTypes } = useAssignmentTypes();

  // TODO: Add conditional for boxes being red if neither is selected
  // TODO: Do not hard code the assignment types, fetch from API
  // const assignmentTypes = [
  //   "Individual project",
  //   "Group project",
  //   "Test",
  //   "Essay",
  //   "Other",
  // ];

  console.log(assignmentTypes)

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
              width={{ base: "100%", md: "60%" }}
              appearance="none"
            />
          </Field.Root>

          <Field.Root mt={4}>
            <Field.Label fontWeight="bold" fontSize="lg">
              Select Assignment Type
            </Field.Label>
            <Box position="relative" width={{ base: "100%", md: "60%" }}>
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
                  <option defaultValue="" disabled hidden>
                    Select type
                  </option>

                  <For each={assignmentTypes}>
                    {(item) => (
                      <option key={item.type} value={item.type}>
                        {item.type}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
              </NativeSelect.Root>
              <Icon
                as={FaChevronDown}
                position="absolute"
                right="3"
                top="30%"
                pointerEvents="none"
                color="gray.500"
                boxSize="4"
              />
            </Box>
          </Field.Root>

          <Field.Root mt={4}>
            <Field.Label fontWeight="bold" fontSize="lg">
              Select Class
            </Field.Label>
            <NativeSelect.Root>
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
            </NativeSelect.Root>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default DocumentForm;
