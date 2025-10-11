import { HStack, IconButton } from "@chakra-ui/react";
import { BsFillGridFill } from "react-icons/bs";
import { FaTable } from "react-icons/fa";

interface ViewToggleProps {
  view: "card" | "table";
  onViewChange: (view: "card" | "table") => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <HStack gap={1} bg="gray.100" borderRadius="md" p={1}>
      <IconButton
        aria-label="Grid View"
        size="sm"
        bg={view === "card" ? "#244D8A" : "transparent"}
        color={view === "card" ? "white" : "gray.600"}
        _hover={{
          bg: view === "card" ? "#1a3a6b" : "gray.200",
        }}
        onClick={() => onViewChange("card")}
      >
        <BsFillGridFill size={16} />
      </IconButton>
      <IconButton
        aria-label="Table View"
        size="sm"
        bg={view === "table" ? "#244D8A" : "transparent"}
        color={view === "table" ? "white" : "gray.600"}
        _hover={{
          bg: view === "table" ? "#1a3a6b" : "gray.200",
        }}
        onClick={() => onViewChange("table")}
      >
        <FaTable size={16} />
      </IconButton>
    </HStack>
  );
};

export default ViewToggle;
