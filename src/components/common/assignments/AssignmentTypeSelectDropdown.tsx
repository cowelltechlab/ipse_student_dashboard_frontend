import { Field, For, Icon, NativeSelect } from "@chakra-ui/react";

import { FaChevronDown } from "react-icons/fa";
import type { AssignmentTypeListType } from "../../../types/AssignmentTypes";
import useAssignmentTypes from "../../../hooks/assignments/useAssignmentTypes";

interface AssignmentTypeSelectDropdownProps {
  assignmentTypeId: number | null;
  setAssignmentTypeId: (id: number | null) => void;
  color?: string;
}

const AssignmentTypeSelectDropdown = ({
  assignmentTypeId,
  setAssignmentTypeId,
    color = "black",
}: AssignmentTypeSelectDropdownProps) => {
  const { assignmentTypes } = useAssignmentTypes() as {
    assignmentTypes: AssignmentTypeListType[];
  };

  return (
    <Field.Root mt={4} color={color}>
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
          <option defaultValue="" style={{ color: "black" , backgroundColor: "white" }}>Select type</option>

          <For each={assignmentTypes}>
            {(item) => (
              <option key={item.id} value={item.id} style={{ color: "black" , backgroundColor: "white" }}>
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
  );
};

export default AssignmentTypeSelectDropdown;
