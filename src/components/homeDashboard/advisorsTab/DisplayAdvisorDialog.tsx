import {
  Text,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import type { UserType } from "../../../types/UserTypes";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";

interface DisplayAdvisorDialogProps {
  user: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserCardClickDialog = ({
  user,
  open,
  setOpen,
}: DisplayAdvisorDialogProps) => {

    const [trashHover, setTrashHover] = useState(false);


  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={5}>
            <Dialog.Header>
              <Flex
                m={2}
                bg={"#244D8A"}
                py={2}
                borderRadius="md"
                w={"100%"}
                align="center"
                justify="center"
              >
                <Dialog.Title color={"white"} fontSize="xl">
                  {user.first_name} {user.last_name}
                </Dialog.Title>
              </Flex>
            </Dialog.Header>
            <Dialog.Body>
              <HStack mb={2} justifyContent="space-between">
                <Text fontSize="md" mb={2}>
                  {user.roles?.[0] || "No Role Assigned"}
                </Text>

                <Text fontSize="md" mb={2}>
                  {user.email || "No Email Provided"}
                </Text>
              </HStack>

              <VStack m={2} align="center" mt={4}>
                <Dialog.ActionTrigger asChild>
                  <Button bg={"#BD4F23"} w={"50%"}>
                    Back to Dashboard
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  variant="outline"
                  borderColor="#BD4F23"
                  color="#BD4F23"
                  w={"50%"}
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
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UserCardClickDialog;
