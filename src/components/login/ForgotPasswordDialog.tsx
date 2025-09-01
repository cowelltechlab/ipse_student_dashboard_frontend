import { Button, CloseButton, Dialog, Heading, Image, Portal, Text } from "@chakra-ui/react";

import forgotPasswordImage from "../../assets/Forgot password.svg";
import { useState } from "react";

interface ForgotPasswordDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ForgotPasswordDialog = ({ open, setOpen }: ForgotPasswordDialogProps) => {
    const [email, setEmail] = useState("");

    const {handlePasswordResetRequest, loading, error} = usePasswordReset();

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
         
            <Dialog.Body>
              <Image src={forgotPasswordImage} alt="Forgot Password" />
              <Heading as="h2" size="lg" mb={4}>Forgot your Password?</Heading>
              <Text>Enter your email address and we will send you instructions to reset your password</Text>

            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
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
