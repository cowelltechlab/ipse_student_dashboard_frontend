import { Accordion, Span, Text, Stack, Box, Textarea } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";

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
  onLeastHelpfulPartsExplanationChange
}: RateMyOptionsProps) => {
    const title = "Rate My Options";

    const assignmentSections = [
        "Templates",
        "Checklist", 
        "Prompts to get started",
        "Assignment instructions",
        "Step-by-step plan",
        "Support tools",
        "Motivational message"
    ];

    const chosenOptions = assignmentRatingDetails?.generated_options?.map(option => option.name) || [];
    
    const allOptions = [...chosenOptions.map(opt => `Chosen option: ${opt}`), ...assignmentSections];

    const handleOptionChange = (option: string, details: { checked: string | boolean }, isMostHelpful: boolean) => {
        const currentSelection = isMostHelpful ? mostHelpfulParts : leastHelpfulParts;
        const setSelection = isMostHelpful ? onMostHelpfulPartsChange : onLeastHelpfulPartsChange;
        const isChecked = details.checked === true;
        
        if (isChecked && !currentSelection.includes(option) && currentSelection.length < 3) {
            setSelection([...currentSelection, option]);
        } else if (!isChecked && currentSelection.includes(option)) {
            setSelection(currentSelection.filter(o => o !== option));
        }
    };

    return (
        <Accordion.Item key={title} value={title}>
            <Accordion.ItemTrigger
                bg={"#244d8a"}
                padding={2}
                fontWeight="bold"
                color="white"
                fontSize={"2xl"}
            >
            <Span flex="1">{title}</Span>
            <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent
                bg="#cce0ff"
                padding={4}
            >
            <Accordion.ItemBody>
                <Stack spaceY={6}>
                    <Text fontSize="md" fontWeight="medium">
                        Rate the different parts of your assignment based on how helpful they were for your learning.
                    </Text>

                    <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={3}>
                            1. Which parts of the assignment were the most helpful to you? (Choose up to 3)
                        </Text>
                        <Text fontSize="sm" color="gray.600" mb={3}>
                            Selected: {mostHelpfulParts.length}/3
                        </Text>
                        <Stack spaceY={2}>
                            {allOptions.map((option) => (
                                <Checkbox.Root
                                    key={option}
                                    checked={mostHelpfulParts.includes(option)}
                                    disabled={!mostHelpfulParts.includes(option) && mostHelpfulParts.length >= 3}
                                    onCheckedChange={(details) => handleOptionChange(option, details, true)}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Text ml={2}>{option}</Text>
                                </Checkbox.Root>
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={3}>
                            2. Why do you think these were helpful changes? Which changes do you think you would make to similar assignments in the future?
                        </Text>
                        <Textarea
                            value={mostHelpfulPartsExplanation}
                            onChange={(e) => onMostHelpfulPartsExplanationChange(e.target.value)}
                            placeholder="Please explain why these parts were helpful and how you might use similar approaches in future assignments..."
                            minHeight="120px"
                            resize="vertical"
                        />
                    </Box>

                    <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={3}>
                            3. Which parts of the assignment were the least helpful to your learning? (Choose up to 3)
                        </Text>
                        <Text fontSize="sm" color="gray.600" mb={3}>
                            Selected: {leastHelpfulParts.length}/3
                        </Text>
                        <Stack spaceY={2}>
                            {allOptions.map((option) => (
                                <Checkbox.Root
                                    key={option}
                                    checked={leastHelpfulParts.includes(option)}
                                    disabled={!leastHelpfulParts.includes(option) && leastHelpfulParts.length >= 3}
                                    onCheckedChange={(details) => handleOptionChange(option, details, false)}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Text ml={2}>{option}</Text>
                                </Checkbox.Root>
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={3}>
                            4. Why do you think these weren't helpful? How could these be changed to be more helpful?
                        </Text>
                        <Textarea
                            value={leastHelpfulPartsExplanation}
                            onChange={(e) => onLeastHelpfulPartsExplanationChange(e.target.value)}
                            placeholder="Please explain why these parts weren't helpful and how they could be improved..."
                            minHeight="120px"
                            resize="vertical"
                        />
                    </Box>
                </Stack>
            </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};

export default RateMyOptions;