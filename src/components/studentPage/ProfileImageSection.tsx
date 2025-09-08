import { Image, Skeleton, Spacer, VStack } from "@chakra-ui/react";
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

      <Spacer />

      <ProfilePictureSelectionDialog
        onSelectDefaultImage={handleSelectDefaultImage}
        onUploadedImage={handleUploadImage}
        buttonStyles={{ bg: "#BD4F23", borderColor: "None", _hover: { bg: "#5e89caff" } }}
        saveLoading={loading}
      />
    </VStack>
  );
};

export default ProfileImageSection;
