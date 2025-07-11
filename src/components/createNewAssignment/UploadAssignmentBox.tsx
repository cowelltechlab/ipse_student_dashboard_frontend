import { Box, VStack, Text } from "@chakra-ui/react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useRef, useState } from "react";

interface UploadAssignmentBoxProps {
  file: File | null;
  setFile: (newFile: File | null) => void;
}

const UploadAssignmentBox = ({ file, setFile }: UploadAssignmentBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  /** Start: Code borrowed directly from Google Gemini */
  // --- Drag and Drop Handlers ---

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default to allow drop
    e.stopPropagation(); // Stop propagation
    setIsDragging(true); // Set dragging state for visual feedback
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default browser behavior (e.g., opening file)
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileChange(droppedFile); // Use the same file handling logic
      e.dataTransfer.clearData(); // Clear data transfer after successful drop
    }
  };

  // --- End Drag and Drop Handlers ---

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      // Basic validation for accepted formats
      const acceptedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (acceptedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert("Unsupported file type. Please upload PDF or Word documents.");
        setFile(null); // Clear file if not supported
      }
    } else {
      setFile(null);
    }
  };
  /** End borrowed code. */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    handleFileChange(selected);
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
        bg={isDragging ? "#cce0ff" : "#EAF2FF"} 
        border={isDragging ? "2px dashed #4299E1" : "2px dashed transparent"} 
        _hover={{ bg: isDragging ? "#cce0ff" : "#d8e8ff" }} 
        transition="all 0.2s ease-in-out"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {file.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              To replace current file, click here or drag-and-drop new file.
            </Text>
          </>
        ) : (
          <>
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
              Accepted formats: PDF, Word doc.
            </Text>
          </>
        )}
        
      </VStack>
    </>
  );
};

export default UploadAssignmentBox;
