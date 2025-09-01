import { Box } from "@chakra-ui/react";

const TextButton = ({
  children,
  onClick,
  color = "black",
  fontSize = "md",
  fontWeight = "bold",
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
}) => {
  return (
    <Box
      onClick={onClick}
      fontWeight={fontWeight}
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
