import { Box, Text } from "@chakra-ui/react";

interface AssignmentDetailsTagProps {
  tagContent: string;
}

const AssignmentDetailsTag = ({ tagContent }: AssignmentDetailsTagProps) => {
  return (
    <Box bg={"#244D8A"} borderRadius={"full"} w={"fit-content"} mb={3}>
      <Text color={"white"} fontWeight={"bold"} px={3} py={1}>
        {tagContent}
      </Text>
    </Box>
  );
};

export default AssignmentDetailsTag;
