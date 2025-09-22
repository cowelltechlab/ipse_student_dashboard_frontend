import {
  Accordion,
  Text,
  Stack,
  Box,
  Textarea,
  VStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import LickertButtons from "./LickertButtons";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";

import FutureIcon from "../../assets/icons/future.png";

interface PlanningForTheFutureProps {
  assignmentRatingDetails?: AssignmentRatingDataType | null;
  loading: boolean;
  foundWayToKeepUsing: string;
  onFoundWayToKeepUsingChange: (value: string) => void;
  wayToKeepExplanation: string;
  onWayToKeepExplanationChange: (value: string) => void;
  canDescribeImprovements: string;
  onCanDescribeImprovementsChange: (value: string) => void;
  improvementsExplanation: string;
  onImprovementsExplanationChange: (value: string) => void;
  confidenceMakingChanges: string;
  onConfidenceMakingChangesChange: (value: string) => void;
  confidenceExplanation: string;
  onConfidenceExplanationChange: (value: string) => void;
}

const PlanningForTheFuture = ({
  foundWayToKeepUsing,
  onFoundWayToKeepUsingChange,
  wayToKeepExplanation,
  onWayToKeepExplanationChange,
  canDescribeImprovements,
  onCanDescribeImprovementsChange,
  improvementsExplanation,
  onImprovementsExplanationChange,
  confidenceMakingChanges,
  onConfidenceMakingChangesChange,
  confidenceExplanation,
  onConfidenceExplanationChange,
}: PlanningForTheFutureProps) => {
  const title = "Planning for the Future";
  const subtitle =
    "Reflect on what you've learned and how you can apply it moving forward.";

  return (
    <Accordion.Item key={title} value={title}>
      <Accordion.ItemTrigger
        bg={"#244d8a"}
        padding={4}
        fontWeight="bold"
        color="white"
        fontSize={"2xl"}
      >
        <Image
          boxSize="40px"
          src={FutureIcon}
          alt="Planning for the Future Icon"
        />
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
          <Stack spaceY={8}>
            {/* My Skills Subsection */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="#244d8a">
                My Skills
              </Text>

              <Stack spaceY={6}>
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    1. I found a way of working or learning that I want to keep
                    using
                  </Text>
                  <LickertButtons
                    selection={foundWayToKeepUsing}
                    onSelectionChange={onFoundWayToKeepUsingChange}
                  />
                </Box>

                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={1}>
                    What way of working or learning did you find?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={1}>
                    How do you know it was helpful for you?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={1}>
                    Should we update your profile to show this?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={3}>
                    If you are proud of your work, remember that we can update your
                    achievements page.
                  </Text>
                  <Textarea
                    value={wayToKeepExplanation}
                    onChange={(e) =>
                      onWayToKeepExplanationChange(e.target.value)
                    }
                    placeholder="Describe the working or learning method you found helpful..."
                    minHeight="120px"
                    resize="vertical"
                    bg={"white"}
                    border={"1px solid"}
                  />
                </Box>

                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    2. I can describe 1-2 things that I want to change or do
                    better next time
                  </Text>
                  <LickertButtons
                    selection={canDescribeImprovements}
                    onSelectionChange={onCanDescribeImprovementsChange}
                  />
                </Box>

                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={1}>
                    What could you do better?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={1}>
                    How do you know that you could do better?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={3}>
                    Should we change or update your profile to show what you want to
                    work on?
                  </Text>
                  <Textarea
                    value={improvementsExplanation}
                    onChange={(e) =>
                      onImprovementsExplanationChange(e.target.value)
                    }
                    placeholder="Describe what you could do better and how you know this..."
                    minHeight="120px"
                    resize="vertical"
                    bg={"white"}
                    border={"1px solid"}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Guiding My Learning Subsection */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="#244d8a">
                Guiding My Learning
              </Text>

              <Stack spaceY={6}>
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3}>
                    How confident do you feel about making changes to a similar
                    inclusive assignment in the future?
                  </Text>
                  <LickertButtons
                    selection={confidenceMakingChanges}
                    onSelectionChange={onConfidenceMakingChangesChange}
                  />
                </Box>

                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={1}>
                    What makes you feel confident or not confident?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={1}>
                    What would help you feel more confident in the future?
                  </Text>
                  <Text fontSize="md" fontWeight="normal" fontStyle="italic" mb={3}>
                    Remember that we can update your achievements page if there is
                    anything that you are proud of.
                  </Text>
                  <Textarea
                    value={confidenceExplanation}
                    onChange={(e) =>
                      onConfidenceExplanationChange(e.target.value)
                    }
                    placeholder="Describe what affects your confidence and what would help you feel more confident..."
                    minHeight="120px"
                    resize="vertical"
                    bg={"white"}
                    border={"1px solid"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default PlanningForTheFuture;
