import { CreatableSelect } from "chakra-react-select";
import { useMemo } from "react";
import type { ClassType } from "../../../../types/ClassTypes";

interface ClassDropdownProps {
  selectedClassId: number | null;
  setSelectedClassId: (selection: number | null) => void;
  openClassAddModal: () => void;
  classes: ClassType[];
}

function ClassDropdown({
  selectedClassId,
  setSelectedClassId,
  openClassAddModal,
  classes,
}: ClassDropdownProps) {
  const options = useMemo(
    () => classes.map((c) => ({ label: c.name, value: c.id })),
    [classes]
  );

  const selectedOption = options.find((o) => o.value === selectedClassId) ?? null;

  const handleChange = (
    option: { label: string; value: number } | null
  ) => {
    if (option) {
      setSelectedClassId(option.value);
    } else {
      setSelectedClassId(null);
    }
  };

  const handleCreate = () => {
    openClassAddModal();
  };

  return (
    <CreatableSelect
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onCreateOption={handleCreate}
      placeholder="Select or add a class..."
      size="md"
    />
  );
}

export default ClassDropdown;
