import { Box, VStack, Text, Textarea } from "@chakra-ui/react";
import { IoDocumentTextSharp } from "react-icons/io5";

interface RawTextInputBoxProps {
  textContent: string;
  setTextContent: (newText: string) => void;
}

const RawTextInputBox = ({ textContent, setTextContent }: RawTextInputBoxProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  const characterCount = textContent.length;
  const maxCharacters = 10000; // Reasonable limit for assignment content

  return (
    <VStack
      flex="1"
      padding={6}
      borderRadius="md"
      align="stretch"
      justify="flex-start"
      bg="#EAF2FF"
      border="2px solid transparent"
      gap={4}
    >
      <VStack align="center" gap={3}>
        <Box>
          <IoDocumentTextSharp color="#BD4F23" size={44} />
        </Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Raw Text Input
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Enter the assignment content as raw text. Our AI will convert it to a properly formatted document.
        </Text>
      </VStack>

      <Box>
        <Textarea
          value={textContent}
          onChange={handleTextChange}
          placeholder="Enter your assignment content here... (e.g., instructions, questions, reading material)"
          minHeight="300px"
          resize="vertical"
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="md"
          fontSize="sm"
          _focus={{
            borderColor: "#BD4F23",
            boxShadow: "0 0 0 1px #BD4F23",
          }}
          _placeholder={{
            color: "gray.400",
          }}
        />
        <Text
          fontSize="xs"
          color={characterCount > maxCharacters ? "red.500" : "gray.500"}
          textAlign="right"
          mt={1}
        >
          {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()} characters
        </Text>
      </Box>

      {textContent && (
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Text content ready for processing. Click "Finish Upload" to create the assignment.
        </Text>
      )}
    </VStack>
  );
};

export default RawTextInputBox;