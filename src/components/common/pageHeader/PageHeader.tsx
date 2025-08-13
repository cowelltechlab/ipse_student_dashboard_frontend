import {
  HStack,
  Spacer,
  AvatarGroup,
  Avatar,
  Image,
  Separator,
} from "@chakra-ui/react";

import CreateNewDropdown from "./CreateNewDropdown";
import TextButton from "../universal/TextButton";
import useAuth from "../../../contexts/useAuth";

import profileDefaultIcon from "../../../assets/default_profile_picture.jpg";
import myChoiceText from "../../../assets/myChoice.png";
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
      <HStack gap={1} onClick={onHomeClick} cursor="pointer">
        <Image src={myChoiceText} alt="MyChoice" />
        <Image src="/app_icon.svg" alt="MyChoice" boxSize="65px" />
      </HStack>

      <Spacer />
      <HStack gap={4}>
        <TextButton onClick={onHomeClick}>Home</TextButton>
        <CreateNewDropdown />
        <AvatarGroup>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image src={profilePictureUrl ?? profileDefaultIcon} />
          </Avatar.Root>
        </AvatarGroup>
      </HStack>
      <Separator my={6} />
    </HStack>
  );
};

export default PageHeader;
