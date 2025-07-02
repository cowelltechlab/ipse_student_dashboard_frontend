import { Box, VStack, Text } from "@chakra-ui/react";
import { IoAddCircleSharp } from "react-icons/io5";

const UploadAssignmentBox = () => {
    return (
        <VStack 
            flex="1"
            padding={10}
            borderRadius="md"
            textAlign="center"
            align="center"
            justify="center" 
            color="white"
            bg="#EAF2FF"
        >
            <Box>
            <IoAddCircleSharp color="#BD4F23" size={44} />
            </Box>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Upload Assignment
            </Text>
            <Text fontSize="sm" color="gray.600">
            Upload documents to modify, e.g. assignments, tests, slides.
            </Text>
            <Text fontSize="sm" color="gray.500">
            Accepted formats: Pdf, Word doc.
            </Text>
        </VStack>
    );
}

export default UploadAssignmentBox;