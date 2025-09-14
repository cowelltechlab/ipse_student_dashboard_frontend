import {
  Accordion,
  Text,
  Stack,
  Box,
  Textarea,
  Flex,
  VStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";

import RateOptionsIcon from "../../assets/icons/rating.png"

interface RateMyOptionsProps {
  assignmentRatingDetails?: AssignmentRatingDataType | null;
  loading: boolean;
  mostHelpfulParts: string[];
  onMostHelpfulPartsChange: (values: string[]) => void;
  mostHelpfulPartsExplanation: string;
  onMostHelpfulPartsExplanationChange: (value: string) => void;
  leastHelpfulParts: string[];
  onLeastHelpfulPartsChange: (values: string[]) => void;
  leastHelpfulPartsExplanation: string;
  onLeastHelpfulPartsExplanationChange: (value: string) => void;
}

const RateMyOptions = ({
  assignmentRatingDetails,
  mostHelpfulParts,
  onMostHelpfulPartsChange,
  mostHelpfulPartsExplanation,
  onMostHelpfulPartsExplanationChange,
  leastHelpfulParts,
  onLeastHelpfulPartsChange,
  leastHelpfulPartsExplanation,
  onLeastHelpfulPartsExplanationChange,
}: RateMyOptionsProps) => {
  const title = "Rate My Options";
  const subtitle =
    "You had some different options for how to change the assignment to make it work better for you. Let’s think about what worked and what didn’t.";

  const assignmentSections = [
    "Assignment instructions",
    "Step-by-step plan",
    "Prompts to get started",
    "Support tools",
    "AI Prompting",
    "Motivational message",
  ];

  const chosenOptions =
    assignmentRatingDetails?.generated_options
      ?.filter((option) => option.selected === true)
      .map((option) => option.name) || [];

  const renderOptionsSection = (
    options: string[],
    sectionTitle: string,
    selectedOptions: string[],
    isMostHelpful: boolean,
    maxSelections: number
  ) => (
    <Box flex="1" minW="280px">
      <Text fontSize="sm" fontWeight="bold" mb={3} color="#244d8a">
        {sectionTitle}
      </Text>
      <Flex direction="column" gap={2}>
        {options.map((option) => (
          <Checkbox.Root
            key={option}
            variant={"outline"}
            colorPalette={"gray"}
            checked={selectedOptions.includes(option)}
            disabled={
              !selectedOptions.includes(option) &&
              selectedOptions.length >= maxSelections
            }
            onCheckedChange={(details) =>
              handleOptionChange(option, details, isMostHelpful)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control bg={"white"} borderColor={"black"} />
            <Text ml={2}>{option}</Text>
          </Checkbox.Root>
        ))}
      </Flex>
    </Box>
  );

  const handleOptionChange = (
    option: string,
    details: { checked: string | boolean },
    isMostHelpful: boolean
  ) => {
    const currentSelection = isMostHelpful
      ? mostHelpfulParts
      : leastHelpfulParts;
    const setSelection = isMostHelpful
      ? onMostHelpfulPartsChange
      : onLeastHelpfulPartsChange;
    const isChecked = details.checked === true;

    if (
      isChecked &&
      !currentSelection.includes(option) &&
      currentSelection.length < 3
    ) {
      setSelection([...currentSelection, option]);
    } else if (!isChecked && currentSelection.includes(option)) {
      setSelection(currentSelection.filter((o) => o !== option));
    }
  };

  return (
    <Accordion.Item key={title} value={title}>
      <Accordion.ItemTrigger
        bg={"#244d8a"}
        padding={4}
        fontWeight="bold"
        color="white"
        fontSize={"2xl"}
      >
        <Image boxSize="40px" src={RateOptionsIcon} alt="Rate My Options Icon" />
        <VStack align="start" gap={3} flex="1" textAlign="center">
          <Heading flex="1" fontSize={"4xl"}>
            {title}
          </Heading>
          <Text fontSize="md" fontWeight="medium">
            {subtitle}
          </Text>
        </VStack>
        <Accordion.ItemIndicator color={"white"} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent bg="#EAF2FF" padding={4}>
        <Accordion.ItemBody>
          <Stack spaceY={6}>
            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                1. Which parts of the assignment were the MOST helpful to your
                learning? (Choose up to 3)
              </Text>
              <Text fontSize="sm" color="gray.600" mb={3}>
                Selected: {mostHelpfulParts.length}/3
              </Text>
              <Flex direction={{ base: "column", lg: "row" }} gap={6}>
                {chosenOptions.length > 0 &&
                  renderOptionsSection(
                    chosenOptions,
                    "Changes You Chose",
                    mostHelpfulParts,
                    true,
                    3
                  )}
                {renderOptionsSection(
                  assignmentSections,
                  "Assignment Sections",
                  mostHelpfulParts,
                  true,
                  3
                )}
              </Flex>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                2. Why do you think these were helpful changes? Which changes do
                you think you would make to similar assignments in the future?
              </Text>
              <Textarea
                value={mostHelpfulPartsExplanation}
                onChange={(e) =>
                  onMostHelpfulPartsExplanationChange(e.target.value)
                }
                placeholder="Please explain why these parts were helpful and how you might use similar approaches in future assignments..."
                minHeight="120px"
                resize="vertical"
                bg={"white"}
                border={"1px solid"}
              />
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                3. Which parts of the assignment were the LEAST helpful to your
                learning? (Choose up to 3)
              </Text>
              <Text fontSize="sm" color="gray.600" mb={3}>
                Selected: {leastHelpfulParts.length}/3
              </Text>
              <Flex direction={{ base: "column", lg: "row" }} gap={6}>
                {chosenOptions.length > 0 &&
                  renderOptionsSection(
                    chosenOptions,
                    "Changes You Chose",
                    leastHelpfulParts,
                    false,
                    3
                  )}
                {renderOptionsSection(
                  assignmentSections,
                  "Assignment Sections",
                  leastHelpfulParts,
                  false,
                  3
                )}
              </Flex>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                4. Why do you think these weren't helpful? How could these be
                changed to be more helpful?
              </Text>
              <Textarea
                value={leastHelpfulPartsExplanation}
                onChange={(e) =>
                  onLeastHelpfulPartsExplanationChange(e.target.value)
                }
                placeholder="Please explain why these parts weren't helpful and how they could be improved..."
                minHeight="120px"
                resize="vertical"
                bg={"white"}
                border={"1px solid"}
              />
            </Box>
          </Stack>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default RateMyOptions;
