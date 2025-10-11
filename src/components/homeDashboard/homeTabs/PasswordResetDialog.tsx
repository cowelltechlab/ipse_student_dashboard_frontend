import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "../../ui/password-input";
import useAdminResetPassword from "../../../hooks/auth/useAdminResetPassword";
import { toaster } from "../../ui/toaster";
import { generateTemporaryPassword } from "../../../utils/passwordUtils";
import type { StudentDetailsType } from "../../../types/StudentGroupTypes";

import resetPasswordImage from "../../../assets/Forgot password.svg";
import type { UserType } from "../../../types/UserTypes";

interface AdminPasswordResetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onPasswordReset: () => void;

  student?: StudentDetailsType | null;
  user?: UserType | null;
}

const AdminPasswordResetModal = ({
  open,
  setOpen,
  student,
  user,
  onPasswordReset,
}: AdminPasswordResetModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleAdminResetPassword, loading } = useAdminResetPassword();

  const handleAutoGenerate = () => {
    const generatedPassword = generateTemporaryPassword(10);
    setPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
  };

  const handleReset = async () => {
    if (!student && !user) {
      console.log("returing early");
      return;
    }

    // Validation
    if (!password.trim()) {
      toaster.create({
        description: "Please enter a password.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      toaster.create({
        description: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    if (password.length < 6) {
      toaster.create({
        description: "Password must be at least 6 characters long.",
        type: "error",
      });
      return;
    }

    try {
      const userId = student?.user_id || user?.id;
      if (!userId) return; // Extra safety check

      const response = await handleAdminResetPassword(userId, password);

      toaster.create({
        title: "Password Reset Successful",
        description: `${response.message}`,
        type: "success",
      });

      onPasswordReset();
      setOpen(false);

      // Clear form
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      const error = e as {
        message?: string;
        response?: { data: { message?: string; detail?: string } };
      };
      toaster.create({
        title: "Password Reset Failed",
        description:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Failed to reset password. Please try again.",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setPassword("");
    setConfirmPassword("");
    setOpen(false);
  };

  if (!student && !user) return null;

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      size={"lg"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={"#244d8a"} borderRadius={"md"} pb={5}>
            <Box bg={"white"} w={"100%"} mb={4} roundedTop={"md"}>
              <VStack p={6} spaceY={2}>
                <Heading fontSize="xl" color="#244d8a">
                  Reset Password
                </Heading>
                <Text fontSize="md" color="gray.600" textAlign="center">
                  Reset password for {student?.first_name || user?.first_name}{" "}
                  {student?.last_name || user?.last_name}
                </Text>
                <Image
                  src={resetPasswordImage}
                  alt="Reset Password"
                  boxSize="150px"
                />
              </VStack>
            </Box>

            <Dialog.Body mx={4} mb={4}>
              <VStack spaceY={4} color="white">
                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    New Password
                  </Text>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    autoComplete="new-password"
                  />
                </Box>

                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    Confirm Password
                  </Text>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    autoComplete="new-password"
                  />
                </Box>

                <Box w="full" pt={2}>
                  <Button
                    variant="outline"
                    borderColor="white"
                    color="white"
                    w="full"
                    onClick={handleAutoGenerate}
                    disabled={loading}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.1)",
                      borderColor: "white",
                    }}
                  >
                    Auto-Generate Password
                  </Button>
                </Box>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer mx={4}>
              <HStack w="full" gap={2}>
                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  w="50%"
                  onClick={handleCancel}
                  disabled={loading}
                  _hover={{
                    bg: "#BD4F23",
                    borderColor: "#BD4F23",
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg="#BD4F23"
                  w="50%"
                  onClick={handleReset}
                  loading={loading}
                  disabled={
                    loading || !password || password !== confirmPassword
                  }
                  _hover={{ bg: "#A43E1E" }}
                >
                  Reset Password
                </Button>
              </HStack>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AdminPasswordResetModal;
