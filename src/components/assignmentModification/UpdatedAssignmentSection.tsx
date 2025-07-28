import { Box, Heading, Image, VStack, Flex, Spinner, Text, Textarea } from "@chakra-ui/react";

import modifiedAssignmentIcon from "../../assets/icons/note.png";
import RichTextEditor from "../common/universal/EditableHTMLContentBox";

interface UpdatedAssignmentSectionProps {
  updatedAssignment: string;
  setUpdatedAssignment: (HTMLContent: string) => void;

  loadingAssignmentGeneration: boolean
}

const UpdatedAssignmentSection = ({
  updatedAssignment,
  setUpdatedAssignment,

  loadingAssignmentGeneration
}: UpdatedAssignmentSectionProps) => {
  return (
    <VStack>
      <Box
        borderWidth="1px"
        borderRadius="md"
        borderColor={"#244d8a"}
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
          <Image src={modifiedAssignmentIcon} height={"50px"} />
          <Heading>Modified Assignment</Heading>
        </Flex>

        {loadingAssignmentGeneration ? (
          // Spinner + message while generating
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="75vh"
          >
            <Spinner size="xl" color="#244d8a" />
            <Text mt={4} fontSize="lg" color="gray.600">
              Hang tight! Generating your new assignment...
            </Text>
          </Flex>
        ) : updatedAssignment ? (
          <RichTextEditor
            value={updatedAssignment || ""}
            onChange={(newHtml) => setUpdatedAssignment(newHtml)}
          />
        ) : (
          <Textarea
            pt={4}
            height="75vh"
            value="Select Changes to Generate Modified Assignment"
            fontSize={"md"}
            disabled
          />
        )}
      </Box>
    </VStack>
  );
};

export default UpdatedAssignmentSection;
