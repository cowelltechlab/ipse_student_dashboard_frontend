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
  yearName?: string | null;
}

const UserCardGrid = ({
  searchTerm,
  users,
  loading,
  error,
  onCardClick,
  yearName,
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

  const sortedUsers = [...users].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes((searchTerm ?? "").toLowerCase());

    if (!yearName) return matchesSearch;

    const target = yearName.trim().toLowerCase();

    const studentYearRaw = user.student_profile?.year_name ?? null;
    const studentYear = studentYearRaw ? studentYearRaw.trim().toLowerCase() : null;

    const tutorYearsRaw: string[] = Array.isArray(user.tutored_students)
      ? user.tutored_students.map((t: any) => String(t?.name ?? ""))
      : [];
    const tutorYears = tutorYearsRaw.map((y) => y.trim().toLowerCase());

    const matchesYear =
      (!!studentYear && studentYear === target) || tutorYears.includes(target);

    return matchesSearch && matchesYear;
  });

  const usersToShow = filteredUsers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUsers.length;

  return (
    <VStack>
      <Wrap gap="40px" p={4} maxW="1800px" mx="auto" justify="center">
        {usersToShow.map((user) => (
          <UserCard user={user} onClick={() => onCardClick(user)} key={user.id} />
        ))}
      </Wrap>

      {hasMore && (
        <TextButton color="#bd4f23" onClick={() => setVisibleCount((prev) => prev + 10)}>
          View 10 More
        </TextButton>
      )}
    </VStack>
  );
};

export default UserCardGrid;
