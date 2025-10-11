import { Box, Grid, VStack } from "@chakra-ui/react";
import ProfilePictureSection from "./ProfilePictureSection";
import PasswordChangeSection from "./PasswordChangeSection";
import EmailUpdateSection from "./EmailUpdateSection";
import HeaderCard from "../common/pageHeader/HeaderCard";
import useAuth from "../../contexts/useAuth";

import ProfileIcon from "../../assets/Create Profile.svg";

const UserProfilePageContent = () => {
  const {
    userId,
    first_name,
    last_name,
    email,
    profilePictureUrl,
    refreshAuth,
  } = useAuth();

  const handleUpdate = async () => {
    await refreshAuth();
  };

  return (
    <Box>
      {/* Header Card */}
      <HeaderCard
        cardHeading={`${first_name} ${last_name}`}
        cardText={`Manage your profile settings, update your password, and keep your account secure.`}
        cardImageUrl={ProfileIcon}
      />

      {/* Profile Sections Grid */}
      <Box p={6} maxW="1200px" mx="auto">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={6}
        >
          {/* Left Column */}
          <VStack gap={6} align="stretch">
            <ProfilePictureSection
              currentProfilePictureUrl={profilePictureUrl}
              onUpdate={handleUpdate}
            />
          </VStack>

          {/* Right Column */}
          <VStack gap={6} align="stretch">
            <PasswordChangeSection />
            {userId && (
              <EmailUpdateSection
                userId={userId}
                currentEmail={email}
                currentGtEmail={email}
                onUpdate={handleUpdate}
              />
            )}
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfilePageContent;
