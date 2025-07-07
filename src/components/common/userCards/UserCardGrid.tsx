import { useState } from "react";
import { Box, Spinner, Text, VStack, Wrap } from "@chakra-ui/react";
import type { UserType } from "../../../types/UserTypes";
import UserCard from "./UserCard";
import type { ErrorType } from "../../../types/ErrorType";
import TextButton from "../universal/TextButton";

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
  const [visibleCount, setVisibleCount] = useState(15);

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

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm?.toLowerCase() || "");
  });

  const usersToShow = filteredUsers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUsers.length;

  return (
    <VStack>
      <Wrap gap="40px" p={4} maxW={"1800px"} mx="auto" justify="center">
        {usersToShow.map((user) => (
          <UserCard
            user={user}
            onClick={() => onCardClick(user)}
            key={user.id}
          />
        ))}
      </Wrap>

      {hasMore && (
        <TextButton
          color="#bd4f23"
          onClick={() => setVisibleCount((prev) => prev + 10)}
        >
          View 10 More
        </TextButton>
      )}
    </VStack>
  );
};

export default UserCardGrid;
