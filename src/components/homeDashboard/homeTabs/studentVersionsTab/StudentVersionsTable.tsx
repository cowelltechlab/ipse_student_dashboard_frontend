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
  Button,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import type { ErrorType } from "../../../../types/ErrorType";
import useUpdateStudentGroupType from "../../../../hooks/studentGroups/useUpdateStudentGroupType";
import { toaster } from "../../../ui/toaster";
import AdminPasswordResetModal from "../PasswordResetDialog";

import studentIcon from "../../../../assets/profile_default.png";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { StudentDetailsType } from "../../../../types/StudentGroupTypes";

interface StudentVersionsTableProps {
  students: StudentDetailsType[];
  studentsLoading: boolean;
  studentsError: ErrorType | null;
  searchTerm: string | null;
  groupTypeFilter: string | null;
  onPptClick: (student: StudentDetailsType) => void;
  onEmailClick: (student: StudentDetailsType) => void;
  onStudentUpdate: () => void;
}

const StudentVersionsTable = ({
  students,
  studentsLoading,
  studentsError,
  searchTerm,
  groupTypeFilter,
  onPptClick,
  onEmailClick,
  onStudentUpdate,
}: StudentVersionsTableProps) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentDetailsType | null>(null);
  const { handleUpdateGroupType } = useUpdateStudentGroupType();

  const groupTypeCollection = createListCollection({
    items: [
      { label: "None", value: "" },
      { label: "Group A", value: "A" },
      { label: "Group B", value: "B" },
    ],
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleGroupTypeChange = async (
    studentId: number,
    newGroupType: string | null
  ) => {
    try {
      await handleUpdateGroupType(studentId, newGroupType);
      toaster.create({
        description: `Group type updated successfully.`,
        type: "success",
      });
      onStudentUpdate();
    } catch (e) {
      const error = e as { message?: string };
      toaster.create({
        description: `Error updating group type: ${
          error.message || "Unknown error"
        }`,
        type: "error",
      });
    }
  };

  const handlePasswordResetClick = (student: StudentDetailsType) => {
    setSelectedStudent(student);
    setPasswordResetModalOpen(true);
  };

  const sortedStudents = [...students].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const filteredStudents = sortedStudents.filter((student) => {
    const lowerSearch = searchTerm?.toLowerCase().trim();
    const matchesSearch =
      !lowerSearch ||
      `${student.first_name} ${student.last_name}`
        .toLowerCase()
        .includes(lowerSearch);

    const matchesGroupType =
      !groupTypeFilter ||
      groupTypeFilter === "all" ||
      student.group_type === groupTypeFilter;

    return matchesSearch && matchesGroupType;
  });

  const visibleStudents = filteredStudents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudents.length;

  if (studentsLoading && students.length === 0) {
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

  if (studentsError) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error Loading Students</Alert.Title>
          <Alert.Description>
            {studentsError.message ||
              "An unexpected error occurred while loading students."}
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Stack gap="10" p={4} maxW="1800px" mx="auto">
      <Table.Root size="sm" tableLayout="fixed" width="100%">
        <colgroup>
          {/* Student info column flexes */}
          <col style={{ width: "auto" }} />
          {/* Email column fixed */}
          <col style={{ width: "180px" }} />
          {/* GT Email column fixed */}
          <col style={{ width: "180px" }} />
          {/* Group type column fixed */}
          <col style={{ width: "200px" }} />
          {/* PowerPoint column fixed */}
          <col style={{ width: "160px" }} />
          {/* Password reset column fixed */}
          <col style={{ width: "140px" }} />
        </colgroup>

        <Table.Body>
          {studentsLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton height="20px" />
                  </Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                </Table.Row>
              ))
            : visibleStudents.map((student) => {
                return (
                  <Table.Row
                    key={student.student_id}
                    _hover={{ bg: "gray.100" }}
                  >
                    {/* Column 1: icon + name */}
                    <Table.Cell>
                      <HStack align="center">
                        <Image
                          src={student.profile_picture_url || studentIcon}
                          h="40px"
                          w="40px"
                          borderRadius="full"
                          alt="Student profile"
                          objectFit="cover"
                        />
                        <VStack align="start" flex="1" minW={0} p={3}>
                          <Heading fontSize="md" fontWeight="bold">
                            {student.first_name} {student.last_name}
                          </Heading>
                        </VStack>
                      </HStack>
                    </Table.Cell>

                    {/* Column 1: Email */}
                    <Table.Cell onClick={() => onEmailClick(student)}>
                      <Text
                        color={"gray.800"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        maxWidth="170px"
                        title={student.email || student.gt_email || "No email"}
                        _hover={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {student.email || student.gt_email || "No email"}
                      </Text>
                    </Table.Cell>

                    {/* Column 2: GT Email */}
                    <Table.Cell onClick={() => onEmailClick(student)}>
                      <Text
                        color={"gray.800"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        maxWidth="170px"
                        title={student.gt_email || "No GT email"}
                        _hover={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {student.gt_email || "No GT email"}
                      </Text>
                    </Table.Cell>

                    {/* Column 3: Group Type (editable) */}
                    <Table.Cell textAlign="right">
                      <Select.Root
                        collection={groupTypeCollection}
                        value={[student.group_type || ""]}
                        onValueChange={(details) => {
                          const value = Array.isArray(details.value)
                            ? details.value[0]
                            : details.value;
                          handleGroupTypeChange(
                            student.student_id,
                            value === "" ? null : value
                          );
                        }}
                        size="sm"
                        width="120px"
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {groupTypeCollection.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                <Select.ItemText>{item.label}</Select.ItemText>
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Table.Cell>

                    {/* Column 4: PowerPoint URLs */}
                    <Table.Cell textAlign="right">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="blue"
                        onClick={() => onPptClick(student)}
                        borderRadius="md"
                      >
                        PPT URLs
                      </Button>
                    </Table.Cell>

                    {/* Column 5: Password Reset */}
                    <Table.Cell textAlign="right">
                      <Button
                        size="sm"
                        bg="#BD4F23"
                        color="white"
                        onClick={() => handlePasswordResetClick(student)}
                        borderRadius="md"
                        _hover={{ bg: "#A43E1E" }}
                      >
                        Reset Password
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table.Root>

      {!studentsLoading && hasMore && (
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

      <AdminPasswordResetModal
        open={passwordResetModalOpen}
        setOpen={setPasswordResetModalOpen}
        student={selectedStudent}
        onPasswordReset={onStudentUpdate}
      />
    </Stack>
  );
};

export default StudentVersionsTable;
