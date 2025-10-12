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
import { useState } from "react";
import AdminPasswordResetModal from "../PasswordResetDialog";
import EmailUpdateModal from "../../../common/user/EmailUpdateModal";

interface DisplayAdvisorDialogProps {
  user: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenDeleteDialog: (open: boolean) => void;
  onUpdate: () => void;
}

const UserCardClickDialog = ({
  user,
  open,
  setOpen,
  setOpenDeleteDialog,
  onUpdate,
}: DisplayAdvisorDialogProps) => {
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState(false);

  const handleDeleteProfileClick = () => {
    setOpenDeleteDialog(true);
    setOpen(false);
  };

  const handleOpenResetPasswordModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  const handleOpenEmailEditModal = () => {
    setIsUpdateEmailModalOpen(true);
  };

  return (
    <>
      <Dialog.Root
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement={"center"}
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

      {isPasswordResetModalOpen && (
        <AdminPasswordResetModal
          open={isPasswordResetModalOpen}
          setOpen={setIsPasswordResetModalOpen}
          user={user}
          onPasswordReset={() => {}}
        />
      )}

      {isUpdateEmailModalOpen && (
        <EmailUpdateModal
          open={isUpdateEmailModalOpen}
          setOpen={setIsUpdateEmailModalOpen}
          user={user}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default UserCardClickDialog;
