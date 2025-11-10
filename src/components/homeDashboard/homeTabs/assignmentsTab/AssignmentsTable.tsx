import {
  HStack,
  Skeleton,
  Stack,
  Table,
  Text,
  Alert,
  VStack,
  Heading,
  Box,
  Image,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AssignmentsTableRowButtons from "../../../common/assignments/AssignmentsTableRowButtons";
import type { AssignmentBasicType } from "../../../../types/AssignmentTypes";
import type { ErrorType } from "../../../../types/ErrorType";

import assignmentIcon from "../../../../assets/contract.png";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { SortOption } from "../../../common/assignments/AssignmentsSortDropdown";

const MotionTableRow = motion.create(Table.Row);

interface AssignmentsTableProps {
  assignments: AssignmentBasicType[];
  assignmentsLoading: boolean;
  assignmentsError: ErrorType | null;

  dateRange: { from: Date | undefined; to?: Date | undefined };
  searchTerm: string | null;
  selectedClassId: number | null;
  onAssignmentClick?: (studentId: number, assignmentId: number) => void;
  filterByNeedsRating: boolean;
  filterByNotFinalized: boolean;
  selectedSort: SortOption | null;

  triggerAssignmentsRefetch: () => void;
}
const AssignmentsTable = ({
  assignments,
  assignmentsLoading,
  assignmentsError,

  dateRange,
  searchTerm,
  selectedClassId,
  onAssignmentClick,
  filterByNeedsRating,
  filterByNotFinalized,
  selectedSort,
  triggerAssignmentsRefetch,
}: AssignmentsTableProps) => {
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    console.log("AssignmentsTable render - assignments:", assignments);
  }, [assignments]);

  // Only animate on the very first render after data is present
  const didAnimateRef = useRef(false);
  const shouldAnimate = !didAnimateRef.current;
  useEffect(() => {
    if (!assignmentsLoading && assignments && assignments.length > 0) {
      didAnimateRef.current = true;
    }
  }, [assignmentsLoading, assignments]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const assignmentDate = new Date(
      assignment.date_modified ?? assignment.date_created ?? ""
    );

    const fromDate = dateRange?.from;
    const toDate = dateRange?.to;

    const inDateRange =
      (!fromDate || assignmentDate >= fromDate) &&
      (!toDate || assignmentDate <= toDate);

    const lowerSearch = searchTerm?.toLowerCase().trim();
    const matchesSearch =
      !lowerSearch ||
      assignment?.title?.toLowerCase().includes(lowerSearch) ||
      `${assignment.first_name} ${assignment.last_name}`
        .toLowerCase()
        .includes(lowerSearch);

    const needsRating =
      !filterByNeedsRating ||
      (assignment.rating_status === "Pending" && assignment.finalized) ||
      assignment.rating_status === "Partially Rated";

    const isNotFinalized = !filterByNotFinalized || !assignment.finalized;

    const matchesClass =
      !selectedClassId || assignment.class_id === selectedClassId;

    return (
      inDateRange &&
      matchesSearch &&
      needsRating &&
      isNotFinalized &&
      matchesClass
    );
  });

  // Sort filtered assignments
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (!selectedSort) return 0;

    switch (selectedSort.value) {
      case "name-asc":
        return (a.title || "").localeCompare(b.title || "");
      case "name-desc":
        return (b.title || "").localeCompare(a.title || "");
      case "student-asc":
        return `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        );
      case "student-desc":
        return `${b.first_name} ${b.last_name}`.localeCompare(
          `${a.first_name} ${a.last_name}`
        );
      case "date-asc":
        return (
          new Date(a.date_modified || a.date_created || 0).getTime() -
          new Date(b.date_modified || b.date_created || 0).getTime()
        );
      case "date-desc":
        return (
          new Date(b.date_modified || b.date_created || 0).getTime() -
          new Date(a.date_modified || a.date_created || 0).getTime()
        );
      default:
        return 0;
    }
  });

  const visibleAssignments = sortedAssignments.slice(0, visibleCount);
  const hasMore = visibleCount < sortedAssignments.length;

  if (assignmentsLoading && assignments.length === 0) {
    return (
      <Box maxW={"500px"} mx="auto" textAlign="center" py={10}>
        <DotLottieReact
          src="https://lottie.host/98a15e88-6a70-437b-b3c0-4b273bf74d78/plJFoXlfNX.json"
          loop
          autoplay
        />
      </Box>
    );
  }

  if (assignmentsError) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error Loading Assignments</Alert.Title>
          <Alert.Description>
            {assignmentsError.message ||
              "An unexpected error occurred while loading assignments."}
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }
  return (
    <Stack gap="10" p={4} maxW="1800px" mx="auto">
      <Table.Root size="sm" tableLayout="fixed" width="100%">
        <colgroup>
          {/* Title + meta column flexes */}
          <col style={{ width: "auto" }} />
          {/* Finalized pill column fixed */}
          <col style={{ width: "200px" }} />
          {/* Actions column fixed */}
          <col style={{ width: "200px" }} />
        </colgroup>

        <Table.Body>
          {assignmentsLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Table.Row key={index}>
                  {/* Column 1: icon + title + meta */}
                  <Table.Cell>
                    <HStack align="start">
                      <Skeleton height="40px" width="40px" borderRadius="md" />
                      <VStack align="start" flex="1" minW={0} gap={2}>
                        <Skeleton height="18px" width="250px" />
                        <Skeleton height="14px" width="180px" />
                        <Skeleton height="14px" width="160px" />
                      </VStack>
                    </HStack>
                  </Table.Cell>

                  {/* Column 2: Status pills */}
                  <Table.Cell textAlign="right">
                    <HStack justifyContent="right" gap={2}>
                      <Skeleton
                        height="24px"
                        width="80px"
                        borderRadius="full"
                      />
                      <Skeleton
                        height="24px"
                        width="90px"
                        borderRadius="full"
                      />
                    </HStack>
                  </Table.Cell>

                  {/* Column 3: Action buttons */}
                  <Table.Cell textAlign="right">
                    <HStack justifyContent="right" gap={2}>
                      <Skeleton height="32px" width="32px" borderRadius="md" />
                      <Skeleton height="32px" width="32px" borderRadius="md" />
                      <Skeleton height="32px" width="32px" borderRadius="md" />
                      <Skeleton height="32px" width="32px" borderRadius="md" />
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))
            : visibleAssignments.map((assignment, index) => {
                const displayDate =
                  assignment.date_modified ?? assignment.date_created ?? "";
                const formattedDate = displayDate
                  ? new Date(displayDate).toLocaleDateString()
                  : "";

                return (
                  <MotionTableRow
                    key={assignment.id}
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    onClick={() => {
                      if (
                        assignment.student_id !== undefined &&
                        assignment.id !== undefined
                      ) {
                        onAssignmentClick?.(
                          assignment.student_id,
                          assignment.id
                        );
                      }
                    }}
                    initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: shouldAnimate ? index * 0.03 : 0,
                    }}
                  >
                    {/* Column 1: icon + title + meta */}
                    <Table.Cell>
                      <HStack align="start">
                        <Image
                          src={assignmentIcon}
                          h="40px"
                          alt="Assignment icon"
                        />
                        <VStack align="start" flex="1" minW={0}>
                          <Heading fontSize="md" fontWeight="bold">
                            {assignment.title}
                          </Heading>
                          <Text fontSize="sm" color="gray.500">
                            Student: {assignment.first_name}{" "}
                            {assignment.last_name}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Date Modified: {formattedDate}
                          </Text>
                        </VStack>
                      </HStack>
                    </Table.Cell>

                    {/* Column 2: Finalized pill (fixed width) */}
                    <Table.Cell textAlign="right">
                      <HStack justifyContent={"right"}>
                        {assignment.finalized && (
                          <Box
                            bg="#244D8A"
                            px={3}
                            py={1}
                            borderRadius="full"
                            color="white"
                            fontSize="xs"
                            fontWeight="semibold"
                            whiteSpace="nowrap"
                            display="inline-block"
                          >
                            Finalized
                          </Box>
                        )}
                        {assignment.rating_status === "Pending" &&
                          assignment.finalized && (
                            <Box
                              bg="#BD4F23"
                              px={3}
                              py={1}
                              borderRadius="full"
                              color="white"
                              fontSize="xs"
                              fontWeight="semibold"
                              whiteSpace="nowrap"
                              display="inline-block"
                            >
                              Needs Rating
                            </Box>
                          )}
                      </HStack>
                    </Table.Cell>

                    {/* Column 3: Actions (fixed width) */}
                    <Table.Cell textAlign="right">
                      <AssignmentsTableRowButtons
                        student_id={assignment.student_id!}
                        final_version_id={assignment.final_version_id || null}
                        assignment_id={assignment.id}
                        downloadUrl={assignment.blob_url}
                        fileType={assignment.source_format}
                        fileName={assignment.title}
                        triggerAssignmentsRefetch={triggerAssignmentsRefetch}
                        student_first_name={assignment.first_name}
                        student_last_name={assignment.last_name}
                        assignment_date_modified={
                          assignment.date_modified || assignment.date_created
                        }
                      />
                    </Table.Cell>
                  </MotionTableRow>
                );
              })}
        </Table.Body>
      </Table.Root>

      {!assignmentsLoading && hasMore && (
        <Text
          onClick={handleLoadMore}
          alignSelf="center"
          color="#bd4f23"
          cursor="pointer"
          textDecoration="underline"
        >
          Load More
        </Text>
      )}
    </Stack>
  );
};

export default AssignmentsTable;
