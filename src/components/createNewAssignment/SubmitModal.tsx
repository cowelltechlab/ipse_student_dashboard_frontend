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
import { FaArrowCircleRight } from 'react-icons/fa';


interface SubmitModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}


const SubmitModal = ({isOpen, setIsOpen}: SubmitModalProps) => {
    const commonButtonStyles = {
        borderRadius: 8,
        borderColor: "#BD4F23",
        fontWeight: "bold"
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
                            All set! 📂 Your document has been uploaded successfully.
                        </Text>
                    </Dialog.Body>
                    <Dialog.Footer justifyContent="center">
                        <Dialog.ActionTrigger asChild>
                            <Button 
                                variant="outline" 
                                color="#BD4F23" 
                                backgroundColor="white" 
                                {...commonButtonStyles}
                            >
                                View in Documents
                            </Button>
                        </Dialog.ActionTrigger>
                        <Button
                            backgroundColor="#BD4F23"
                            color="white"
                            {...commonButtonStyles}
                        >
                            Modify with AI
                            <Box>
                                <FaArrowCircleRight color="white" />
                            </Box>
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