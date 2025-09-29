import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { IoDocumentTextSharp, IoCloudUploadSharp } from "react-icons/io5";

interface InputModeToggleProps {
  inputMode: 'file' | 'text';
  setInputMode: (mode: 'file' | 'text') => void;
  onModeChange?: () => void;
}

const InputModeToggle = ({ inputMode, setInputMode, onModeChange }: InputModeToggleProps) => {
  const handleModeChange = (mode: 'file' | 'text') => {
    setInputMode(mode);
    onModeChange?.();
  };

  const buttonStyles = {
    borderRadius: "md",
    px: 4,
    py: 3,
    transition: "all 0.2s ease-in-out",
    fontSize: "sm",
    fontWeight: "medium",
  };

  const activeStyles = {
    ...buttonStyles,
    bg: "#BD4F23",
    color: "white",
    _hover: { bg: "#A04220" },
  };

  const inactiveStyles = {
    ...buttonStyles,
    bg: "gray.100",
    color: "gray.600",
    _hover: { bg: "gray.200" },
  };

  return (
    <Box mb={4}>
      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
        Input Method
      </Text>
      <HStack gap={2} bg="gray.50" p={1} borderRadius="lg">
        <Button
          onClick={() => handleModeChange('file')}
          {...(inputMode === 'file' ? activeStyles : inactiveStyles)}
          flex={1}
        >
          <IoCloudUploadSharp />
          Upload File
        </Button>
        <Button
          
          onClick={() => handleModeChange('text')}
          {...(inputMode === 'text' ? activeStyles : inactiveStyles)}
          flex={1}
        >
          <IoDocumentTextSharp />
          Raw Text
        </Button>
      </HStack>
    </Box>
  );
};

export default InputModeToggle;