import {
  Box,
  Text,
  Image,
  Button,
  Dialog,
  Portal,
  CloseButton
} from '@chakra-ui/react'
import CreateNewAssignmentFinalModalIcon from "../../assets/Create New Assignment_FinalModal.svg";
import { useNavigate } from 'react-router-dom';


interface SubmitModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}


const SubmitModal = ({isOpen, setIsOpen}: SubmitModalProps) => {
    const navigate = useNavigate();
    const commonButtonStyles = {
        borderRadius: 8,
        borderColor: "#BD4F23",
        fontWeight: "bold"
    };

    const handleReturnToHomeClick = () => {
        navigate("/dashboard");
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
                                src={CreateNewAssignmentFinalModalIcon}
                                alt="An illustration of a teacher with a student"
                                margin={2}
                                padding={6}
                                flexShrink={0}
                            />
                        </Box>
                        
                        <Text 
                            textAlign="center" 
                            fontWeight="bold" 
                            justifyContent="center" 
                            fontSize="md"
                            mr="5%"
                            ml="5%"
                        >
                            All set! Your document has been uploaded successfully.
                        </Text>
                    </Dialog.Body>
                    <Dialog.Footer justifyContent="center">
                        <Button 
                            color="#BD4F23" 
                            backgroundColor="#eaf2ff" 
                            {...commonButtonStyles}
                            onClick={handleReturnToHomeClick}
                            _hover={{bg:"white"}}
                        >
                            <Text>Return to Home</Text>
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

export default SubmitModal;