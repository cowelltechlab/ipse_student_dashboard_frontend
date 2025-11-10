import { HStack, Icon } from "@chakra-ui/react";
import { Select, type ChakraStylesConfig } from "chakra-react-select";
import { useMemo } from "react";

import { FaSortAmountDown } from "react-icons/fa";

export type SortOption = {
  label: string;
  value:
    | "name-asc"
    | "name-desc"
    | "student-asc"
    | "student-desc"
    | "date-asc"
    | "date-desc";
};

interface AssignmentsSortDropdownProps {
  selectedSort: SortOption | null;
  setSelectedSort: (sort: SortOption | null) => void;
}

const AssignmentsSortDropdown = ({
  selectedSort,
  setSelectedSort,
}: AssignmentsSortDropdownProps) => {
  const sortOptions: SortOption[] = useMemo(
    () => [
      { label: "Name (A-Z)", value: "name-asc" },
      { label: "Name (Z-A)", value: "name-desc" },
      { label: "Student (A-Z)", value: "student-asc" },
      { label: "Student (Z-A)", value: "student-desc" },
      { label: "Date Modified (Newest First)", value: "date-desc" },
      { label: "Date Modified (Oldest First)", value: "date-asc" },
    ],
    []
  );

  const handleChange = (option: SortOption | null) => {
    setSelectedSort(option);
  };

  // Custom styles for Select matching the UI theme
  const chakraStyles: ChakraStylesConfig<SortOption, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: "gray.300",
      minHeight: "40px",
      _hover: {
        borderColor: "gray.400",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray.500",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      zIndex: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      padding: 0,
      borderRadius: "md",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isFocused ? "gray.100" : "white",
      ":hover": {
        backgroundColor: "gray.100",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <HStack>
      <Icon as={FaSortAmountDown} />
      <Select<SortOption, false>
        options={sortOptions}
        value={selectedSort}
        onChange={handleChange}
        placeholder="Sort by..."
        isClearable
        size="md"
        chakraStyles={chakraStyles}
      />
    </HStack>
  );
};

export default AssignmentsSortDropdown;
