import { Box, VStack, Text } from "@chakra-ui/react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useRef } from "react";

interface UploadAssignmentBoxProps {
  file: File | null;
  setFile: (newFile: File | null) => void;
}

const UploadAssignmentBox = ({ file, setFile }: UploadAssignmentBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <VStack
        onClick={handleBoxClick}
        cursor="pointer"
        flex="1"
        padding={10}
        borderRadius="md"
        textAlign="center"
        align="center"
        justify="center"
        bg="#EAF2FF"
        _hover={{ bg: "#d8e8ff" }}
      >
        <Box>
          <IoAddCircleSharp color="#BD4F23" size={44} />
        </Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          {file ? file.name : "Upload Assignment"}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Upload documents to modify, e.g. assignments, tests, slides.
        </Text>
        <Text fontSize="sm" color="gray.500">
          Accepted formats: PDF, Word doc.
        </Text>
      </VStack>
    </>
  );
};

export default UploadAssignmentBox;
