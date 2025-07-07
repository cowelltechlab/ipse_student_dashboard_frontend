import { Box } from "@chakra-ui/react";

const TextButton = ({
  children,
  onClick,
  color = "black",
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
}) => {
  return (
    <Box
      onClick={onClick}
      fontWeight={"bold"}
      color={color}
      cursor={"pointer"}
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </Box>
  );
};
export default TextButton;
