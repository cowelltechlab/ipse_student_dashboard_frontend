import { Text } from "@chakra-ui/react";

const TextButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Text
      onClick={onClick}
      fontWeight={"bold"}
      cursor={"pointer"}
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </Text>
  );
};
export default TextButton;
