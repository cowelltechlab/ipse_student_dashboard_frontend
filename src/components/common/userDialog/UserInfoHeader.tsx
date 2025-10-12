import { HStack, Text } from "@chakra-ui/react";
import type { UserType } from "../../../types/UserTypes";

interface UserInfoHeaderProps {
  user: UserType;
}

const UserInfoHeader = ({ user }: UserInfoHeaderProps) => {
  return (
    <HStack mb={4} justifyContent="space-between">
      <Text fontSize="md" color="#6F6F6F">
        {user.roles?.[0] || "No Role Assigned"}
      </Text>
      <Text fontSize="md" color="#6F6F6F">
        {user.email || "No Email Provided"}
      </Text>
    </HStack>
  );
};

export default UserInfoHeader;
