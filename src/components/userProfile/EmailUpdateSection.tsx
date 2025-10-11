import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import useUpdateUserEmails from "../../hooks/users/useUpdateUserEmails";
import { toaster } from "../ui/toaster";

interface EmailUpdateSectionProps {
  userId: number;
  currentEmail: string | null;
  currentGtEmail: string | null;
  onUpdate: () => void;
}

const EmailUpdateSection = ({
  userId,
  currentEmail,
  currentGtEmail,
  onUpdate,
}: EmailUpdateSectionProps) => {
  const [gtEmail, setGtEmail] = useState(currentGtEmail || "");
  const [gtEmailError, setGtEmailError] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const { handleUpdateUserEmails, loading } = useUpdateUserEmails();

  const validateGtEmail = (email: string): string => {
    if (!email.trim()) return "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (
      !email.toLowerCase().includes("gatech.edu") &&
      !email.toLowerCase().includes("georgia.edu")
    ) {
      return "GT email should be a Georgia Tech domain (@gatech.edu or @georgia.edu)";
    }

    return "";
  };

  const handleGtEmailChange = (value: string) => {
    setGtEmail(value);
    setGtEmailError(validateGtEmail(value));
  };

  const handleSave = async () => {
    const currentGtEmailError = validateGtEmail(gtEmail);
    setGtEmailError(currentGtEmailError);

    if (currentGtEmailError) {
      toaster.create({
        description: "Please fix validation errors before saving.",
        type: "error",
      });
      return;
    }

    if (!gtEmail.trim()) {
      toaster.create({
        description: "Please enter a Georgia Tech email address.",
        type: "error",
      });
      return;
    }

    try {
      await handleUpdateUserEmails(
        userId,
        undefined,
        gtEmail.trim() || undefined
      );

      toaster.create({
        description: "Georgia Tech email updated successfully.",
        type: "success",
      });

      setIsEditing(false);
      onUpdate();
    } catch (e) {
      const error = e as { message?: string };
      toaster.create({
        description: `Error updating email: ${
          error.message || "Unknown error"
        }`,
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setGtEmail(currentGtEmail || "");
    setGtEmailError("");
    setIsEditing(false);
  };

  return (
    <Box
      bg="white"
      borderRadius="md"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
    >
      <Heading fontSize="lg" color="#244D8A" mb={4}>
        Email Addresses
      </Heading>

      <VStack gap={4} align="stretch">
        {/* Current Email (Read-only) */}
        <Box>
          <Text fontWeight="semibold" mb={2}>
            Primary Email
          </Text>
          <Input
            value={currentEmail || "Not provided"}
            isReadOnly
            bg="gray.100"
            color="gray.600"
          />
          <Text fontSize="sm" color="gray.500" mt={1}>
            This is your primary login email and cannot be changed here.
          </Text>
        </Box>

        {/* GT Email (Editable) */}
        {!isEditing ? (
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Georgia Tech Email
            </Text>
            <Text color="gray.700" mb={2}>
              {currentGtEmail || "Not provided"}
            </Text>
            <Button
              bg="#244D8A"
              color="white"
              onClick={() => setIsEditing(true)}
              _hover={{ bg: "#1a3a6b" }}
            >
              Update GT Email
            </Button>
          </Box>
        ) : (
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Georgia Tech Email
            </Text>
            <Input
              value={gtEmail}
              onChange={(e) => handleGtEmailChange(e.target.value)}
              placeholder="Enter Georgia Tech email address..."
              borderColor={gtEmailError ? "red.500" : "gray.300"}
              type="email"
            />
            {gtEmailError && (
              <Text fontSize="sm" color="red.500" mt={1}>
                {gtEmailError}
              </Text>
            )}

            <HStack w="100%" gap={2} mt={4}>
              <Button
                variant="outline"
                borderColor="#BD4F23"
                color="#BD4F23"
                w="50%"
                onClick={handleCancel}
                disabled={loading}
                _hover={{
                  bg: "#BD4F23"

,
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                bg="#BD4F23"
                color="white"
                w="50%"
                onClick={handleSave}
                loading={loading}
                disabled={loading || !!gtEmailError}
                _hover={{ bg: "#A43E1E" }}
              >
                Save Email
              </Button>
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default EmailUpdateSection;
