import { Button, HStack } from "@chakra-ui/react";
import useYears from "../../../hooks/years/useYears";

interface Props {
  selectedYear: string | null;
  onYearChange: (yearName: string | null) => void;
  lowercase?: boolean; 
}

const TutorYearButtons = ({ selectedYear, onYearChange, lowercase }: Props) => {
  const { years } = useYears();

  return (
    <HStack>
      {years.map((year) => {
        const active = selectedYear === year.name;
        const label = lowercase
          ? `${year.name.toLowerCase()} tutor`
          : `${year.name} Tutor`;

        return (
          <Button
            key={year.id}
            onClick={() => onYearChange(active ? null : year.name)}
            variant="outline"
            borderRadius="full"
            px={6}
            py={2}
            fontWeight="medium"
            backgroundColor={active ? "#f2c5b5" : "white"}
            borderColor="gray.300"
            color="black"
            _hover={{ backgroundColor: active ? "#f29e82" : "gray.100" }}
            _active={{ backgroundColor: active ? "#f29e82" : "gray.200" }}
          >
            {label}
          </Button>
        );
      })}
    </HStack>
  );
};

export default TutorYearButtons;
