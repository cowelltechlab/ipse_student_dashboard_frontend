import {
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Separator,
  Box,
} from "@chakra-ui/react";
import type { UserType } from "../../../../../types/UserTypes";
import { useState } from "react";
import TutorDialogCurrentStudents from "./TutorDialogCurrentStudents";
import UpdateCurrentStudentsDialog from "../updateTutorDialog/UpdateCurrentStudentsDialog";
import AccountSettingsButtons from "../../../../common/userDialog/AccountSettingsButtons";
import DialogActionButtons from "../../../../common/userDialog/DialogActionButtons";
import UserInfoHeader from "../../../../common/userDialog/UserInfoHeader";
import AdminPasswordResetModal from "../../PasswordResetDialog";
import EmailUpdateModal from "../../../../common/user/EmailUpdateModal";

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

  const handleUpdate = () => {
    onUpdated?.();
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
                <UserInfoHeader user={user} />

                <Separator orientation="horizontal" mb={4} />

                <AccountSettingsButtons
                  onResetPassword={handleOpenResetPasswordModal}
                  onUpdateEmail={handleOpenEmailEditModal}
                />

                <Separator orientation="horizontal" mb={4} />

                <TutorDialogCurrentStudents
                  handleOpenUpdateDialog={() =>
                    setOpenUpdateDialog(!openUpdateDialog)
                  }
                  tutorId={user.id}
                  refetchTrigger={refetchTrigger}
                />

                <Separator orientation="horizontal" mb={4} mt={4} />

                <DialogActionButtons onDelete={handleDeleteProfileClick} />
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
          onUpdate={handleUpdate}
        />
      )}
    </Box>
  );
};

export default DisplayTutorDialog;
