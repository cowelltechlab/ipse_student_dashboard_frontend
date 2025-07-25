import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  Image,
} from "@chakra-ui/react";
import useRoles from "../../../hooks/roles/useRoles";
import { useState } from "react";
import usePostUserInvite from "../../../hooks/users/usePostUser";
import CreateUserDialogForm from "./CreateUserDialogForm";

import CreateUserImage from "../../../assets/Login.svg";
import { toaster } from "../../ui/toaster";

interface DisplayCreateUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchTrigger?: number;
  setRefetchTrigger?: (trigger: number) => void;
}

const CreateUserDialog = ({
  open,
  setOpen,
  refetchTrigger = 0,
  setRefetchTrigger= () =>  refetchTrigger + 1,
}: DisplayCreateUserDialogProps) => {
  const { roles } = useRoles();
  const { handlePostUserInvite } = usePostUserInvite();

  const [newUserRoleIds, setNewUserRoleIds] = useState<string[]>([]);
  const [newUserGoogleEmail, setNewUserGoogleEmail] = useState<string>("");
  const [newUserGTEmail, setNewUserGTEmail] = useState<string>("");

  const handleCreateUser = async () => {
    try {
      await handlePostUserInvite(
        newUserGoogleEmail,
        newUserGTEmail,
        newUserRoleIds
      );
      toaster.create({
        description: `User invited successfully.`,
        type: "success",
      });
      setRefetchTrigger(refetchTrigger + 1);
      setOpen(false);
      setNewUserGoogleEmail("");
      setNewUserGTEmail("");
      setNewUserRoleIds([]);
    } catch (e) {
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };
      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating user: ${errorMessage}`,
        type: "error",
      });
    }
  };

  return (
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
          <Dialog.Content bg={"#244d8a"} borderRadius={"md"} pb={5}>
            <Box bg={"white"} w={"100%"} mb={4} roundedTop={"md"}>
              <HStack justifyContent="center" alignItems="center" p={4}>
                <Image
                  src={CreateUserImage}
                  alt="Create User"
                  boxSize="200px"
                  objectFit="fill"
                />
                <Text fontSize="lg" fontWeight="bold" textWrap="wrap">
                  Step into a smarter, more inclusive way to learn.
                </Text>
              </HStack>
            </Box>
            <Dialog.Header>
              <Dialog.Title color={"white"}>Create New User</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body m={4}>
              <CreateUserDialogForm
                newUserGoogleEmail={newUserGoogleEmail}
                setNewUserGoogleEmail={setNewUserGoogleEmail}
                newUserGTEmail={newUserGTEmail}
                setNewUserGTEmail={setNewUserGTEmail}
                newUserRoleIds={newUserRoleIds}
                setNewUserRoleIds={setNewUserRoleIds}
                roles={roles}
              />
            </Dialog.Body>
            <Dialog.Footer m={4}>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  w={"50%"}
                  _hover={{
                    bg: "#BD4F23",
                    borderColor: "#BD4F23",
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button bg={"#BD4F23"} w={"50%"} onClick={handleCreateUser}>
                Send Invite
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateUserDialog;
