import { Box, Button, Icon, Text, VStack } from "@chakra-ui/react";
import { MdLockReset, MdEmail } from "react-icons/md";
import useAuth from "../../../contexts/useAuth";

interface AccountSettingsButtonsProps {
  onResetPassword: () => void;
  onUpdateEmail: () => void;
}

const AccountSettingsButtons = ({
  onResetPassword,
  onUpdateEmail,
}: AccountSettingsButtonsProps) => {
  const { roles } = useAuth();

  // Only show account settings if user is Admin
  if (!roles.includes("Admin")) {
    return null;
  }

  return (
    <Box mb={4}>
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color="#6F6F6F"
        mb={2}
        textTransform="uppercase"
        letterSpacing="wide"
      >
        Account Settings
      </Text>
      <VStack gap={2} w="100%">
        <Button
          w="100%"
          bg="#244D8A"
          color="white"
          onClick={onResetPassword}
          _hover={{ bg: "#1a3a6b" }}
        >
          <Icon as={MdLockReset} boxSize={5} mr={2} />
          Reset Password
        </Button>

        <Button
          w="100%"
          bg="#244D8A"
          color="white"
          onClick={onUpdateEmail}
          _hover={{ bg: "#1a3a6b" }}
        >
          <Icon as={MdEmail} boxSize={5} mr={2} />
          Update Email Addresses
        </Button>
      </VStack>
    </Box>
  );
};

export default AccountSettingsButtons;
