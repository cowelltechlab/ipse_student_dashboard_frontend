import { useState, useRef, useEffect } from "react";
import { Box, Text, VStack, Wrap, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { UserType } from "../../../types/UserTypes";
import UserCard from "./UserCard";
import type { ErrorType } from "../../../types/ErrorType";
import TextButton from "../universal/TextButton";

const MotionDiv = motion.div;

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

  // Only animate on the very first render after data is present
  const didAnimateRef = useRef(false);
  const shouldAnimate = !didAnimateRef.current;
  useEffect(() => {
    if (!loading && users && users.length > 0) {
      didAnimateRef.current = true;
    }
  }, [loading, users]);

  // Match grid columns to compute rowIndex
  const columns =
    useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }) || 1;

  if (loading || !Array.isArray(users)) {
    return (
      <Box textAlign="center" py={10}>
        <DotLottieReact
          src="https://lottie.host/749207af-f4b1-47e3-8768-449bb1d7e5c5/66y1ECtWZR.lottie"
          loop
          autoplay
          height={"45px"}
        />
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
        {usersToShow.map((user, i) => {
          const rowIndex = Math.floor(i / columns);
          return (
            <MotionDiv
              key={user.id}
              initial={shouldAnimate ? { y: -8, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: shouldAnimate ? rowIndex * 0.1 : 0,
              }}
            >
              <UserCard user={user} onClick={() => onCardClick(user)} />
            </MotionDiv>
          );
        })}
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
