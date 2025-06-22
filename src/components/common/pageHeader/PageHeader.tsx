import {
  Heading,
  HStack,
  Spacer,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";

import { IoIosNotifications } from "react-icons/io";

import CreateNewDropdown from "./CreateNewDropdown";
import TextButton from "../universal/TextButton";

const PageHeader = () => {
  const onHomeClick = () => {
    // Logic for navigating to home
    console.log("Home clicked");
  };

  return (
    <HStack p={4}>
      <Heading>IPSE Student Dashboard</Heading>
      <Spacer />
      <HStack gap={4}>
        <TextButton onClick={onHomeClick}>Home</TextButton>
        <CreateNewDropdown />
        <IoIosNotifications color="#bd4f23" size={24} />
        <AvatarGroup>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
        </AvatarGroup>
      </HStack>
    </HStack>
  );
};

export default PageHeader;
