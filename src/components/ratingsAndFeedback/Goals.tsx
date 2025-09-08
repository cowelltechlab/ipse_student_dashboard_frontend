import { Text, Box, Span, Accordion, Textarea, Stack } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import LickertButtons from "./LickertButtons";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";

interface GoalsProps {
  assignmentRatingDetails?: AssignmentRatingDataType | null;
  loading: boolean;
  helpedWorkTowardsGoals: string;
  onHelpedWorkTowardsGoalsChange: (value: string) => void;
  whichGoals: string[];
  onWhichGoalsChange: (values: string[]) => void;
  goalsExplanation: string;
  onGoalsExplanationChange: (value: string) => void;
}

const Goals = ({ 
  helpedWorkTowardsGoals,
  onHelpedWorkTowardsGoalsChange,
  whichGoals,
  onWhichGoalsChange,
  goalsExplanation,
  onGoalsExplanationChange
}: GoalsProps) => {
  const title = "Goals";
  const subtitle =
    "Think about your goals. How did this assignment help you make progress towards them?";

  const goalOptions = [
    "Long-term goal",
    "Short-term goal", 
    "Course goal",
    "A different goal",
    "None/Not too sure"
  ];

  const handleGoalOptionChange = (goalOption: string, details: { checked: string | boolean }) => {
    const isChecked = details.checked === true;
    if (isChecked && !whichGoals.includes(goalOption)) {
      onWhichGoalsChange([...whichGoals, goalOption]);
    } else if (!isChecked && whichGoals.includes(goalOption)) {
      onWhichGoalsChange(whichGoals.filter(g => g !== goalOption));
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
      <Accordion.ItemContent bg="#cce0ff" padding={4}>
        <Accordion.ItemBody>
          <Stack spaceY={6}>
            <Text fontSize="md" fontWeight="medium">{subtitle}</Text>
            
            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                1. This assignment helped me work towards my goals
              </Text>
              <LickertButtons 
                selection={helpedWorkTowardsGoals} 
                onSelectionChange={onHelpedWorkTowardsGoalsChange} 
              />
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                2. Which goal did you think it helped you with?
              </Text>
              <Stack spaceY={2}>
                {goalOptions.map((option) => (
                  <Checkbox.Root
                    key={option}
                    checked={whichGoals.includes(option)}
                    onCheckedChange={(details) => handleGoalOptionChange(option, details)}
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
                3. How did the assignment help you work toward your goals? Did the assignment change how you think about your goals, like helping you change a goal or add a new goal?
              </Text>
              <Textarea
                value={goalsExplanation}
                onChange={(e) => onGoalsExplanationChange(e.target.value)}
                placeholder="Please describe how this assignment helped with your goals..."
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

export default Goals;
