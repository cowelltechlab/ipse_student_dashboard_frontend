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
} from "@chakra-ui/react";
import { IoDocumentText } from "react-icons/io5";
import { useState } from "react";
import AssignmentsTableRowButtons from "./AssignmentsTableRowButtons";
import type { AssignmentDetailType } from "../../../../types/AssignmentTypes";
import type { ErrorType } from "../../../../types/ErrorType";

interface AssignmentsTableProps {
  assignments: AssignmentDetailType[];
  assignmentsLoading: boolean;
  assignmentsError: ErrorType | null;

  dateRange: { from: Date | undefined; to?: Date | undefined };
  searchTerm: string | null;
  onAssignmentClick?: (studentId: number, assignmentId: number) => void;
  filterByNeedsRating: boolean;
}
const AssignmentsTable = ({
  assignments,
  assignmentsLoading,
  assignmentsError,

  dateRange,
  searchTerm,
  onAssignmentClick,
  filterByNeedsRating,
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
      assignment.title.toLowerCase().includes(lowerSearch) ||
      `${assignment.first_name} ${assignment.last_name}`
        .toLowerCase()
        .includes(lowerSearch);

    const needsRating =
      !filterByNeedsRating ||
      assignment.rating_status === "Pending" ||
      assignment.rating_status === "Partially Rated";

    return inDateRange && matchesSearch && needsRating;
  });

  const visibleAssignments = filteredAssignments.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAssignments.length;

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
    <Stack gap="10" p={4}>
      <Table.Root size="sm">
        <Table.Body>
          {assignmentsLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton height="20px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="20px" />
                  </Table.Cell>
                </Table.Row>
              ))
            : visibleAssignments.map((assignment) => (
                <Table.Row
                  key={assignment.id}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => {
                    if (
                      assignment.student_id !== undefined &&
                      assignment.id !== undefined
                    ) {
                      onAssignmentClick?.(assignment.student_id, assignment.id);
                    }
                  }}
                >
                  <Table.Cell>
                    <HStack align="start" spaceX={3}>
                      <IoDocumentText size={"25px"} style={{ marginTop: 4 }} />
                      <VStack align="start" spaceX={0}>
                        <HStack>
                          {" "}
                          <Heading fontSize={"md"} fontWeight="bold">
                            {assignment.title}
                          </Heading>
                          {assignment.finalized && (
                            <Box
                              bg={"#fbde8e"}
                              px={3}
                              py={1}
                              borderRadius="full"
                            >
                              Final Version
                            </Box>
                          )}
                        </HStack>

                        <Text fontSize="sm" color="gray.500">
                          Student: {assignment.first_name}{" "}
                          {assignment.last_name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Date Modified:{" "}
                          {assignment.date_modified
                            ? new Date(
                                assignment.date_modified
                              ).toLocaleDateString()
                            : new Date(
                                assignment.date_modified ??
                                  assignment.date_created ??
                                  ""
                              ).toLocaleDateString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <AssignmentsTableRowButtons />
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>

      {!assignmentsLoading && hasMore && (
        <Text
          onClick={handleLoadMore}
          alignSelf="center"
          color="#bd4f23"
          cursor="pointer"
          style={{ textDecoration: "underline" }}
        >
          Load More
        </Text>
      )}
    </Stack>
  );
};

export default AssignmentsTable;
