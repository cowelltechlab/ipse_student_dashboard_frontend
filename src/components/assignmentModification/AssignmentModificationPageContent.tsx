import {
  Box,
  Heading,
  HStack,
  Image,
  VStack,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import { useEffect, useState } from "react";

import modifiedAssignmentIcon from "../../assets/icons/note.png";
import { FaCircleCheck } from "react-icons/fa6";
import RichTextEditor from "../common/universal/EditableHTMLContentBox";
import useAssignmentVersionOptions from "../../hooks/assignmentVersions/useAssignmentVersionOptions";
import OriginalAssignmentSection from "./OriginalAssignmentSection";
import ModificationOptionsSection from "./ModificationOptionsSection";

interface AssignmentDetailsPageContentProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
}

const AssignmentDetailsPageContent = ({
  assignment,
  assignmentLoading,
}: AssignmentDetailsPageContentProps) => {
  const [ideasForChange, setIdeasForChange] = useState<string>("");
  const [selectedLearningPathways, setSelectedLearningPathways] = useState<
    string[]
  >([]);

  const [updatedAssignment, setUpdatedAssignment] = useState<string>("");

  const { versionOptions, loading: versionsLoading } =
    useAssignmentVersionOptions(assignment?.id);

  useEffect(
    () => console.log(selectedLearningPathways),
    [selectedLearningPathways]
  );

  return (
    <Box p={4} w={"100%"}>
      <HStack w="100%" align={"start"}>
        <Box w="33%">
          <OriginalAssignmentSection
            originalAssignmentHTML={assignment?.html_content}
            assignmentLoading={assignmentLoading}
          />
        </Box>
        <Box w="33%">
          <ModificationOptionsSection
            versionOptions={versionOptions}
            versionOptionsLoading={versionsLoading}
            selectedLearningPathways={selectedLearningPathways}
            setSelectedLearningPathways={setSelectedLearningPathways}
            ideasForChange={ideasForChange}
            setIdeasForChange={setIdeasForChange}
          />
        </Box>

        <Box w="33%">
          <VStack>
            <Box borderWidth="1px" borderRadius="md" borderColor={"#244d8a"}>
              <Flex
                bg="#244d8a"
                color="white"
                px={4}
                py={2}
                align="center"
                justify="space-between"
                borderTopRadius="md"
              >
                <Image src={modifiedAssignmentIcon} height={"50px"} />

                <Heading>Modified Assignment</Heading>
              </Flex>
              <RichTextEditor
                value={updatedAssignment || assignment?.html_content || ""}
                onChange={(newHtml) => setUpdatedAssignment(newHtml)}
                height="80vh"
              />
            </Box>
          </VStack>
          <Button
            borderRadius={"xl"}
            mt={4}
            bg={"#bd4f23"}
            color={"white"}
            w={"100%"}
            disabled={updatedAssignment === "" || updatedAssignment === null}
          >
            Save Changes
            <Icon as={FaCircleCheck} />
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default AssignmentDetailsPageContent;
