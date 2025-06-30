import { Button, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

interface ProfilePictureUploadProps {
  onFileUpload?: (file: File) => void;
}

const ProfilePictureUpload = ({ onFileUpload }: ProfilePictureUploadProps) => {
  return (
    <FileUpload.Root accept={["image/png", "image/jpeg"]}>
      <FileUpload.HiddenInput
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (onFileUpload && files && files.length > 0) {
            onFileUpload(files[0]);
          }
        }}
      />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload Profile Picture
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  );
};

export default ProfilePictureUpload;
