import { Button, HStack } from "@chakra-ui/react";
import useYears from "../../../hooks/years/useYears";

interface StudentYearButtonsProps {
  selectedYear: number | null;
  onYearChange: (yearId: number | null) => void;
}

const StudentYearButtons = ({
  selectedYear,
  onYearChange,
}: StudentYearButtonsProps) => {
  const { years } = useYears();

  const commonButtonStyles = {
    borderRadius: "full",
    px: 6,
    py: 2,
    fontWeight: "medium",
    color: "black",
    borderColor: "gray.300"
  }

  const getButtonColorStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? "#f2c5b5" : "white",
    _hover: {
      backgroundColor: isActive ? "#f29e82" : "gray.100",
    },
    _active: {
      backgroundColor: isActive ? "#f29e82" : "gray.200",
    },
  });

  return (
    <HStack>
      <Button
        key="all-students" 
        onClick={() => onYearChange(null)} 
        variant="outline"
        {...commonButtonStyles}
        {...getButtonColorStyles(selectedYear === null)} 
      >
        All
      </Button>

      {years.map((year) => (
        <Button
          key={year.id}
          onClick={() =>
            onYearChange(selectedYear === year.id ? null : year.id)
          }
          variant="outline"
          {...commonButtonStyles}
          {...getButtonColorStyles(selectedYear === year.id)}
        >
          {year.name}
        </Button>
      ))}
    </HStack>
  );
};

export default StudentYearButtons;
