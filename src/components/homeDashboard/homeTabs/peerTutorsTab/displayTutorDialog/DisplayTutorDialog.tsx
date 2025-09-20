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
  Box,
} from "@chakra-ui/react";
import type { UserType } from "../../../../../types/UserTypes";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import TutorDialogCurrentStudents from "./TutorDialogCurrentStudents";
import UpdateCurrentStudentsDialog from "../updateTutorDialog/UpdateCurrentStudentsDialog";

interface DisplayTutorDialogProps {
  user: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;
  onUpdated?: () => void;
}

const DisplayTutorDialog = ({
  user,
  open,
  setOpen,
  setOpenDeleteDialog,
  onUpdated,
}: DisplayTutorDialogProps) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
  const [trashHover, setTrashHover] = useState(false);

  const handleDeleteProfileClick = () => {
    setOpenDeleteDialog(true);
    setOpen(false);
  };

  return (
    <Box>
      <Dialog.Root
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement={"center"}
        size={"lg"}
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

                <TutorDialogCurrentStudents
                  handleOpenUpdateDialog={() =>
                    setOpenUpdateDialog(!openUpdateDialog)
                  }
                  tutorId={user.id}
                  refetchTrigger={refetchTrigger}
                />

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
                      Back to Dashboard
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button
                    onClick={handleDeleteProfileClick}
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
                </HStack>
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {openUpdateDialog && (
        <UpdateCurrentStudentsDialog
          tutor={user}
          open={openUpdateDialog}
          setOpen={setOpenUpdateDialog}
          triggerRefetch={() => {
            setRefetchTrigger((v) => v + 1);
            onUpdated?.();
          }}
        />
      )}
    </Box>
  );
};

export default DisplayTutorDialog;
