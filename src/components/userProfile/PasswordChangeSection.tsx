import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import useUpdateOwnPassword from "../../hooks/auth/useUpdateOwnPassword";
import { toaster } from "../ui/toaster";

const PasswordChangeSection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { handleUpdateOwnPassword, loading } = useUpdateOwnPassword();

  const handleSave = async () => {
    // Validation
    if (!currentPassword.trim()) {
      toaster.create({
        description: "Please enter your current password.",
        type: "error",
      });
      return;
    }

    if (!newPassword.trim()) {
      toaster.create({
        description: "Please enter a new password.",
        type: "error",
      });
      return;
    }

    if (newPassword.length < 6) {
      toaster.create({
        description: "Password must be at least 6 characters long.",
        type: "error",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toaster.create({
        description: "New passwords do not match.",
        type: "error",
      });
      return;
    }

    if (currentPassword === newPassword) {
      toaster.create({
        description: "New password must be different from current password.",
        type: "error",
      });
      return;
    }

    try {
      const response = await handleUpdateOwnPassword(
        currentPassword,
        newPassword
      );

      toaster.create({
        title: "Password Updated",
        description: response.message || "Your password has been updated successfully.",
        type: "success",
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false);
    } catch (e) {
      const error = e as {
        message?: string;
        response?: { data: { message?: string; detail?: string } };
      };
      toaster.create({
        title: "Password Update Failed",
        description:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Failed to update password. Please check your current password and try again.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
        Change Password
      </Heading>

      {!isEditing ? (
        <VStack align="start">
          <Text color="gray.600" mb={2}>
            Update your password to keep your account secure.
          </Text>
          <Button
            bg="#244D8A"
            color="white"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "#1a3a6b" }}
          >
            Change Password
          </Button>
        </VStack>
      ) : (
        <VStack gap={4} align="stretch">
          <Box>
            <Text mb={2} fontWeight="semibold">
              Current Password
            </Text>
            <PasswordInput
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
          </Box>

          <Box>
            <Text mb={2} fontWeight="semibold">
              New Password
            </Text>
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              autoComplete="new-password"
            />
          </Box>

          <Box>
            <Text mb={2} fontWeight="semibold">
              Confirm New Password
            </Text>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </Box>

          <HStack w="100%" gap={2} mt={2}>
            <Button
              variant="outline"
              borderColor="#BD4F23"
              color="#BD4F23"
              w="50%"
              onClick={handleCancel}
              disabled={loading}
              _hover={{
                bg: "#BD4F23",
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
              disabled={
                loading ||
                !currentPassword ||
                !newPassword ||
                newPassword !== confirmPassword
              }
              _hover={{ bg: "#A43E1E" }}
            >
              Update Password
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default PasswordChangeSection;
