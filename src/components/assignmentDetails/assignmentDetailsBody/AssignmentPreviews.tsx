import { Box, Heading, Stack, VStack } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";

interface AssignmentPreviewsProps {
  assignment: AssignmentDetailType | null;
}

const AssignmentPreviews = ({ assignment }: AssignmentPreviewsProps) => {
  return (
    <Stack direction={{ base: "column", md: "row" }} mt={6} w={"100%"}>
      <VStack w={{ base: "100%", md: "50%" }} align="start">
        <Heading>Original Assignment</Heading>
        <Box
          w="100%"
          p={4}
          borderWidth={1}
          borderRadius="md"
          dangerouslySetInnerHTML={{ __html: assignment?.html_content || "" }}
        />
      </VStack>
      <VStack w={{ base: "100%", md: "50%" }} align="start">
        <Heading>Modified Assignment</Heading>
        <Box
          w="100%"
          p={4}
          borderWidth={1}
          borderRadius="md"
          dangerouslySetInnerHTML={{ __html: assignment?.html_content || "" }}
        />
      </VStack>
    </Stack>
  );
};

export default AssignmentPreviews;
