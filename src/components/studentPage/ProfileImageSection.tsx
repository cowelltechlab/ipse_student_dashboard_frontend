import { Image, Skeleton, VStack } from "@chakra-ui/react";
import defaultProfileImage from "../../assets/default_profile_picture.jpg";
import ProfilePictureSelectionDialog from "../register/ProfilePictureSelectionDialog";
import usePostProfilePicture from "../../hooks/studentProfiles/usePostProfilePicture";

interface ProfileImageSectionProps {
  studentId: number | undefined;
  profilePictureUrl: string | undefined;
  imageLoading: boolean;
  triggerRefetch: () => void
}

const ProfileImageSection = ({
  studentId,
  profilePictureUrl,
  imageLoading,
  triggerRefetch
}: ProfileImageSectionProps) => {
  const { loading, handlePostProfilePicture } = usePostProfilePicture();

  const handleSelectDefaultImage = async (url: string) => {
    if (!studentId) return;
    try {
      await handlePostProfilePicture(studentId, url, null);
      triggerRefetch()
    } catch (err) {
      console.error("Failed to upload default profile image:", err);
    }
  };

  const handleUploadImage = async (file: File) => {
    if (!studentId) return;
    try {
      await handlePostProfilePicture(studentId, null, file);
      triggerRefetch()
    } catch (err) {
      console.error("Failed to upload profile image file:", err);
    }
  };

  return (
    <VStack flexShrink={0}>
      <Skeleton loading={imageLoading} borderRadius="md">
        <Image
          src={profilePictureUrl || defaultProfileImage}
          alt="Student Image"
          borderRadius="md"
          boxSize="280px"
          objectFit="cover"
        />
      </Skeleton>

      <ProfilePictureSelectionDialog
        onSelectDefaultImage={handleSelectDefaultImage}
        onUploadedImage={handleUploadImage}
        buttonStyles={{ bg: "#bd4f23" }}
        saveLoading={loading}
      />
    </VStack>
  );
};

export default ProfileImageSection;
