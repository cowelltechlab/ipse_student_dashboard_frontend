import { Card, Avatar, Stack, Text, VStack } from "@chakra-ui/react";

import profileDefaultIcon from "../../../assets/profile_default.png";

interface UserCardProps {
  firstName: string;
  lastName: string;
  roleName?: string;
  profilePictureUrl?: string;
  onClick?: () => void;
}

const UserCard = ({
  firstName,
  lastName,
  profilePictureUrl,
  onClick,
  roleName,
}: UserCardProps) => {
  return (
    <Card.Root
      width="320px"
      onClick={onClick}
      cursor="pointer"
      boxShadow={"md"}
    >
      <Card.Body>
        <VStack my="3" gap="3">
          <Avatar.Root>
            <Avatar.Image
              src={profilePictureUrl ? profilePictureUrl : profileDefaultIcon}
              alt={`${firstName} ${lastName}`}
              width="40px"
              height="40px"
              borderRadius="full"
            />
          </Avatar.Root>
          <Stack gap="0" align="center">
            <Text fontWeight="semibold" textStyle="md">
              {firstName} {lastName}
            </Text>
            <Text color="fg.muted" textStyle="md">
              {roleName || "No Role Assigned"}
            </Text>
          </Stack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;
