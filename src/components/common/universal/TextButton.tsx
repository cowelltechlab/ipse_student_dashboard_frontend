import { Box } from "@chakra-ui/react";

const TextButton = ({
  children,
  onClick,
  color = "black",
  fontSize = "md",
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  fontSize?: string;
}) => {
  return (
    <Box
      onClick={onClick}
      fontWeight={"bold"}
      color={color}
      cursor={"pointer"}
      _hover={{ textDecoration: "underline" }}
      fontSize={fontSize}
    >
      {children}
    </Box>
  );
};
export default TextButton;
