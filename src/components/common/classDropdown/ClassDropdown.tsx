import { CreatableSelect, type ChakraStylesConfig } from "chakra-react-select";
import { useMemo } from "react";
import type { ClassType } from "../../../types/ClassTypes";

interface ClassDropdownProps {
  selectedClassId: number | null;
  setSelectedClassId: (selection: number | null) => void;
  openClassAddModal: () => void;
  classes: ClassType[];
  color?: string;
  menuColor?: string;
  menuBackground?: string;
  placeholderColor?: string;
  borderColor?: string;
  menuHoverColor?: string;
}

function ClassDropdown({
  selectedClassId,
  setSelectedClassId,
  openClassAddModal,
  classes,
  color = "black",
  menuColor = "black",
  menuBackground = "white",
  placeholderColor = "gray.500",
  borderColor = "gray.300",
  menuHoverColor = "gray.100",
}: ClassDropdownProps) {
  const options = useMemo(
    () => classes.map((c) => ({ label: c.name, value: c.id })),
    [classes]
  );

  const selectedOption =
    options.find((o) => o.value === selectedClassId) ?? null;

  const handleChange = (option: { label: string; value: number } | null) => {
    if (option) {
      setSelectedClassId(option.value);
    } else {
      setSelectedClassId(null);
    }
  };

  const handleCreate = () => {
    openClassAddModal();
  };

  // Custom styles for CreatableSelect
  const chakraStyles: ChakraStylesConfig<
    { label: string; value: number },
    false
  > = {
    control: (provided) => ({
      ...provided,
      color: color,
      borderColor: borderColor,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: placeholderColor,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: menuBackground,
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: menuBackground,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      color: menuColor,
      backgroundColor: state.isFocused ? menuHoverColor : menuBackground,
      ':hover': {
        backgroundColor: menuHoverColor,
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: color,
    }),
  };

  return (
    <CreatableSelect
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onCreateOption={handleCreate}
      placeholder="Select or add a class..."
      size="md"
      chakraStyles={chakraStyles}
    />
  );
}

export default ClassDropdown;
