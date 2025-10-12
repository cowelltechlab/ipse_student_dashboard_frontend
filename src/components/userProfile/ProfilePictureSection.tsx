import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Image,
  Text,
  Input,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import useDefaultProfilePictures from "../../hooks/users/useDefaultProfilePictures";
import useUpdateProfilePicture from "../../hooks/users/useUpdateProfilePicture";
import { toaster } from "../ui/toaster";
import useAuth from "../../contexts/useAuth";

import profileDefaultIcon from "../../assets/default_profile_picture.jpg";

interface ProfilePictureSectionProps {
  currentProfilePictureUrl: string | null;
  onUpdate: () => void;
}

const ProfilePictureSection = ({
  currentProfilePictureUrl,
  onUpdate,
}: ProfilePictureSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDefaultUrl, setSelectedDefaultUrl] = useState<string | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { defaultProfilePictures, loading: loadingDefaults } =
    useDefaultProfilePictures();
  const { handleUpdateProfilePicture, loading } = useUpdateProfilePicture();
  const { updateProfilePicture } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedDefaultUrl(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultSelect = (url: string) => {
    setSelectedDefaultUrl(url);
    setSelectedFile(null);
    setPreviewUrl(url);
  };

  const handleSave = async () => {
    try {
      const response = await handleUpdateProfilePicture(selectedFile, selectedDefaultUrl);

      // Immediately update the profile picture in auth context for instant visual feedback
      if (response.profile_picture_url) {
        updateProfilePicture(response.profile_picture_url);
      }

      toaster.create({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully.",
        type: "success",
      });

      // Reset state
      setIsEditing(false);
      setSelectedFile(null);
      setSelectedDefaultUrl(null);
      setPreviewUrl(null);

      onUpdate();
    } catch (e) {
      const error = e as { message?: string };
      toaster.create({
        title: "Update Failed",
        description: error.message || "Failed to update profile picture.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setSelectedDefaultUrl(null);
    setPreviewUrl(null);
  };

  const displayUrl = previewUrl || currentProfilePictureUrl || profileDefaultIcon;

  return (
    <Box
      bg="white"
      borderRadius="md"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
    >
      <Heading fontSize="lg" color="#244D8A" mb={4}>
        Profile Picture
      </Heading>

      <VStack gap={4} align="center">
        {/* Current/Preview Picture */}
        <Image
          src={displayUrl}
          alt="Profile Picture"
          boxSize="150px"
          borderRadius="full"
          objectFit="cover"
          border="3px solid"
          borderColor="#244D8A"
        />

        {!isEditing ? (
          <Button
            bg="#244D8A"
            color="white"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "#1a3a6b" }}
          >
            Change Profile Picture
          </Button>
        ) : (
          <VStack gap={4} w="100%">
            {/* Upload Custom Picture */}
            <Box w="100%">
              <Text fontWeight="semibold" mb={2}>
                Upload Custom Picture
              </Text>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                p={1}
              />
            </Box>

            {/* Choose from Defaults */}
            <Box w="100%">
              <Text fontWeight="semibold" mb={2}>
                Or Choose from Defaults
              </Text>
              {loadingDefaults ? (
                <HStack justify="center" py={4}>
                  <Spinner size="md" color="#244D8A" />
                </HStack>
              ) : (
                <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                  {defaultProfilePictures.map((pic) => (
                    <Image
                      key={pic.id}
                      src={pic.url}
                      alt={`Default ${pic.id}`}
                      boxSize="60px"
                      borderRadius="full"
                      objectFit="cover"
                      cursor="pointer"
                      border="3px solid"
                      borderColor={
                        selectedDefaultUrl === pic.url
                          ? "#BD4F23"
                          : "transparent"
                      }
                      _hover={{ borderColor: "#244D8A" }}
                      onClick={() => handleDefaultSelect(pic.url)}
                    />
                  ))}
                </Grid>
              )}
            </Box>

            {/* Action Buttons */}
            <HStack w="100%" gap={2}>
              <Button
                variant="outline"
                borderColor="#BD4F23"
                color="#BD4F23"
                w="50%"
                onClick={handleCancel}
                disabled={loading}
                _hover={{
                  bg: "#BD4F23",
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                bg="#BD4F23"
                color="white"
                w="50%"
                onClick={handleSave}
                loading={loading}
                disabled={loading || (!selectedFile && !selectedDefaultUrl)}
                _hover={{ bg: "#A43E1E" }}
              >
                Save Picture
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default ProfilePictureSection;
