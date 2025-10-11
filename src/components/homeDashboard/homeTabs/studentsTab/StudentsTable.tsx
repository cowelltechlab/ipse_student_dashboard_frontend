import { Box, Table, Text, Image, Badge, Button } from "@chakra-ui/react";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { UserType } from "../../../../types/UserTypes";
import type { ErrorType } from "../../../../types/ErrorType";
import profileDefaultIcon from "../../../../assets/default_profile_picture.jpg";

const MotionTableRow = motion.create(Table.Row);

interface StudentsTableProps {
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
}

const StudentsTable = ({
  searchTerm,
  yearName,
  loading,
  error,
  students = [],
  onStudentClick,
}: StudentsTableProps) => {
  const [sortBy, setSortBy] = useState<"name" | "email" | "year">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Only animate on the very first render after data is present
  const didAnimateRef = useRef(false);
  const shouldAnimate = !didAnimateRef.current;
  useEffect(() => {
    if (!loading && students && students.length > 0) {
      didAnimateRef.current = true;
    }
  }, [loading, students]);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.first_name?.toLowerCase().includes(lowerSearch) ||
          student.last_name?.toLowerCase().includes(lowerSearch) ||
          student.email?.toLowerCase().includes(lowerSearch) ||
          student.school_email?.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply year filter
    if (yearName) {
      filtered = filtered.filter(
        (student) => student.student_profile?.year_name === yearName
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let compareA: string;
      let compareB: string;

      switch (sortBy) {
        case "name":
          compareA = `${a.first_name} ${a.last_name}`.toLowerCase();
          compareB = `${b.first_name} ${b.last_name}`.toLowerCase();
          break;
        case "email":
          compareA = (a.email || "").toLowerCase();
          compareB = (b.email || "").toLowerCase();
          break;
        case "year":
          compareA = a.student_profile?.year_name || "";
          compareB = b.student_profile?.year_name || "";
          break;
        default:
          return 0;
      }

      if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
      if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [students, searchTerm, yearName, sortBy, sortOrder]);

  const handleSort = (column: "name" | "email" | "year") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleRowClick = (student: UserType) => {
    if (onStudentClick) {
      onStudentClick(
        student.student_profile?.student_id || null,
        student.id,
        student.profile_tag || null,
        student.invite_url || null
      );
    }
  };

  if (loading || !Array.isArray(students)) {
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
      <Box p={8} textAlign="center">
        <Text color="red.500">Error loading students: {error.message}</Text>
      </Box>
    );
  }

  if (filteredAndSortedStudents.length === 0) {
    return (
      <Box p={8} textAlign="center">
        <Text color="gray.500">No students found</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto" mt={6} maxW={1800} mx="auto">
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row bg="#244D8A">
            <Table.ColumnHeader color="white" p={3}>
              Picture
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color="white"
              p={3}
              cursor="pointer"
              onClick={() => handleSort("name")}
              _hover={{ bg: "#1a3a6b" }}
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color="white"
              p={3}
              cursor="pointer"
              onClick={() => handleSort("email")}
              _hover={{ bg: "#1a3a6b" }}
            >
              Email {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" p={3}>
              GT Email
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color="white"
              p={3}
              cursor="pointer"
              onClick={() => handleSort("year")}
              _hover={{ bg: "#1a3a6b" }}
            >
              Year {sortBy === "year" && (sortOrder === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" p={3}>
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" p={3}>
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredAndSortedStudents.map((student, index) => (
            <MotionTableRow
              key={student.id}
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => handleRowClick(student)}
              initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: shouldAnimate ? index * 0.03 : 0,
              }}
            >
              <Table.Cell p={3}>
                <Image
                  src={student.profile_picture_url || profileDefaultIcon}
                  alt={`${student.first_name} ${student.last_name}`}
                  boxSize="40px"
                  borderRadius="full"
                  objectFit="cover"
                />
              </Table.Cell>
              <Table.Cell p={3} fontWeight="medium">
                {student.first_name} {student.last_name}
              </Table.Cell>
              <Table.Cell p={3} color="gray.600">
                {student.email || "—"}
              </Table.Cell>
              <Table.Cell p={3} color="gray.600">
                {student.school_email || "—"}
              </Table.Cell>
              <Table.Cell p={3}>
                {student.student_profile?.year_name || "—"}
              </Table.Cell>
              <Table.Cell p={3}>
                <Badge
                  colorPalette={student.is_active ? "green" : "red"}
                  size="sm"
                >
                  {student.is_active ? "Active" : "Inactive"}
                </Badge>
              </Table.Cell>
              <Table.Cell p={3}>
                <Button
                  size="sm"
                  bg="#BD4F23"
                  color="white"
                  _hover={{ bg: "#A43E1E" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(student);
                  }}
                >
                  View
                </Button>
              </Table.Cell>
            </MotionTableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default StudentsTable;
