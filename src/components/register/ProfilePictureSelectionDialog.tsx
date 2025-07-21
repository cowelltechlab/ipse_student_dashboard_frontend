import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Text,
  type ButtonProps,
} from "@chakra-ui/react";
import DefaultProfilePictureGrid from "./DefaultProfilePictureGrid";
import { useState } from "react";
import ProfilePictureUpload from "../common/universal/ProfilePictureUpload";

interface ProfilePictureSelectionDialogProps {
  onSelectDefaultImage: (pictureUrl: string) => void;
  onUploadedImage: (file: File) => void;
  buttonStyles?: ButtonProps;
  saveLoading?: boolean
}

const ProfilePictureSelectionDialog = ({
  onSelectDefaultImage,
  onUploadedImage,
  buttonStyles = {},
  saveLoading = false
}: ProfilePictureSelectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDefaultPicture, setSelectedDefaultPicture] = useState<
    string | null
  >(null);
  const [tempUploadedImage, setTempUploadedImage] = useState<File | null>(null);

  const handleDefaultSelect = (url: string) => {
    setSelectedDefaultPicture(url);
    setTempUploadedImage(null); // Clear uploaded image
  };

  const handleFileUpload = (file: File) => {
    setTempUploadedImage(file);
    setSelectedDefaultPicture(null); // Clear default selection
  };

  const handlePictureSelection = () => {
    if (selectedDefaultPicture) {
      onSelectDefaultImage(selectedDefaultPicture);
    } else if (tempUploadedImage) {
      onUploadedImage(tempUploadedImage);
    }
    setOpen(false);
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          w="full"
          borderColor="#bd4f23"
          bg="none"
          color="white"
          _hover={{ bg: "#eaa98f", border: "none" }}
          {...buttonStyles}
          loading={saveLoading}
        >
          Upload Profile Picture
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" borderRadius="md" pb={5}>
            <Dialog.Header>
              <Dialog.Title color="#244d8a">
                Select Profile Picture
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <DefaultProfilePictureGrid
                selectedPicture={selectedDefaultPicture}
                onSelectPicture={handleDefaultSelect}
              />

              <Flex align="center" w="full" my={4}>
                <Box flex="1" height="1px" bg="#244d8a" />
                <Box
                  bg="#244d8a"
                  px={3}
                  borderRadius="full"
                  mx={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="40px"
                  minH="32px"
                >
                  <Text textAlign="center" color="white" fontWeight="bold">
                    or
                  </Text>
                </Box>
                <Box flex="1" height="1px" bg="#244d8a" />
              </Flex>

              <ProfilePictureUpload onFileUpload={handleFileUpload} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  borderColor={"#bd4f23"}
                  color={"#bd4f23"}
                  _hover={{ bg: "#eaa98f", border: "none", color: "white" }}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg="#bd4f23"
                color="white"
                disabled={!selectedDefaultPicture && !tempUploadedImage}
                onClick={handlePictureSelection}
              >
                Save
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

export default ProfilePictureSelectionDialog;
