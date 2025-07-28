import {
  Box,
  Heading,
  Image,
  VStack,
  Text,
  Textarea,
  Flex,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import LearningPathwaysSection from "./LearningPathwaysSection";
import thinkingIcon from "../../assets/icons/design-thinking.png";
import skillsIcon from "../../assets/icons/logical-thinking.png";
import type { AssignmentVersionData } from "../../types/AssignmentModificationTypes";

interface ModificationOptionsSectionProps {
  versionOptions: AssignmentVersionData | null;
  versionOptionsLoading: boolean;

  selectedLearningPathways: string[];
  setSelectedLearningPathways: (selection: string[]) => void;

  ideasForChange: string;
  setIdeasForChange: (ideas: string) => void;
}

const ModificationOptionsSection = ({
  versionOptions,
  versionOptionsLoading,

  selectedLearningPathways,
  setSelectedLearningPathways,

  ideasForChange,
  setIdeasForChange,
}: ModificationOptionsSectionProps) => {
  return (
    <VStack>
      {/* Skills for Success */}
      <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" w="100%">
        <Flex
          bg="#244d8a"
          color="white"
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderTopRadius="md"
        >
          <Image src={skillsIcon} height="50px" />
          <Heading>Skills for Success</Heading>
        </Flex>

        <Box px={4} py={3} bg="white" w="100%">
          {versionOptionsLoading ? (
            // Show skeleton while loading
            <SkeletonText mt="4" noOfLines={3} spaceY="4" />
          ) : versionOptions?.skills_for_success ? (
            <Text color="#244d8a">{versionOptions.skills_for_success}</Text>
          ) : (
            <Text color="gray.400">No skills data available.</Text>
          )}
        </Box>
      </Box>

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
        <Box px={4} py={3} bg="white">
          {versionOptionsLoading ? (
            // Use a solid loading block
            <Skeleton height="220px" borderRadius="md" />
          ) : versionOptions?.learning_pathways &&
            versionOptions.learning_pathways.length > 0 ? (
            <LearningPathwaysSection
              learningPathways={versionOptions.learning_pathways}
              selectedLearningPaths={selectedLearningPathways}
              setSelectedLearningPaths={setSelectedLearningPathways}
            />
          ) : (
            <Text color="gray.400">No learning pathways available.</Text>
          )}
        </Box>
      </Box>

      {/* Ideas for Change */}
      <Box w="100%">
        <Textarea
          borderWidth="1px"
          borderRadius="md"
          borderColor="#244d8a"
          h="150px"
          placeholder="Add your ideas for changes here."
          value={ideasForChange}
          onChange={(e) => setIdeasForChange(e.target.value)}
        />
      </Box>
    </VStack>
  );
};

export default ModificationOptionsSection;
