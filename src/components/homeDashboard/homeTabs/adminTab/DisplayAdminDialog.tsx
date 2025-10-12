import {
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Separator,
} from "@chakra-ui/react";
import type { UserType } from "../../../../types/UserTypes";
import AccountSettingsButtons from "../../../common/userDialog/AccountSettingsButtons";
import DialogActionButtons from "../../../common/userDialog/DialogActionButtons";
import UserInfoHeader from "../../../common/userDialog/UserInfoHeader";

interface DisplayAdminDialogProps {
  user: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;

  handleOpenResetPasswordModal: () => void;
  handleOpenEmailEditModal: () => void;
}

const DisplayAdminDialog = ({
  user,
  open,
  setOpen,
  setOpenDeleteDialog,
  handleOpenResetPasswordModal,
  handleOpenEmailEditModal,
}: DisplayAdminDialogProps) => {
  const handleDeleteProfileClick = () => {
    setOpenDeleteDialog(true);
    setOpen(false);
  };

  return (
    <>
      <Dialog.Root
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p={5} bg="#eaeef4">
              <Dialog.Header>
                <Flex
                  mt={2}
                  bg="#244D8A"
                  p={2}
                  borderRadius="md"
                  w="100%"
                  align="center"
                  justify="center"
                >
                  <Dialog.Title color="white" fontSize="3xl">
                    {user.first_name} {user.last_name}
                  </Dialog.Title>
                </Flex>
              </Dialog.Header>
              <Dialog.Body>
                <UserInfoHeader user={user} />

                <Separator orientation="horizontal" mb={4} />

                <AccountSettingsButtons
                  onResetPassword={handleOpenResetPasswordModal}
                  onUpdateEmail={handleOpenEmailEditModal}
                />

                <Separator orientation="horizontal" mb={4} />

                <DialogActionButtons onDelete={handleDeleteProfileClick} />
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default DisplayAdminDialog;
