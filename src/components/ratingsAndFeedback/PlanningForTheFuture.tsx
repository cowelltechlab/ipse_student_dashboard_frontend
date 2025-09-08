import { Accordion, Span, Text, Stack, Box, Textarea } from "@chakra-ui/react";
import LickertButtons from "./LickertButtons";
import type { AssignmentRatingDataType } from "../../types/AssignmentRatingTypes";

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
  onConfidenceExplanationChange
}: PlanningForTheFutureProps) => {
    const title = "Planning for the Future";

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
                <Stack spaceY={8}>
                    <Text fontSize="md" fontWeight="medium">
                        Reflect on what you've learned and how you can apply it moving forward.
                    </Text>

                    {/* My Skills Subsection */}
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4} color="#244d8a">
                            My Skills
                        </Text>
                        
                        <Stack spaceY={6}>
                            <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>
                                    1. I found a way of working or learning that I want to keep using
                                </Text>
                                <LickertButtons 
                                    selection={foundWayToKeepUsing} 
                                    onSelectionChange={onFoundWayToKeepUsingChange} 
                                />
                            </Box>

                            <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>
                                    What way of working or learning did you find? How do you know it was helpful for you? Should we update your profile to show this? If you are proud of your work, remember that we can update your achievements page.
                                </Text>
                                <Textarea
                                    value={wayToKeepExplanation}
                                    onChange={(e) => onWayToKeepExplanationChange(e.target.value)}
                                    placeholder="Describe the working or learning method you found helpful..."
                                    minHeight="120px"
                                    resize="vertical"
                                />
                            </Box>

                            <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>
                                    2. I can describe 1-2 things that I want to change or do better next time
                                </Text>
                                <LickertButtons 
                                    selection={canDescribeImprovements} 
                                    onSelectionChange={onCanDescribeImprovementsChange} 
                                />
                            </Box>

                            <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>
                                    What could you do better? How do you know that you could do better? Should we change or update your profile to show what you want to work on?
                                </Text>
                                <Textarea
                                    value={improvementsExplanation}
                                    onChange={(e) => onImprovementsExplanationChange(e.target.value)}
                                    placeholder="Describe what you could do better and how you know this..."
                                    minHeight="120px"
                                    resize="vertical"
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
                                    How confident do you feel about making changes to a similar inclusive assignment in the future?
                                </Text>
                                <LickertButtons 
                                    selection={confidenceMakingChanges} 
                                    onSelectionChange={onConfidenceMakingChangesChange} 
                                />
                            </Box>

                            <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>
                                    What makes you feel confident or not confident? What would help you feel more confident in the future? Remember that we can update your achievements page if there is anything that you are proud of.
                                </Text>
                                <Textarea
                                    value={confidenceExplanation}
                                    onChange={(e) => onConfidenceExplanationChange(e.target.value)}
                                    placeholder="Describe what affects your confidence and what would help you feel more confident..."
                                    minHeight="120px"
                                    resize="vertical"
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