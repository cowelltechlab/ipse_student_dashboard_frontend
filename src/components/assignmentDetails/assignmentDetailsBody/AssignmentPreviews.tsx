import {
  Box,
  Heading,
  Stack,
  VStack,
  Text,
  Image,
  Skeleton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import HtmlContentBox from "../../common/universal/HTMLContentDisplay";

import noVersionSelectedImage from "../../../assets/Student Profile_Document_No change summary.svg";

interface AssignmentPreviewsProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
  selectedVersionHTML?: string | null;
  selectedVersionLoading: boolean;
}

const AssignmentPreviews = ({
  assignment,
  assignmentLoading,
  selectedVersionHTML,
  selectedVersionLoading,
}: AssignmentPreviewsProps) => {
  return (
    <Stack direction={{ base: "column", md: "row" }} mt={6} w="100%">
      {/* Original Assignment Section */}
      <VStack w={{ base: "100%", md: "50%" }} align="start">
        <Heading>Original Assignment</Heading>
        <Box w="100%" p={4} borderWidth={1} borderRadius="md" h="500px">
          {assignmentLoading ? (
            <Skeleton w="100%" h="100%" />
          ) : (
            <HtmlContentBox
              htmlContent={assignment?.html_content}
              height="100%"
            />
          )}
        </Box>
      </VStack>

      {/* Modified Assignment Section */}
      <VStack w={{ base: "100%", md: "50%" }} align="start">
        <Heading>Modified Assignment</Heading>
        <Box w="100%" p={4} borderWidth={1} borderRadius="md" h="500px">
          {selectedVersionLoading ? (
            <Center h="100%">
              <VStack>
                <Spinner size="lg" color="blue.500" />
                <Text mt={2}>Loading modified version...</Text>
              </VStack>
            </Center>
          ) : selectedVersionHTML ? (
            <HtmlContentBox htmlContent={selectedVersionHTML} height="100%" />
          ) : (
            <Center flexDir="column" h="100%">
              <Text mb={4}>
                No Version Selected. Browse below to preview versions.
              </Text>
              <Image src={noVersionSelectedImage} maxH="80%" />
            </Center>
          )}
        </Box>
      </VStack>
    </Stack>
  );
};

export default AssignmentPreviews;
