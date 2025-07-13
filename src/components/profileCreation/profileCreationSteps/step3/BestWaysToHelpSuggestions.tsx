import { Button, Wrap } from "@chakra-ui/react";

interface BestWaysToHelpSuggestionsProps {
  onSuggestionClick: (selection: string) => void;
}

const BestWaysToHelpSuggestions = ({
  onSuggestionClick,
}: BestWaysToHelpSuggestionsProps) => {
  const options = [
    "Step-By-Step Directions",
    "Allow Video or Audio Response",
    "Summarize Readings",
  ];

  return (
    <Wrap
      gap={4}
      direction={{ base: "column", md: "row" }} // Stack on small, row on medium+
    >
      {options.map((option, index) => (
        <Button
          w={{ base: "100%", md: "auto" }} // Full width on small, auto on larger
          maxW="250px"
          onClick={() => onSuggestionClick(option)}
          key={index}
          color="white"
          bg="#BD4F23"
          borderRadius="full"
        >
          {option}
        </Button>
      ))}
    </Wrap>
  );
};

export default BestWaysToHelpSuggestions;
