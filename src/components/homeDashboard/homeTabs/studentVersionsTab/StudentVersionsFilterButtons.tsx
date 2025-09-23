import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";

interface StudentVersionsFilterButtonsProps {
  setGroupTypeFilter: (filter: string | null) => void;
}

const StudentVersionsFilterButtons = ({
  setGroupTypeFilter,
}: StudentVersionsFilterButtonsProps) => {
  const [activeButton, setActiveButton] = useState<string>("allStudents");

  const getButtonStyles = (name: string) => ({
    borderRadius: "2xl",
    borderWidth: "1px",
    borderColor: "gray.300",
    bg: activeButton === name ? "#f2c5b5" : "white",
    color: "black",
    _hover: {
      bg: "#edb29e",
    },
  });

  const handleFilterClick = (filterType: string, groupType: string | null) => {
    setActiveButton(filterType);
    setGroupTypeFilter(groupType);
  };

  return (
    <ButtonGroup>
      <Button
        {...getButtonStyles("allStudents")}
        onClick={() => handleFilterClick("allStudents", null)}
      >
        All Students
      </Button>

      <Button
        {...getButtonStyles("groupA")}
        onClick={() => handleFilterClick("groupA", "A")}
      >
        Group A
      </Button>

      <Button
        {...getButtonStyles("groupB")}
        onClick={() => handleFilterClick("groupB", "B")}
      >
        Group B
      </Button>
    </ButtonGroup>
  );
};

export default StudentVersionsFilterButtons;