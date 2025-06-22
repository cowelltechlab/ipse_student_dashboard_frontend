import { Button, HStack } from "@chakra-ui/react";
import useYears from "../../../hooks/years/useYears";

interface StudentYearButtonsProps {
  selectedYear: number | null;
  onYearChange: (yearId: number) => void;
}

const StudentYearButtons = ({
  selectedYear,
  onYearChange,
}: StudentYearButtonsProps) => {
  const { years } = useYears();

  return (
    <HStack>
      {years.map((year) => (
        <Button
          key={year.id}
          onClick={() => onYearChange(year.id)}
          variant="outline"
          borderRadius="full"
          px={6}
          py={2}
          fontWeight="medium"
          backgroundColor={selectedYear === year.id ? "#f2c5b5" : "white"}
          borderColor="gray.300"
          color="black"
          _hover={{
            backgroundColor: selectedYear === year.id ? "#f29e82" : "gray.100",
          }}
          _active={{
            backgroundColor: selectedYear === year.id ? "#f29e82" : "gray.200",
          }}
        >
          {year.name}
        </Button>
      ))}
    </HStack>
  );
};

export default StudentYearButtons;
