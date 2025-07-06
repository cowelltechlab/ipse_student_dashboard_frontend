import {
  Text,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  HStack,
  Icon,
  Separator,
} from "@chakra-ui/react";
import type { UserType } from "../../../../types/UserTypes";
import { FaTrashCan } from "react-icons/fa6";
import TutorDialogCurrentStudents from "./TutorDialogCurrentStudents";
import { useState } from "react";

interface DisplayTutorDialogProps {
  user: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DisplayTutorDialog = ({
  user,
  open,
  setOpen,
}: DisplayTutorDialogProps) => {

    const [addHover, setAddHover] = useState<boolean>(false)

    const handleAddToCUrrentStudents = () => {
        // TODO: this function should not post to API but should add the list to the header
        console.log("Add to current students") 
    }

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      size={"cover"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={5} bg={"#eaeef4"}>
            <Dialog.Header>
              <Flex
                mt={2}
                bg={"#244D8A"}
                p={2}
                borderRadius="md"
                w={"100%"}
                align="center"
                justify="center"
              >
                <Dialog.Title color={"white"} fontSize="3xl">
                  {user.first_name} {user.last_name}
                </Dialog.Title>
              </Flex>
            </Dialog.Header>
            <Dialog.Body>
              <HStack mb={2} justifyContent="space-between">
                <Text fontSize="md" mb={2} color={"#6F6F6F"}>
                  {user.roles?.[0] || "No Role Assigned"}
                </Text>

                <Text fontSize="md" mb={2} color={"#6F6F6F"}>
                  {user.email || "No Email Provided"}
                </Text>
              </HStack>
              <Separator orientation="horizontal" mb={4} />

              <TutorDialogCurrentStudents tutorId={user.id} />

              <HStack w={"100%"} justifyContent={"center"} mt={4}>
                <Dialog.ActionTrigger asChild>
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
                  >
                    Save Changes
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={handleAddToCUrrentStudents}
                  variant="outline"
                  borderColor="#BD4F23"
                  color="#BD4F23"
                  w={"50%"}
                  _hover={{
                    bg: "#BD4F23",
                    borderColor: "#BD4F23",
                    color: "white",
                  }}
                  onMouseEnter={() => setAddHover(true)}
                  onMouseLeave={() => setAddHover(false)}
                >
                  Add to Current Students
                  <Icon
                    as={FaTrashCan}
                    ml={2}
                    color={addHover ? "white" : "#BD4F23"}
                    _hover={{ color: "white" }}
                  />
                </Button>
              </HStack>
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

export default DisplayTutorDialog;
