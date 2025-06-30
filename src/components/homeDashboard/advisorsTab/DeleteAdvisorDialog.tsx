import {
  Text,
  Button,
  CloseButton,
  Dialog,
  Image,
  Portal,
  VStack,
  Icon,
  Box,
  Heading,
} from "@chakra-ui/react";
import type { UserType } from "../../../types/UserTypes";

import deleteProfileImage from "../../../assets/Create Profile.svg";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

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
  const [deleteHover, setDeleteHover] = useState(false);

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
          <Dialog.Content p={5} bg="#eaeef4">
            <Dialog.Body>
              <VStack justifyContent="space-between" spaceY={2}>
                <Image src={deleteProfileImage} />

                <Text fontSize="md" >
                  Are you sure you want to delete this profile?
                </Text>
                <Box bg={"#244D8A"} p={2} borderRadius="md" w={"100%"}>
                  <Heading fontSize="md" color="white" textAlign="center">
                    {user.first_name} {user.last_name} | {user.email}
                  </Heading>
                </Box>

                <Text fontSize="md" >
                  This action cannot be undone.
                </Text>
              </VStack>

              <VStack m={2} align="center" mt={6}>
                <Dialog.ActionTrigger asChild>
                  <Button bg={"#BD4F23"} w={"50%"}>
                    Cancel
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
                  onMouseEnter={() => setDeleteHover(true)}
                  onMouseLeave={() => setDeleteHover(false)}
                >
                  I am sure, delete profile
                  <Icon
                    as={FaCheckCircle}
                    ml={2}
                    color={deleteHover ? "white" : "#BD4F23"}
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
