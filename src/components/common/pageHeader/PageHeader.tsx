import {
  Heading,
  Button,
  HStack,
  Spacer,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";

import { IoIosNotifications } from "react-icons/io";

import CreateNewDropdown from "./CreateNewDropdown";

const PageHeader = () => {
  const onHomeClick = () => {
    // Logic for navigating to home
    console.log("Home clicked");
  };

  return (
    <HStack p={4}>
      <Heading>IPSE Student Dashboard</Heading>
      <Spacer />
      <HStack>
        <Button onClick={onHomeClick}>Home</Button>
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
