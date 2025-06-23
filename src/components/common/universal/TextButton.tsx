import { Box } from "@chakra-ui/react";

const TextButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Box
      onClick={onClick}
      fontWeight={"bold"}
      cursor={"pointer"}
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </Box>
  );
};
export default TextButton;
