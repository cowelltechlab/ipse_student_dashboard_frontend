import { HStack, Skeleton, Stack, Table, Text, Alert } from "@chakra-ui/react";
import useAssignments from "../../../hooks/assignments/useAssignments";
import { IoDocumentText } from "react-icons/io5";
import { useState } from "react";

interface AssignmentsTableProps {
  dateRange: Date[] | null;
  searchTerm: string | null;
}

const AssignmentsTable = ({
  dateRange,
  searchTerm,
}: AssignmentsTableProps) => {
  const { assignments, loading, error } = useAssignments(dateRange, searchTerm);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleAssignments = assignments.slice(0, visibleCount);
  const hasMore = visibleCount < assignments.length;

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
    <Stack gap="10">
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
                <Table.Row key={assignment.id}>
                  <Table.Cell>
                    <HStack>
                      <IoDocumentText />
                      {assignment.title}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>{assignment.term}</Table.Cell>
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
