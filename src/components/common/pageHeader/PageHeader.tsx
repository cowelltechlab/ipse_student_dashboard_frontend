import { Heading, HStack, Spacer, AvatarGroup, Avatar, Image } from "@chakra-ui/react";

import { IoIosNotifications } from "react-icons/io";

import CreateNewDropdown from "./CreateNewDropdown";
import TextButton from "../universal/TextButton";
import useAuth from "../../../contexts/useAuth";

import profileDefaultIcon from "../../../assets/default_profile_picture.jpg";
import { useNavigate } from "react-router-dom";

const PageHeader = () => {
  const { profilePictureUrl } = useAuth();

  const navigate = useNavigate();

  const onHomeClick = () => {
    // TODO: Update so student role is redirected to student home page instead
    navigate("/dashboard");
  };

  return (
    <HStack p={4}>
      <Image src="/app_icon.svg" alt="MyChoice" boxSize="40px" />
      <Heading>MyChoice</Heading>
      <Spacer />
      <HStack gap={4}>
        <TextButton onClick={onHomeClick}>Home</TextButton>
        <CreateNewDropdown />
        <IoIosNotifications color="#bd4f23" size={24} />
        <AvatarGroup>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image src={profilePictureUrl ?? profileDefaultIcon} />
          </Avatar.Root>
        </AvatarGroup>
      </HStack>
    </HStack>
  );
};

export default PageHeader;
