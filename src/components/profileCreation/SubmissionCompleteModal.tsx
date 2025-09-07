import {
  Button,
  Image,
  Dialog,
  Heading,
  Icon,
  Portal,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { FaArrowAltCircleRight } from "react-icons/fa";

import CreateProfileImage from "../../assets/Create New Profile_FinalModal.svg";
import { useNavigate } from "react-router-dom";
import useGetStudentByUserId from "../../hooks/students/useGetStudentByUserId";
import useAuth from "../../contexts/useAuth";
import { useEffect } from "react";

interface SubmissionCompletedModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: number;
}

const SubmissionCompletedModal = ({
  open,
  setOpen,
  userId,
}: SubmissionCompletedModalProps) => {
  const navigate = useNavigate();
  const { roles, refreshAuth, studentId } = useAuth();
  const { student, loading } = useGetStudentByUserId(userId);

  const isOnlyStudent = roles.length === 1 && roles[0] === "Student";

  // Refresh auth when success modal opens to get the new student_id
  useEffect(() => {
    if (open) {
      refreshAuth();
    }
  }, [open, refreshAuth]);

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleViewProfile = () => {
    // Use studentId from auth context first (refreshed after profile creation)
    // Fall back to student.id from the API call
    const idToUse = studentId || student?.id;
    if (idToUse) {
      navigate(`/student/${idToUse}`);
    }
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}
      size={"lg"}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={5}>
            <Dialog.Body>
              <VStack>
                <Image src={CreateProfileImage} />
                <Heading mb={10}>Your Profile is Ready to Go!</Heading>

                <HStack m={2} align="center" mt={6} w={"100%"}>
                  <Button
                    onClick={handleViewProfile}
                    variant="outline"
                    borderRadius="lg"
                    borderColor="#BD4F23"
                    color="#BD4F23"
                    w="50%"
                    _hover={{
                      bg: "#BD4F23",
                      borderColor: "#BD4F23",
                      color: "white",
                    }}
                    loading={loading}
                    disabled={!studentId && !student}
                  >
                    View Profile
                  </Button>

                  {!isOnlyStudent && (
                    <Button
                      onClick={handleHomeClick}
                      bg="#BD4F23"
                      w="50%"
                      borderRadius="lg"
                      color="white"
                      _hover={{ opacity: 0.9 }}
                    >
                      Go Home
                      <Icon as={FaArrowAltCircleRight} ml={2} />
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SubmissionCompletedModal;
