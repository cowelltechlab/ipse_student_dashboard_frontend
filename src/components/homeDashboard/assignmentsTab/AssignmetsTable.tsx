import {
  HStack,
  Skeleton,
  Stack,
  Table,
  Text,
  Alert,
  VStack,
  Heading,
} from "@chakra-ui/react";
import useAssignments from "../../../hooks/assignments/useAssignments";
import { IoDocumentText } from "react-icons/io5";
import { useEffect, useState } from "react";
import AssignmentsTableRowButtons from "./AssignmentsTableRowButtons";

interface AssignmentsTableProps {
  dateRange: { from: Date | undefined; to?: Date | undefined };
  searchTerm: string | null;
}
const AssignmentsTable = ({ dateRange, searchTerm }: AssignmentsTableProps) => {
  const { assignments, loading, error } = useAssignments();
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  useEffect(() => {
    console.log("Date Range: ", dateRange, "\nSearch Term: ", searchTerm);
  }, [dateRange, searchTerm]);

  const filteredAssignments = assignments.filter((assignment) => {
    const assignmentDate = new Date(
      assignment.date_modified ?? assignment.date_created
    );

    // Handle possible undefined/null dateRange.from and dateRange.to
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

    return inDateRange && matchesSearch;
  });

  const visibleAssignments = filteredAssignments.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAssignments.length;

  if (error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error Loading Assignments</Alert.Title>
          <Alert.Description>
            {error.message ||
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
          {loading
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
                >
                  <Table.Cell>
                    <HStack align="start" spaceX={3}>
                      <IoDocumentText size={"25px"} style={{ marginTop: 4 }} />
                      <VStack align="start" spaceX={0}>
                        <Heading fontSize={"md"} fontWeight="bold">
                          {assignment.title}
                        </Heading>
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
                                assignment.date_created
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

      {!loading && hasMore && (
        <Text
          onClick={handleLoadMore}
          alignSelf="center"
          color="blue.500"
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
