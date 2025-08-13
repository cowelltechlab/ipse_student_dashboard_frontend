import {
  Card,
  Avatar,
  Stack,
  Text,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";

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
      h={"175px"}
      onClick={() => onClick?.(user)}
      cursor="pointer"
      boxShadow={"md"}
      bg={"white"}
    >
      <Card.Body justifyContent={"center"}>
        <VStack my="5" gap={6}>
          <HStack gap={6}>
            <Avatar.Root shape={"rounded"} size={"xl"}>
              <Avatar.Image
                src={user.profile_picture_url ?? profileDefaultIcon}
                alt={`${user.first_name} ${user.last_name}`}
              />
            </Avatar.Root>
            <VStack gap="0" align="center">
              <Text fontWeight="semibold" textStyle="md" color={"#BD4F23"}>
                {user.first_name} {user.last_name}
              </Text>
              <Text color="fg.muted" textStyle="md">
                {user.roles?.[0] || "No Role Assigned"}
              </Text>
            </VStack>
          </HStack>

          <Stack gap="0" align="center">
            {user.profile_tag && (
              <Box
                bg="#244D8A"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
                display="flex"
                alignItems="center"
                gap="1"
              >
                <Text fontWeight="medium" fontSize="sm">
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
