import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Heading,
  Image,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";

import forgotPasswordImage from "../../assets/Forgot password.svg";
import { useState } from "react";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import { toaster } from "../ui/toaster";

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
          <Dialog.Content>
            <Dialog.Body>
              <Image src={forgotPasswordImage} alt="Forgot Password" />
              <Heading as="h2" size="lg" mb={4}>
                Forgot your Password?
              </Heading>
              <Text>
                Enter your email address and we will send you instructions to
                reset your password
              </Text>
              <Field.Root>
                <Input
                  value={email}
                  placeholder="Enter Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  bg={"white"}
                />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button bg={"#BD4F23"} color={"white"} borderRadius={"lg"} onClick={handleForgotPassword} loading={loading}>
                Reset Password
              </Button>
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
