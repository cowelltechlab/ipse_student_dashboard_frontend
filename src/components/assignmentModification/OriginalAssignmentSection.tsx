import {
  VStack,
  Box,
  Image,
  Heading,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import HtmlContentBox from "../common/universal/HTMLContentDisplay";
import originalAssignmentIcon from "../../assets/icons/assignment.png";

interface OriginalAssignmentSectionProps {
  originalAssignmentHTML?: string;
  assignmentLoading: boolean;
}

const OriginalAssignmentSection = ({
  originalAssignmentHTML,
  assignmentLoading,
}: OriginalAssignmentSectionProps) => {
  return (
    <VStack >
      <Box borderWidth="1px" borderRadius="md" borderColor="#244d8a" w={"100%"}>
        <Flex
          bg="#244d8a"
          color="white"
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderTopRadius="md"
        >
          <Image src={originalAssignmentIcon} height="50px" />
          <Heading>Original Assignment</Heading>
        </Flex>

        {assignmentLoading ? (
          <Center height="75vh" p={5}>
            <Spinner size="xl" color="#244d8a" />
          </Center>
        ) : (
          <HtmlContentBox
            padding={5}
            height="75vh"
            htmlContent={originalAssignmentHTML}
          />
        )}
      </Box>
    </VStack>
  );
};

export default OriginalAssignmentSection;
