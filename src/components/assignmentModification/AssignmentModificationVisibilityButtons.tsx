import { HStack, Button, Icon } from "@chakra-ui/react";
import { HiLightBulb } from "react-icons/hi";

interface AssignmentModificationVisibilityButtonsProps {
  isOriginalVisible: boolean;
  isOptionsVisible: boolean;
  isNewVisible: boolean;

  toggleOriginalVisibility: () => void;
  toggleNewVisibility: () => void;
  toggleVersionOptionsVisibility: () => void;
}

const AssignmentModificationVisibilityButtons = ({
  isOriginalVisible,
  isOptionsVisible,
  isNewVisible,

  toggleOriginalVisibility,
  toggleNewVisibility,
  toggleVersionOptionsVisibility,
}: AssignmentModificationVisibilityButtonsProps) => {
  return (
    <HStack gap={1} mb={4} w="300px">
      <Button
        fontWeight={"bold"}
        flex="1"
        bg={isOriginalVisible ? "#244d8a" : "#eaeef4"}
        color={isOriginalVisible ? "#eaeef4" : "#244d8a"}
        size="sm"
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        borderTopLeftRadius="full"
        borderBottomLeftRadius="full"
        onClick={toggleOriginalVisibility}
      >
        Original
      </Button>

      <Button
        flex="1"
        borderRadius="0"
        size="sm"
        color={isOptionsVisible ? "#eaeef4" : "#244d8a"}
        bg={isOptionsVisible ? "#244d8a" : "#eaeef4"}
        onClick={toggleVersionOptionsVisibility}
      >
        <Icon as={HiLightBulb} />
      </Button>

      <Button
        flex="1"
        fontWeight={"bold"}
        bg={isNewVisible ? "#244d8a" : "#eaeef4"}
        color={isNewVisible ? "#eaeef4" : "#244d8a"}
        size="sm"
        borderTopRightRadius="full"
        borderBottomRightRadius="full"
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        onClick={toggleNewVisibility}
      >
        New
      </Button>
    </HStack>
  );
};

export default AssignmentModificationVisibilityButtons;
