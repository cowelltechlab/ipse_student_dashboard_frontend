import {
  Box,
  Heading,
  Image,
  VStack,
  Text,
  Textarea,
  Flex,
  Button,
  Icon,
  Center,
  Spinner,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import LearningPathwaysSection from "./LearningPathwaysSection";
import thinkingIcon from "../../assets/icons/design-thinking.png";
import skillsIcon from "../../assets/icons/logical-thinking.png";
import { IoArrowForwardCircle } from "react-icons/io5";
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
  if (versionOptionsLoading ) {
    return (
      <Center height="60vh">
        <Spinner size="xl" color="#244d8a"  />
      </Center>
    );
  }

  return (
    <VStack>
      {/* Skills for Success */}
      <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" overflow="hidden"  w={"100%"}>
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
        <Box px={4} py={3} bg="white"  w={"100%"}>
          {versionOptions?.skills_for_success ? (
            <Text color="#244d8a">{versionOptions.skills_for_success}</Text>
          ) : (
            <SkeletonText noOfLines={3} spaceY="4" />
          )}
        </Box>
      </Box>

      {/* Learning Pathways */}
      <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" overflow="hidden"  w={"100%"}>
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
          {versionOptions?.learning_pathways ? (
            <LearningPathwaysSection
              learningPathways={versionOptions.learning_pathways}
              selectedLearningPaths={selectedLearningPathways}
              setSelectedLearningPaths={setSelectedLearningPathways}
            />
          ) : (
            <Skeleton height="100px" />
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

      <Button
        borderRadius="xl"
        bg="#bd4f23"
        color="white"
        w="100%"
        disabled={selectedLearningPathways.length < 1}
      >
        Generate Assignment
        <Icon as={IoArrowForwardCircle} />
      </Button>
    </VStack>
  );
};

export default ModificationOptionsSection;
