import {
  Box,
  Text,
  Image,
  Button,
  Dialog,
  Portal,
  CloseButton
} from '@chakra-ui/react'
import RatingFeedbackFinalModalIcon from "../../assets/Rating & Feedback_FinalModal.svg";
import { useNavigate } from 'react-router-dom';

interface RatingSubmissionModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    studentId?: number;
}

const RatingSubmissionModal = ({ isOpen, setIsOpen, studentId }: RatingSubmissionModalProps) => {
    const navigate = useNavigate();
    const commonButtonStyles = {
        borderRadius: 8,
        borderColor: "#BD4F23",
        fontWeight: "bold"
    };

    const handleGoToProfileClick = () => {
        if (studentId) {
            navigate(`/student/${studentId}`);
        } else {
            console.warn("Student ID not available, navigating to dashboard");
            navigate("/dashboard");
        }
        setIsOpen(false);
    };

    return (
        <Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        backgroundColor="#EAF2FF"
                        justifyContent="center"
                        mt="10%"
                        pt={5}
                        pb={5}
                    >
                        <Dialog.Body alignContent="center" justifyContent="center">
                            <Box pt="5%" pb="5%">
                                <Image
                                    src={RatingFeedbackFinalModalIcon}
                                    alt="An illustration celebrating learning and feedback"
                                    margin={2}
                                    padding={6}
                                    flexShrink={0}
                                />
                            </Box>

                            <Text
                                textAlign="center"
                                fontWeight="bold"
                                justifyContent="center"
                                fontSize="lg"
                                mr="5%"
                                ml="5%"
                                mb={3}
                            >
                                You are learning about what works for you!
                            </Text>

                            <Text
                                textAlign="center"
                                justifyContent="center"
                                fontSize="md"
                                mr="5%"
                                ml="5%"
                                color="gray.600"
                            >
                                Remember: You can make profile changes any time!
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer justifyContent="center">
                            <Button
                                color="#BD4F23"
                                backgroundColor="#eaf2ff"
                                {...commonButtonStyles}
                                onClick={handleGoToProfileClick}
                                _hover={{bg:"white"}}
                            >
                                <Text>Go to Profile Dashboard</Text>
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="md" variant="ghost" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default RatingSubmissionModal;