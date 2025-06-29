import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import type { UserType } from "../../../types/UserTypes";
import UserCard from "./UserCard";
import type { ErrorType } from "../../../types/ErrorType";

interface UserCardGridProps {
  searchTerm: string | null;
  users?: UserType[];
  loading?: boolean;
  error?: ErrorType | null;
}

const UserCardGrid = ({
  searchTerm,
  users,
  loading,
  error,
}: UserCardGridProps) => {
  const onUserClick = (user: UserType) => {
    console.log("User clicked:", user);
  };

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
        <UserCard
          key={user.id}
          firstName={user.first_name}
          lastName={user.last_name}
          profilePictureUrl={undefined}
          onClick={() => onUserClick?.(user)}
          roleName={user.roles?.[0] || "No Role Assigned"}
        />
      ))}
    </SimpleGrid>
  );
};

export default UserCardGrid;
