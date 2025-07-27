import {
  Box,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../types/StudentTypes";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import type { AssignmentVersionData } from "../../types/AssignmentModificationTypes";
import LearningPathwaysSection from "./LearningPathwaysSection";
import { useState } from "react";

import thinkingIcon from "../../assets/icons/design-thinking.png";
import skillsIcon from "../../assets/icons/logical-thinking.png";

interface AssignmentDetailsPageContentProps {
  student: StudentProfileType | null;
  assignment: AssignmentDetailType | null;
  profileLoading: boolean;
  assignmentLoading: boolean;
  triggerRefetch: () => void;
}

const AssignmentDetailsPageContent = ({
  student,
  assignment,
  profileLoading,
  assignmentLoading,
  triggerRefetch,
}: AssignmentDetailsPageContentProps) => {
  const [ideasForChange, setIdeasForChange] = useState<string>("");
  const [selectedLearningPathways, setSelectedLearningPathways] = useState<
    string[]
  >([]);

  const versionData: AssignmentVersionData = {
    version_document_id: "0e61f014-f122-484c-90dd-208d8e8e2fd4",
    skills_for_success:
      "The student needs to improve their reading comprehension and time management skills for this assignment. An understanding of cultural significance related to food will also be beneficial.",

    learning_pathways: [
      {
        title: "Reading Comprehension",
        description:
          "Understanding the given material about pickles and relishes in depth to provide a clear explanation in video or audio format.",
        reasons: [
          "The student wants to improve reading skills",
          "The assignment requires understanding of a reading material",
        ],
        internal_id: "opt_1",
      },
      {
        title: "Time Management",
        description:
          "Creating a clear timeline for completing the assignment, including time for research, script preparation, and practicing the script.",
        reasons: [
          "The student has identified time management as a challenge",
          "The assignment requires multiple steps",
        ],
        internal_id: "opt_2",
      },
      {
        title: "Cultural Understanding",
        description:
          "Learning about the cultural significance of pickles and relishes, particularly within German and Jewish cultures.",
        reasons: [
          "The assignment requires understanding of cultural context",
          "This knowledge can support the student's long-term goal of opening a school",
        ],
        internal_id: "opt_3",
      },
    ],
  };

  return (
    <Box p={4} w={"100%"}>
      <HStack w={"100%"}>
        <Box w="33%">
          <Heading>Original Assignment</Heading>
          <Box
            p={4}
            borderWidth={1}
            borderRadius="md"
            dangerouslySetInnerHTML={{ __html: assignment?.html_content || "" }}
          />
        </Box>
        <Box w="33%">
          <VStack>
            <Box
              borderWidth="1px"
              borderRadius="md"
              borderColor={"#244d8a"}
              overflow="hidden"
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
                <Image src={skillsIcon} height={"50px"} />
                <Heading>Skills for Success</Heading>
              </Flex>

              {/* Body */}
              <Box px={4} py={3} bg="white">
                <Text color={"#244d8a"}>{versionData.skills_for_success}</Text>
              </Box>
            </Box>
            <Box
              borderWidth="1px"
              borderRadius="md"
              borderColor={"#244d8a"}
              overflow="hidden"
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
                <Image src={thinkingIcon} height={"50px"} />
                <Heading>Learning Pathways</Heading>
              </Flex>
              <Box px={4} py={3} bg="white">
                <LearningPathwaysSection
                  learningPathways={versionData.learning_pathways}
                  selectedLearningPaths={selectedLearningPathways}
                  setSelectedLearningPaths={setSelectedLearningPathways}
                />
              </Box>
            </Box>
            <Box w={"100%"}>
              <Textarea
                borderWidth="1px"
                borderRadius="md"
                borderColor={"#244d8a"}
                h={"150px"}
                placeholder="Add your ideas for changes here."
                value={ideasForChange}
                onChange={(e) => setIdeasForChange(e.target.value)}
              />
            </Box>
          </VStack>
        </Box>
        <Box w="33%">
          <Heading>Select Changes to make your assignment</Heading>
        </Box>
      </HStack>
    </Box>
  );
};

export default AssignmentDetailsPageContent;
