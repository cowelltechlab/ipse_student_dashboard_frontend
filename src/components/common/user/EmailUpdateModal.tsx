import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toaster } from "../../ui/toaster";
import type { StudentDetailsType } from "../../../types/StudentGroupTypes";
import useUpdateUserEmails from "../../../hooks/users/useUpdateUserEmails";
import type { UserType } from "../../../types/UserTypes";

interface EmailUpdateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  student?: StudentDetailsType | null;
  user?: UserType | null
  onUpdate: () => void;
}

const EmailUpdateModal = ({
  open,
  setOpen,
  student,
  user,
  onUpdate,
}: EmailUpdateModalProps) => {
  const [email, setEmail] = useState("");
  const [gtEmail, setGtEmail] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [gtEmailError, setGtEmailError] = useState<string>("");

  const { handleUpdateUserEmails, loading } = useUpdateUserEmails();

  // Email validation functions
  const validateEmail = (email: string): string => {
    if (!email.trim()) return "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

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

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleGtEmailChange = (value: string) => {
    setGtEmail(value);
    setGtEmailError(validateGtEmail(value));
  };

  // Initialize form values when student or user changes
  useEffect(() => {
    if (student) {
      setEmail(student.email || "");
      setGtEmail(student.gt_email || "");
      setEmailError("");
      setGtEmailError("");
    } else if (user) {
      setEmail(user.email || "");
      setGtEmail(user.school_email || "");
      setEmailError("");
      setGtEmailError("");
    } else {
      setEmail("");
      setGtEmail("");
      setEmailError("");
      setGtEmailError("");
    }
  }, [student, user]);

  const handleSave = async () => {
    if (!student && !user) return;

    // Validate emails before saving
    const currentEmailError = validateEmail(email);
    const currentGtEmailError = validateGtEmail(gtEmail);

    setEmailError(currentEmailError);
    setGtEmailError(currentGtEmailError);

    if (currentEmailError || currentGtEmailError) {
      toaster.create({
        description: "Please fix validation errors before saving.",
        type: "error",
      });
      return;
    }

    // At least one email should be provided
    if (!email.trim() && !gtEmail.trim()) {
      toaster.create({
        description: "Please enter at least one email address.",
        type: "error",
      });
      return;
    }

    try {
      // Use user_id from student or id from user
      const userId = student ? student.user_id : user!.id;

      await handleUpdateUserEmails(
        userId,
        email.trim() || undefined,
        gtEmail.trim() || undefined
      );

      toaster.create({
        description: "Email addresses updated successfully.",
        type: "success",
      });

      onUpdate();
      setOpen(false);
    } catch (e) {
      const error = e as { message?: string };
      toaster.create({
        description: `Error updating email addresses: ${
          error.message || "Unknown error"
        }`,
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    if (student) {
      setEmail(student.email || "");
      setGtEmail(student.gt_email || "");
    } else if (user) {
      setEmail(user.email || "");
      setGtEmail(user.school_email || "");
    }
    setEmailError("");
    setGtEmailError("");
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
                  User Email Addresses
                </Heading>
                <Text fontSize="md" color="gray.600" textAlign="center">
                  Manage email addresses for {student?.first_name || user?.first_name}{" "}
                  {student?.last_name || user?.last_name}
                </Text>
              </VStack>
            </Box>

            <Dialog.Body mx={4} mb={4}>
              <VStack spaceY={4} color="white">
                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    Email Address
                  </Text>
                  <Input
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="Enter student email address..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    borderColor={emailError ? "red.500" : "gray.300"}
                    type="email"
                  />
                  {emailError && (
                    <Text fontSize="sm" color="red.300" mt={1}>
                      {emailError}
                    </Text>
                  )}
                </Box>

                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    GT Email Address
                  </Text>
                  <Input
                    value={gtEmail}
                    onChange={(e) => handleGtEmailChange(e.target.value)}
                    placeholder="Enter Georgia Tech email address..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    borderColor={gtEmailError ? "red.500" : "gray.300"}
                    type="email"
                  />
                  {gtEmailError && (
                    <Text fontSize="sm" color="red.300" mt={1}>
                      {gtEmailError}
                    </Text>
                  )}
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
                  onClick={handleSave}
                  loading={loading}
                  disabled={loading || !!emailError || !!gtEmailError}
                  _hover={{ bg: "#A43E1E" }}
                  opacity={loading || !!emailError || !!gtEmailError ? 0.6 : 1}
                >
                  Save Emails
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

export default EmailUpdateModal;
