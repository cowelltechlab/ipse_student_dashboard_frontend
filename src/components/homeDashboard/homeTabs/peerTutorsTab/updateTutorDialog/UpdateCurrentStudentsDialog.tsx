import {
  Text,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  HStack,
  Icon,
  Separator,
} from "@chakra-ui/react";
import type { UserType } from "../../../../../types/UserTypes";
import { useEffect, useState } from "react";
import useSyncTutorStudents from "../../../../../hooks/tutorStudents/useSyncTutorStudents";
import useStudents from "../../../../../hooks/students/useStudents";
import useTutorStudentsById from "../../../../../hooks/tutorStudents/useTutorStudentsById";
import { FaCheckCircle } from "react-icons/fa";
import { toaster } from "../../../../ui/toaster";
import CurrentStudents from "./CurrentStudents";
import StudentList from "./StudentsList";
import type { StudentType } from "../../../../../types/StudentTypes";

interface UpdateCurrentStudentsDialogProps {
  tutor: UserType;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRefetch: () => void;
}

const UpdateCurrentStudentsDialog = ({
  tutor,
  open,
  setOpen,
  triggerRefetch,
}: UpdateCurrentStudentsDialogProps) => {
  const { loading: loadingPostTutorStudents, handleSyncTutorStudents } =
    useSyncTutorStudents();

  const { students } = useStudents();

  const { tutorStudents } = useTutorStudentsById(tutor.id);

  // These are the students clicked by the user
  const [currentStudentSelection, setCurrentStudentSelection] = useState<
    StudentType[]
  >([]);

  // This is the final selection to be passed back to the API
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  // For disabling the save button until changes are made
  const [originalStudentIds, setOriginalStudentIds] = useState<number[]>([]);

  // For setting the inital list to match the current tutor students
  useEffect(() => {
    if (tutorStudents && tutorStudents.length > 0) {
      const ids = tutorStudents.map((tutorStudent) => tutorStudent.student_id);
      setSelectedStudentIds(ids);
      setOriginalStudentIds(ids);

      const castedStudents: StudentType[] = tutorStudents.map(
        (tutorStudent) => ({
          id: tutorStudent.student_id.toString(), // assuming your StudentType uses string IDs
          first_name: tutorStudent.student_name.split(" ")[0] || "",
          last_name:
            tutorStudent.student_name.split(" ").slice(1).join(" ") || "",
          year_name: tutorStudent.student_year,
          reading_level: "", // default/placeholder value
          writing_level: "", // default/placeholder value
        })
      );

      setCurrentStudentSelection(castedStudents);
    }
  }, [tutorStudents]);

  // This function sends out the current student list for syncing.
  const handleSaveUpdates = async () => {
    // TODO: this function posts to API with a full list of all the students under this tutor

    try {
      await handleSyncTutorStudents(tutor.id, selectedStudentIds);
      toaster.create({
        description: `Tutor students updated successfully`,
        type: "success",
      });
      setOpen(false);
      triggerRefetch();
    } catch (e) {
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };
      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating user: ${errorMessage}`,
        type: "error",
      });
    }
  };

  // To add to the current student selection at the top of the modal
  const handleAddToCurrentStudents = () => {
    const selectedStudents = students.filter((student) =>
      selectedStudentIds.includes(Number(student.id))
    );
    setCurrentStudentSelection(selectedStudents);
  };

  // To remove from the current student selection as shown at the top of the modal
  const handleRemoveFromCurrentStudents = (studentIdToRemove: number) => {
    // Remove from the visible top section
    setCurrentStudentSelection((prevSelection) =>
      prevSelection.filter((s) => Number(s.id) !== studentIdToRemove)
    );

    // Remove from the selectedStudentIds list to sync with the backend
    setSelectedStudentIds((prevIds) =>
      prevIds.filter((id) => id !== studentIdToRemove)
    );
  };

  const toggleSelectStudentId = (id: number) => {
    setSelectedStudentIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return Array.from(updated);
    });
  };

  // For disabling save until changes are made
  const isSaveDisabled =
    selectedStudentIds.length === originalStudentIds.length &&
    selectedStudentIds.every((id) => originalStudentIds.includes(id));

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      size={"cover"}
      scrollBehavior={"inside"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={5} bg={"#eaeef4"}>
            <Dialog.Header>
              <Flex
                mt={2}
                bg={"#244D8A"}
                p={2}
                borderRadius="md"
                w={"100%"}
                align="center"
                justify="center"
              >
                <Dialog.Title color={"white"} fontSize="3xl">
                  {tutor.first_name} {tutor.last_name}
                </Dialog.Title>
              </Flex>
            </Dialog.Header>
            <Dialog.Body>
              <HStack mb={2} justifyContent="space-between">
                <Text fontSize="md" mb={2} color={"#6F6F6F"}>
                  {tutor.roles?.[0] || "No Role Assigned"}
                </Text>

                <Text fontSize="md" mb={2} color={"#6F6F6F"}>
                  {tutor.email || "No Email Provided"}
                </Text>
              </HStack>
              <Separator orientation="horizontal" mb={4} />

              <CurrentStudents
                tutorStudents={currentStudentSelection}
                handleRemoveStudent={handleRemoveFromCurrentStudents}
              />
              <StudentList
                students={students}
                selectedStudentIds={selectedStudentIds}
                toggleSelectStudentId={toggleSelectStudentId}
              />

              <HStack w={"100%"} justifyContent={"center"} mt={4}>
                <Button
                  onClick={handleAddToCurrentStudents}
                  variant="outline"
                  borderColor="#BD4F23"
                  color="#BD4F23"
                  w={"50%"}
                  _hover={{
                    bg: "#BD4F23",
                    borderColor: "#BD4F23",
                    color: "white",
                  }}
                >
                  Add to Current Students
                </Button>
                <Dialog.ActionTrigger asChild>
                  <Button
                    onClick={handleSaveUpdates}
                    disabled={isSaveDisabled}
                    loading={loadingPostTutorStudents}
                    bg="#BD4F23"
                    color="white"
                    w={"50%"}
                    _hover={{
                      bg: "#BD4F23",
                      borderColor: "#BD4F23",
                      color: "white",
                    }}
                  >
                    Save Changes
                    <Icon as={FaCheckCircle} ml={2} color={"white"} />
                  </Button>
                </Dialog.ActionTrigger>
              </HStack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UpdateCurrentStudentsDialog;
