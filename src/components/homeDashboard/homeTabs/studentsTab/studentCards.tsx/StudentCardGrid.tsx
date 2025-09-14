// StudentCardGrid.tsx
import { useState, useRef, useEffect } from "react";
import { Box, Text, VStack, useBreakpointValue, Wrap } from "@chakra-ui/react";
import { motion } from "framer-motion";
import StudentCard from "./StudentCard";
import TextButton from "../../../../common/universal/TextButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { UserType } from "../../../../../types/UserTypes";
import type { ErrorType } from "../../../../../types/ErrorType";

const MotionDiv = motion.div;

const StudentCardGrid = ({
  searchTerm,
  loading,
  error,
  yearName,
  onStudentClick,
  students,
}: {
  searchTerm: string | null;
  yearName: string | null;
  loading: boolean;
  error: ErrorType | null;
  students?: UserType[];
  onStudentClick?: (
    studentId: number | null,
    userId: number,
    profileTag: string | null,
    userInviteUrl: string | null
  ) => void;
}) => {
  const [visibleCount, setVisibleCount] = useState(15);

  // Only animate on the very first render after data is present
  const didAnimateRef = useRef(false);
  const shouldAnimate = !didAnimateRef.current;
  useEffect(() => {
    if (!loading && students && students.length > 0) {
      didAnimateRef.current = true;
    }
  }, [loading, students]);

  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (!loading) hasFetchedRef.current = true;
  }, [loading]);

  // Match grid columns to compute rowIndex
  const columns =
    useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }) || 1;

  if (loading || !hasFetchedRef.current || !Array.isArray(students)) {
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

  if (!students || students.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No students found.</Text>
      </Box>
    );
  }

  const sortedStudents = [...students].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const filteredStudents = sortedStudents.filter((s) => {
    const full = `${s.first_name} ${s.last_name}`.toLowerCase();
    const matchesSearch = full.includes(searchTerm?.toLowerCase() || "");
    const matchesYear = yearName
      ? s.student_profile?.year_name === yearName
      : true;
    return matchesSearch && matchesYear;
  });

  const studentsToShow = filteredStudents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudents.length;

  return (
    <VStack>
      <Wrap gap="40px" p={4} maxW={"1800px"} mx="auto" justify="center">
        {studentsToShow.map((student, i) => {
          const rowIndex = Math.floor(i / columns);
          return (
            <MotionDiv
              key={student.id}
              initial={shouldAnimate ? { y: -8, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: shouldAnimate ? rowIndex * 0.1 : 0,
              }}
            >
              <StudentCard
                firstName={student.first_name}
                lastName={student.last_name}
                classYear={student.student_profile?.year_name || null}
                schoolEmail={student.school_email || ""}
                profilePictureUrl={student.profile_picture_url}
                profile_tag={student.profile_tag || null}
                onClick={() => {
                  const sid = student.student_profile?.student_id ?? null;
                  const tag = student.profile_tag ?? null;
                  onStudentClick?.(sid, student.id, tag, student.invite_url ?? null);
                }}
              />
            </MotionDiv>
          );
        })}
      </Wrap>

      {hasMore && (
        <TextButton
          color="#bd4f23"
          onClick={() => setVisibleCount((p) => p + 10)}
        >
          View 10 More
        </TextButton>
      )}
    </VStack>
  );
};

export default StudentCardGrid;
