import { Button, Dialog, Icon, VStack } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";

interface DialogActionButtonsProps {
  onBack?: () => void;
  onDelete: () => void;
  backLabel?: string;
}

const DialogActionButtons = ({
  onBack,
  onDelete,
  backLabel = "Back to Dashboard",
}: DialogActionButtonsProps) => {
  const [trashHover, setTrashHover] = useState<boolean>(false);

  return (
    <VStack gap={2} w="100%">
      {onBack ? (
        <Button bg="#BD4F23" color="white" w="100%" onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <Dialog.ActionTrigger asChild>
          <Button bg="#BD4F23" color="white" w="100%">
            {backLabel}
          </Button>
        </Dialog.ActionTrigger>
      )}

      <Button
        onClick={onDelete}
        variant="outline"
        borderColor="#BD4F23"
        color="#BD4F23"
        w="100%"
        _hover={{
          bg: "#BD4F23",
          borderColor: "#BD4F23",
          color: "white",
        }}
        onMouseEnter={() => setTrashHover(true)}
        onMouseLeave={() => setTrashHover(false)}
      >
        Delete Profile
        <Icon
          as={FaTrashCan}
          ml={2}
          color={trashHover ? "white" : "#BD4F23"}
          _hover={{ color: "white" }}
        />
      </Button>
    </VStack>
  );
};

export default DialogActionButtons;
