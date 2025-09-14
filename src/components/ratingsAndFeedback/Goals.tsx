import {
  Text,
  Box,
  Accordion,
  Textarea,
  Stack,
  VStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import LickertButtons from "./LickertButtons";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";

import GoalIcon from "../../assets/icons/goal.png";

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
  assignmentRatingDetails,
  helpedWorkTowardsGoals,
  onHelpedWorkTowardsGoalsChange,
  whichGoals,
  onWhichGoalsChange,
  goalsExplanation,
  onGoalsExplanationChange,
}: GoalsProps) => {
  const title = "Goals";
  const subtitle =
    "Think about your goals. How did this assignment help you make progress towards them?";

  const capitalizeFirstLetter = (learning_goal: string | undefined) => {
    if (!learning_goal || learning_goal.length === 0) return "";
    return learning_goal.charAt(0).toUpperCase() + learning_goal.slice(1);
  };

  const goalOptions = [
    assignmentRatingDetails?.student_profile.profile_summaries.long_term_goals,
    assignmentRatingDetails?.student_profile.profile_summaries.short_term_goals,
    assignmentRatingDetails?.student_profile.classes[0].class_name +
      " - " +
      capitalizeFirstLetter(
        assignmentRatingDetails?.student_profile.classes[0].learning_goal
      ),
    "A different goal",
    "None/Not too sure",
  ];

  const handleGoalOptionChange = (
    goalOption: string,
    details: { checked: string | boolean }
  ) => {
    const isChecked = details.checked === true;
    if (isChecked && !whichGoals.includes(goalOption)) {
      onWhichGoalsChange([...whichGoals, goalOption]);
    } else if (!isChecked && whichGoals.includes(goalOption)) {
      onWhichGoalsChange(whichGoals.filter((g) => g !== goalOption));
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
        <Image boxSize="40px" src={GoalIcon} alt="Goals Icon" />
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
              <Box
                display="grid"
                gridTemplateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)"
                }}
                gap={4}
              >
                {goalOptions
                  .filter(
                    (option): option is string => typeof option === "string"
                  )
                  .map((option) => (
                    <Box key={option}>
                      <Checkbox.Root
                        checked={whichGoals.includes(option)}
                        variant={"outline"}
                        colorPalette={"gray"}
                        onCheckedChange={(details) =>
                          handleGoalOptionChange(option, details)
                        }
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control bg={"white"} borderColor={"black"} />
                        <Text ml={2}>{option}</Text>
                      </Checkbox.Root>
                    </Box>
                  ))}
              </Box>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={3}>
                3. How did the assignment help you work toward your goals? Did
                the assignment change how you think about your goals, like
                helping you change a goal or add a new goal?
              </Text>
              <Textarea
                value={goalsExplanation}
                onChange={(e) => onGoalsExplanationChange(e.target.value)}
                placeholder="Please describe how this assignment helped with your goals..."
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

export default Goals;
