import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Heading,
  Icon,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

import forgotPasswordImage from "../../assets/Forgot password.svg";
import { useState } from "react";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import { toaster } from "../ui/toaster";
import TextButton from "../common/universal/TextButton";
import { FaCircleCheck } from "react-icons/fa6";

interface ForgotPasswordDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ForgotPasswordDialog = ({ open, setOpen }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState("");

  const { handlePasswordResetRequest, loading } = useForgotPassword();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handlePasswordResetRequest(email);
      toaster.create({
        title: "Password Reset",
        description:
          "If an account with that email exists, we sent you a link to reset your password",
        type: "info",
      });
    } catch (e) {
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };
      toaster.create({
        title: "Error",
        description:
          error.response?.data.message ||
          "Something went wrong. Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="#eaeef4" p={6} color="black">
            <Dialog.Body>
              <VStack alignItems="center" spaceY={4} mb={4}>
                <Image height="400px" src={forgotPasswordImage} alt="Forgot Password" />
                <Heading as="h2" size="2xl" mb={4} color="black">
                  Forgot your Password?
                </Heading>
                <Text fontSize="lg" textAlign="center" px={10} lineHeight={1.5} color="black">
                  Enter your email address and we will send you instructions to
                  reset your password
                </Text>
                <Field.Root>
                  <Input
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    bg="white"
                    borderRadius="xl"
                    p={4}
                    color="black"
                    _placeholder={{ color: "black" }}
                  />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <VStack w="100%" spaceY={2}>
                <Button
                  w="100%"
                  bg="#BD4F23"
                  p={4}
                  color="white"
                  borderRadius="xl"
                  onClick={handleForgotPassword}
                  loading={loading}
                >
                  Reset Password
                  <Icon as={FaCircleCheck} />
                </Button>
                <TextButton
                  onClick={() => setOpen(false)}
                  color="#BD4F23"
                  underlined
                  fontSize="lg"
                  fontWeight="normal"
                >
                  Back to Sign-In
                </TextButton>
              </VStack>
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

export default ForgotPasswordDialog;
