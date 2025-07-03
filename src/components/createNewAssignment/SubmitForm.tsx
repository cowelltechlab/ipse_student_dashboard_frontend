import { 
    Button,
    HStack,
    Text,
    Box
 } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const SubmitForm = () => {
    const commonButtonStyles = {
        borderRadius: 8,
        borderColor: "#BD4F23"
    }

    return (
        <HStack justifyContent="center" width="100%" my={6}>
            <Button
                color="#BD4F23"
                backgroundColor="white"
                {...commonButtonStyles}
            >
                <Text>Cancel Upload</Text>
            </Button>
            <Button
                backgroundColor="#BD4F23"
                color="white"
                {...commonButtonStyles}
            >
                <Text>Finish Upload</Text>
                <Box>
                    <FaCheckCircle 
                        color="white"
                    />
                </Box>
            </Button>
        </HStack>
    );
}

export default SubmitForm;