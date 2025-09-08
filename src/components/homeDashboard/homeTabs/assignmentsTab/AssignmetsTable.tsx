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
import { useState } from "react";
import AssignmentsTableRowButtons from "../../../common/assignments/AssignmentsTableRowButtons";
import type { AssignmentBasicType } from "../../../../types/AssignmentTypes";
import type { ErrorType } from "../../../../types/ErrorType";

import assignmentIcon from "../../../../assets/contract.png";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface AssignmentsTableProps {
  assignments: AssignmentBasicType[];
  assignmentsLoading: boolean;
  assignmentsError: ErrorType | null;

  dateRange: { from: Date | undefined; to?: Date | undefined };
  searchTerm: string | null;
  onAssignmentClick?: (studentId: number, assignmentId: number) => void;
  filterByNeedsRating: boolean;
  filterByNotFinalized: boolean;
}
const AssignmentsTable = ({
  assignments,
  assignmentsLoading,
  assignmentsError,

  dateRange,
  searchTerm,
  onAssignmentClick,
  filterByNeedsRating,
  filterByNotFinalized,
}: AssignmentsTableProps) => {
  const [visibleCount, setVisibleCount] = useState(10);

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

    console.log(isNotFinalized)

    return inDateRange && matchesSearch && needsRating && isNotFinalized;
  });

  const visibleAssignments = filteredAssignments.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAssignments.length;

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
          <col style={{ width: "160px" }} />
        </colgroup>

        <Table.Body>
          {assignmentsLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton height="20px" />
                  </Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                </Table.Row>
              ))
            : visibleAssignments.map((assignment) => {
                const displayDate =
                  assignment.date_modified ?? assignment.date_created ?? "";
                const formattedDate = displayDate
                  ? new Date(displayDate).toLocaleDateString()
                  : "";

                return (
                  <Table.Row
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
                        assignment_id={assignment.id}
                        downloadUrl={assignment.blob_url}
                        fileType={assignment.source_format}
                        fileName={assignment.title}

                      />
                    </Table.Cell>
                  </Table.Row>
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
