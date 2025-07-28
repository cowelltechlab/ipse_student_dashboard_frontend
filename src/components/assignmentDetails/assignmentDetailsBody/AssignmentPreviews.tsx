import { Box, Heading, Stack, VStack, Text, Image } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import HtmlContentBox from "../../common/universal/HTMLContentDisplay";

import noVersionSelectedImage from "../../../assets/Student Profile_Document_No change summary.svg";

interface AssignmentPreviewsProps {
  assignment: AssignmentDetailType | null;
  selectedVersionHTML?: string | null;
}

const AssignmentPreviews = ({
  assignment,
  selectedVersionHTML,
}: AssignmentPreviewsProps) => {
  return (
    <Stack direction={{ base: "column", md: "row" }} mt={6} w={"100%"}>
      <VStack w={{ base: "100%", md: "50%" }} align="start">
        <Heading>Original Assignment</Heading>
        <Box w="100%" p={4} borderWidth={1} borderRadius="md">
          <HtmlContentBox
            htmlContent={assignment?.html_content}
            height={"500px"}
          />
        </Box>
      </VStack>

      <VStack w={{ base: "100%", md: "50%" }} align="start">
        <Heading>Modified Assignment</Heading>

        <Box w="100%" p={4} borderWidth={1} borderRadius="md">
          {selectedVersionHTML ? (
            <HtmlContentBox
              htmlContent={assignment?.html_content}
              height={"500px"}
            />
          ) : (
            <Box
              height="500px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text mb={4}>
                No Version Selected. Browse below to preview versions.
              </Text>
              <Image src={noVersionSelectedImage} height="80%" />
            </Box>
          )}
        </Box>
      </VStack>
    </Stack>
  );
};

export default AssignmentPreviews;
