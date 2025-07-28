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
  const { roles } = useAuth();
  const { student, loading } = useGetStudentByUserId(userId);

  const isOnlyStudent = roles.length === 1 && roles[0] === "Student";

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleViewProfile = () => {
    if (student) {
      navigate(`/student/${student.id}`);
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
                    disabled={!student}
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
