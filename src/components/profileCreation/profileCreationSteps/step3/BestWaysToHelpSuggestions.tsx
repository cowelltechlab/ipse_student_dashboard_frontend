import { Button, HStack } from "@chakra-ui/react";

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
    <HStack>
      {options.map((option, index) => (
        <Button
          onClick={() => onSuggestionClick(option)}
          key={index}
          color={"white"}
          bg={"#BD4F23"}
          borderRadius={"full"}
        >
          {option}
        </Button>
      ))}
    </HStack>
  );
};

export default BestWaysToHelpSuggestions;
