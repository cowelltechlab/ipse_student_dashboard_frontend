import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import DefaultProfilePictureGrid from "./DefaultProfilePictureGrid";
import { useState } from "react";
import ProfilePictureUpload from "../common/universal/ProfilePictureUpload";

interface ProfilePictureSelectionDialogProps {
  onSelectDefaultImage: (pictureUrl: string) => void;
  onUploadedImage: (file: File) => void;
}

const ProfilePictureSelectionDialog = ({
  onSelectDefaultImage,
  onUploadedImage,
}: ProfilePictureSelectionDialogProps) => {
  const [selectedDefaultPicture, setSelectedDefaultPicture] = useState<
    string | null
  >(null);
  const [tempUploadedImage, setTempUploadedImage] = useState<File | null>(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Upload Profile Picture</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Select Profile Picture</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <DefaultProfilePictureGrid
                selectedPicture={selectedDefaultPicture}
                onSelectPicture={setSelectedDefaultPicture}
              />

              <Text>Or</Text>
              <ProfilePictureUpload onFileUpload={setTempUploadedImage} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                disabled={!selectedDefaultPicture || !tempUploadedImage}
                onClick={() => {
                  if (selectedDefaultPicture) {
                    onSelectDefaultImage(selectedDefaultPicture);
                  }
                  if (tempUploadedImage) {
                    onUploadedImage(tempUploadedImage);
                  }
                }}
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
