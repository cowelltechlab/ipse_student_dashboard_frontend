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
  Separator,
  Box,
} from "@chakra-ui/react";
import type { UserType } from "../../../../types/UserTypes";
import { FaTrashCan } from "react-icons/fa6";
import { MdLockReset, MdEmail } from "react-icons/md";
import { useState } from "react";

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
  const [trashHover, setTrashHover] = useState<boolean>(false);

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
                {/* User Info Section */}
                <HStack mb={4} justifyContent="space-between">
                  <Text fontSize="md" color="#6F6F6F">
                    {user.roles?.[0] || "No Role Assigned"}
                  </Text>
                  <Text fontSize="md" color="#6F6F6F">
                    {user.email || "No Email Provided"}
                  </Text>
                </HStack>

                <Separator orientation="horizontal" mb={4} />

                {/* Account Settings Section */}
                <Box mb={4}>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="#6F6F6F"
                    mb={2}
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Account Settings
                  </Text>
                  <VStack gap={2} w="100%">
                    <Button
                      w="100%"
                      bg="#244D8A"
                      color="white"
                      onClick={handleOpenResetPasswordModal}
                      _hover={{ bg: "#1a3a6b" }}
                    >
                      <Icon as={MdLockReset} boxSize={5} mr={2} />
                      Reset Password
                    </Button>

                    <Button
                      w="100%"
                      bg="#244D8A"
                      color="white"
                      onClick={handleOpenEmailEditModal}
                      _hover={{ bg: "#1a3a6b" }}
                    >
                      <Icon as={MdEmail} boxSize={5} mr={2} />
                      Update Email Addresses
                    </Button>
                  </VStack>
                </Box>

                <Separator orientation="horizontal" mb={4} />

                {/* Navigation & Actions Section */}
                <VStack gap={2} w="100%">
                  <Dialog.ActionTrigger asChild>
                    <Button bg="#BD4F23" color="white" w="100%">
                      Back to Dashboard
                    </Button>
                  </Dialog.ActionTrigger>

                  <Button
                    onClick={handleDeleteProfileClick}
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
