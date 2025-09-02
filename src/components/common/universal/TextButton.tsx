import { Box } from "@chakra-ui/react";

const TextButton = ({
  children,
  onClick,
  color = "black",
  fontSize = "md",
  fontWeight = "bold",
  underlined = false
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  underlined?: boolean;
}) => {
  return (
    <Box
      onClick={onClick}
      fontWeight={fontWeight}
      color={color}
      cursor={"pointer"}
      textDecoration={underlined ? "underline" : "none"}
      _hover={{ textDecoration: "underline" }}
      fontSize={fontSize}
    >
      {children}
    </Box>
  );
};
export default TextButton;
