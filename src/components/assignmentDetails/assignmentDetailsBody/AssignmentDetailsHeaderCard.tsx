import { Box, HStack, VStack, Text, For, Button } from "@chakra-ui/react";
import type { AssignmentDetailType } from "../../../types/AssignmentTypes";
import { BsStars } from "react-icons/bs";

export type AssignmentHeaderDisplay = {
  heading: string;
  subHeading: string | null;
};

interface AssignmentDetailsHeaderCardProps {
  assignment: AssignmentDetailType | null;
}

const AssignmentDetailsHeaderCard = ({
  assignment,
}: AssignmentDetailsHeaderCardProps) => {
  const sections: AssignmentHeaderDisplay[] = [
    {
      heading: "Document Name",
      subHeading: assignment?.title || "",
    },

    {
      heading: "Class",
      subHeading: assignment?.class_info?.name || "",
    },

    {
      heading: "Type",
      subHeading: assignment?.assignment_type || "",
      // subHeading: "Assignment Type"
    },
  ];

  return (
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
  );
};

export default AssignmentDetailsHeaderCard;
