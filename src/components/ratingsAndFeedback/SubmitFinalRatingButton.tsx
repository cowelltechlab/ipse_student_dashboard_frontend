import { Box, Button, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

// TODO: Implement. Must take in form info and error check everything. 
// Good reference: createNewAssignment/SubmitForm.tsx

// interface SubmitFinalRatingButtonProps {

// }

const SubmitFinalRatingButton = () => {
    const handleReturnToHomeClick = () => {
        console.log("Submitting Final Rating...")
    };

    return (
        <Button 
            color="white" 
            borderRadius={8}
            backgroundColor="#BD4F23"
            onClick={handleReturnToHomeClick}
            >
            <Text fontWeight="bold">
                Submit Final Rating
            </Text>
            <Box ml={2}>
                <FaCheckCircle color="white" />
            </Box>
        </Button>
    );
};

export default SubmitFinalRatingButton;