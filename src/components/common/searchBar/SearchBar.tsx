import { Box, Button, Group, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  width?: string
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      bg={"white"}
      _focusWithin={{
        boxShadow: "0 0 0 2px #244D8A", // customize focus ring here
        borderColor: "blue.500",
      }}
      padding="0px"
    >
      <Group attached p={0} m={0}>
        <Input
          flex="1"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          border="none"
          outline="none"
          boxShadow="none"
          _focus={{
            boxShadow: "none",
            outline: "none",
          }}
          _placeholder={{ color: "gray.500" }}
        />
        <Button
          variant="outline"
          colorScheme="blue"
          bg={"#bd4f23"}
          borderRadius="md"
        >
          <FaSearch color="white" />
        </Button>
      </Group>
    </Box>
  );
};

export default SearchBar;
