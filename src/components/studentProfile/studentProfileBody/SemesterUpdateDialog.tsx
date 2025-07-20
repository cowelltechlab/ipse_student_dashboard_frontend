import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  Portal,
  Text,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";

import CreateProfileImage from "../../../assets/Create Profile.svg";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface SemesterUpdateDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: number;
}

const SemesterUpdateDialog = ({
  open,
  setOpen,
  userId,
}: SemesterUpdateDialog) => {
  const navigate = useNavigate();

  const handleNavigateCreateProfile = () => {
    navigate(`/profile-creation/${userId}`);
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
          <Dialog.Content bg={"white"} borderRadius={"md"} pb={5}>
            <Dialog.Body m={4}>
              <VStack>
                <Box
                  p={4}
                  bg={"#eaeef4"}
                  borderRadius={"md"}
                  w={"100%"}
                  justifyItems={"center"}
                >
                  <Heading size={"3xl"} color={"#244D8A"}>
                    Time to update profile!
                  </Heading>
                </Box>

                <HStack justifyContent="space-between" alignItems="center">
                  <Image height="200px" src={CreateProfileImage} />
                  <Box flex="1" textAlign="center">
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      m={6}
                      lineHeight="tall"
                    >
                      It's time to review and update your profile for the semester.
                    </Text>
                  </Box>
                </HStack>

                <Box
                  p={2}
                  bg={"#eaeef4"}
                  borderRadius={"md"}
                  w={"100%"}
                  justifyItems={"center"}
                >
                  <Heading color={"#244D8A"}>How does it work?</Heading>
                </Box>
                <Text>We share what you write in your profile with AI.</Text>
                <Text mt={1}>
                  This helps AI make decisions about how to change your work.
                </Text>
                <Text mt={1}>
                  For Privacy, we won't share your name with AI.
                </Text>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer m={4}>
              <Dialog.ActionTrigger asChild>
                <Button
                  borderColor="#BD4F23"
                  bg={"none"}
                  color="#BD4F23"
                  w={"50%"}
                  _hover={{
                    bg: "#BD4F23",
                    borderColor: "#BD4F23",
                    color: "white",
                  }}
                >
                  Wait until later
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg={"#BD4F23"}
                w={"50%"}
                onClick={handleNavigateCreateProfile}
              >
                Let's Go!
                <FaArrowAltCircleRight />
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

export default SemesterUpdateDialog;
