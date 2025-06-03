import { Box, Button, Group, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <Box>
      <Group attached
        
      >
        <Button
          onClick={() => setSearchTerm("")}
          variant="outline"
          colorScheme="blue"
          bg={"#bd4f23"}
        >
          <FaSearch color="white" />
        </Button>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="100%"
          borderRadius="md"
          padding="8px"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "none", boxShadow: "none" , border: "none" }}
        />
      </Group>
    </Box>
  );
};

export default SearchBar;
