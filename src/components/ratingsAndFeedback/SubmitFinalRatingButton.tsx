import { Box, Button, Text } from "@chakra-ui/react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

interface SubmitFinalRatingButtonProps {
    onSubmit: () => void;
    loading: boolean;
    disabled: boolean;
}

const SubmitFinalRatingButton = ({ onSubmit, loading, disabled }: SubmitFinalRatingButtonProps) => {
    const handleSubmitClick = () => {
        if (!disabled && !loading) {
            onSubmit();
        }
    };

    return (
        <Button 
            color="white" 
            borderRadius={8}
            backgroundColor={disabled ? "#999999" : "#BD4F23"}
            onClick={handleSubmitClick}
            disabled={disabled || loading}
            cursor={disabled ? "not-allowed" : "pointer"}
            opacity={disabled ? 0.6 : 1}
            _hover={{
                backgroundColor: disabled ? "#999999" : "#A43A1F"
            }}
            size="lg"
            px={6}
            py={4}
        >
            <Text fontWeight="bold">
                {loading ? "Submitting..." : "Submit Final Rating"}
            </Text>
            <Box ml={2}>
                {loading ? (
                    <FaSpinner className="spinner" />
                ) : (
                    <FaCheckCircle color="white" />
                )}
            </Box>
        </Button>
    );
};

export default SubmitFinalRatingButton;