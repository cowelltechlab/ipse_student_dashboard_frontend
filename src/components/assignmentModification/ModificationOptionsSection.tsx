import { Box, Heading, Image, VStack, Text, Textarea, Flex, Accordion } from "@chakra-ui/react";
import LearningPathwaysSection from "./LearningPathwaysSection";
import thinkingIcon from "../../assets/icons/design-thinking.png";
import reflectionIcon from "../../assets/icons/logical-thinking.png";
import type { AssignmentVersionData } from "../../types/AssignmentModificationTypes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ModificationOptionsSectionProps {
  versionOptions: AssignmentVersionData | null;
  versionOptionsLoading: boolean;

  selectedLearningPathways: string[];
  setSelectedLearningPathways: (selection: string[]) => void;
  // ideasForChange: string;
  // setIdeasForChange: (ideas: string) => void;
}

const ModificationOptionsSection = ({
  versionOptions,
  versionOptionsLoading,

  selectedLearningPathways,
  setSelectedLearningPathways,
  // ideasForChange,
  // setIdeasForChange,
}: ModificationOptionsSectionProps) => {
  return (
    <VStack>
      {/* Learning Pathways */}
      <Box
        borderWidth="1px"
        borderRadius="md"
        borderColor="#244d8a"
        overflow="hidden"
        w={"100%"}
      >
        <Flex
          bg="#244d8a"
          color="white"
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderTopRadius="md"
        >
          <Image src={thinkingIcon} height="50px" />
          <Heading>Learning Pathways</Heading>
        </Flex>
        <Box
          px={4}
          py={6}
          bg="white"
          textAlign="center"
          borderRadius="md"
          boxShadow="sm"
        >
          {versionOptionsLoading ? (
            <VStack gap={4}>
              <Box w="400px">
                <DotLottieReact
                  src="https://lottie.host/104be41c-8b93-4940-8401-cc1aa0de874e/8XCNDsALKV.lottie"
                  loop
                  autoplay
                />
              </Box>
              <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                Hang on!
              </Text>
              <Text fontSize="md" color="gray.500" maxW="sm">
                Generating the{" "}
                <Text as="span" fontWeight="medium" color="blue.500">
                  Perfect Learning Pathways
                </Text>{" "}
                just for you...
              </Text>
            </VStack>
          ) : Array.isArray(versionOptions?.learning_pathways) && versionOptions.learning_pathways.length > 0 ? (
            <LearningPathwaysSection
              learningPathways={versionOptions!.learning_pathways}
              selectedLearningPaths={selectedLearningPathways}
              setSelectedLearningPaths={setSelectedLearningPathways}
            />
          ) : (
            <Text color="gray.400" textAlign="center">
              No learning pathways available.
            </Text>
          )}
        </Box>
      </Box>

      {/* Reflection Questions */}
      <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" w="100%" overflow="hidden">
        <Flex
          bg="#244d8a"
          color="white"
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderTopRadius="md"
        >
          <Image src={reflectionIcon} height="50px" />
          <Heading>Reflection Questions</Heading>
        </Flex>
        <Box px={4} py={3} bg="white" w="100%">
          <Accordion.Root defaultValue={["q1"]}>
            <Accordion.Item value="q1">
              <Accordion.ItemTrigger
                bg="#eaeef4"
                p={2}
                borderRadius="md"
                _hover={{ bg: "#dde4f0" }}
              >
                <Text color="#244d8a" fontWeight="semibold" textAlign="left">
                  Why did you choose these changes?
                </Text>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Box mt={2}>
                  <Textarea
                    borderColor="#244d8a"
                    borderRadius="md"
                    minH="80px"
                    placeholder="I chose this because…"
                  />
                </Box>
              </Accordion.ItemContent>
            </Accordion.Item>

            <Accordion.Item value="q2">
              <Accordion.ItemTrigger
                bg="#eaeef4"
                p={2}
                borderRadius="md"
                mt={3}
                _hover={{ bg: "#dde4f0" }}
              >
                <Text color="#244d8a" fontWeight="semibold" textAlign="left">
                  How will this help you in the future?
                </Text>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Box mt={2}>
                  <Textarea
                    borderColor="#244d8a"
                    borderRadius="md"
                    minH="80px"
                    placeholder="This will help me because…"
                  />
                </Box>
              </Accordion.ItemContent>
            </Accordion.Item>

            <Accordion.Item value="q3">
              <Accordion.ItemTrigger
                bg="#eaeef4"
                p={2}
                borderRadius="md"
                mt={3}
                _hover={{ bg: "#dde4f0" }}
              >
                <Text color="#244d8a" fontWeight="semibold" textAlign="left">
                  Do you want to change or add anything?
                </Text>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Box mt={2}>
                  <Textarea
                    borderColor="#244d8a"
                    borderRadius="md"
                    minH="80px"
                    placeholder="I want to add or change…"
                  />
                </Box>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Box>
      </Box>

    </VStack>
  );
};

export default ModificationOptionsSection;
