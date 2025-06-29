import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import type { UserType } from "../../../types/UserTypes";
import UserCard from "./UserCard";
import type { ErrorType } from "../../../types/ErrorType";

interface UserCardGridProps {
  searchTerm: string | null;
  onCardClick: (user: UserType) => void;

  users?: UserType[];
  loading?: boolean;
  error?: ErrorType | null;
}

const UserCardGrid = ({
  searchTerm,
  users,
  loading,
  error,
  onCardClick,
}: UserCardGridProps) => {
  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Failed to load users.</Text>
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No users found.</Text>
      </Box>
    );
  }

  //   Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm?.toLowerCase() || "");
  });

  return (
    <SimpleGrid
      minChildWidth="320px"
      gap="40px"
      p={4}
      maxW={"1500px"}
      mx="auto"
    >
      {filteredUsers.map((user) => (
        <UserCard user={user} onClick={() => onCardClick(user)} />
      ))}
    </SimpleGrid>
  );
};

export default UserCardGrid;
