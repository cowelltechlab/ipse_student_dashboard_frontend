import { Card, Avatar, Stack, Text, VStack, Box } from "@chakra-ui/react";

import profileDefaultIcon from "../../../assets/profile_default.png";
import type { UserType } from "../../../types/UserTypes";

interface UserCardProps {
  user: UserType;
  onClick?: (user: UserType) => void;
}

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <Card.Root
      width="320px"
      onClick={() => onClick?.(user)}
      cursor="pointer"
      boxShadow={"md"}
    >
      <Card.Body>
        <VStack my="3" gap="3">
          <Avatar.Root>
            <Avatar.Image
              src={user.profile_picture_url ?? profileDefaultIcon}
              alt={`${user.first_name} ${user.last_name}`}
              width="40px"
              height="40px"
              borderRadius="full"
            />
          </Avatar.Root>
          <Stack gap="0" align="center">
            <Text fontWeight="semibold" textStyle="md">
              {user.first_name} {user.last_name}
            </Text>
            <Text color="fg.muted" textStyle="md">
              {user.roles?.[0] || "No Role Assigned"}
            </Text>
            
            {user.profile_tag && (
              <Box bg={"#fbde8e"} px={3} py={2} borderRadius="full">
                <Text color="black" textStyle="sm">
                  {user.profile_tag}
                </Text>
              </Box>
            )}
          </Stack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;
