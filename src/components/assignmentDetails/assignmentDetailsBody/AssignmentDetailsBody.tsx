import {
  Box,
  HStack,
  VStack,
  Text,
  For,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import { BsStars } from "react-icons/bs";

interface AssignmentDetailsBodyProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
  triggerRefetch: () => void;
}

export type AssignmentHeaderDisplay = {
  heading: string;
  subHeading: string | null;
};

const AssignmentDetailsBody = ({
  assignment,
  // assignmentLoading,
  // triggerRefetch,
}: AssignmentDetailsBodyProps) => {
  const sections: AssignmentHeaderDisplay[] = [
    {
      heading: "Document Name",
      subHeading: assignment?.title || "",
    },
    {
      heading: "Created By",
      subHeading: assignment?.title || "",
    },
    {
      heading: "Assignment Type",
      // subHeading: assignment?.assignment_type_id || "",
      subHeading: "Assignment Type"
    },
  ];

  return (
    <Box>
      <Box bg={"#244d8a"} w={"100%"} p={4} borderRadius={"md"}>
        <HStack color={"white"}>
          <For each={sections}>
            {(item, index) => (
              <VStack key={index} w={"100%"}>
                <Text fontWeight={"bold"}>{item.heading}</Text>
                <Text>{item.subHeading}</Text>
              </VStack>
            )}
          </For>
          <Button color="white" bg="#BD4F23" borderRadius={"xl"}>
            Change <BsStars />
          </Button>
        </HStack>
      </Box>

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
    </Box>
  );
};

export default AssignmentDetailsBody;
