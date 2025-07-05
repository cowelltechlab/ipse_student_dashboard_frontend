import { Box, Button, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PasswordInput } from "../ui/password-input";
import TextButton from "../common/universal/TextButton";
import useCompleteUserRegistry from "../../hooks/users/useCompleteUserRegistry";
import ProfilePictureSelectionDialog from "./ProfilePictureSelectionDialog";
import { toaster } from "../ui/toaster";

const RegisterForm = () => {
  const [token, setToken] = useState<string>("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [existingBlobUrl, setExistingBlobUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const { handleCompleteUserRegistry, loading } = useCompleteUserRegistry();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  const onUserRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profilePicture && !existingBlobUrl) {
      toaster.create({
        description: "Please select or upload a profile picture.",
        type: "error",
      });
      return;
    }

    try {
      const response = await handleCompleteUserRegistry(
        token,
        firstName,
        lastName,
        password,
        profilePicture,
        existingBlobUrl
      );

      if (response) {
        toaster.create({
          description: "Account created successfully.",
          type: "success",
        });
        navigate("/login");
      }
    } catch (e) {
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };
      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating account: ${errorMessage}`,
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Heading
        fontSize="5xl"
        color="white"
        mb={6}
        textAlign="center"
        mt={{ base: 4, lg: 20 }}
      >
        Create Your Account
      </Heading>

      <form onSubmit={onUserRegisterSubmit}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height={{ base: "auto", lg: "80vh" }}
          px={{ base: 0, lg: 4 }}
        >
          <Box maxW={{ base: "full", lg: "sm" }} w="lg">
            <Stack spaceY={6} w="full" align="center">
              <Input
                placeholder="Enter First Name"
                _placeholder={{ color: "white" }}
                color="white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
              />
              <Input
                placeholder="Enter Last Name"
                _placeholder={{ color: "white" }}
                color="white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
              />
              <PasswordInput
                placeholder="Enter Password"
                _placeholder={{ color: "white" }}
                color="white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
              />
              <PasswordInput
                placeholder="Confirm Password"
                _placeholder={{ color: "white" }}
                color="white"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                variant="flushed"
                size={"xl"}
                w="full"
              />

              {/* <ProfilePictureUpload onFileUpload={setProfilePicture} /> */}

              <ProfilePictureSelectionDialog
                onSelectDefaultImage={(selectedImage) => {
                  setExistingBlobUrl(selectedImage);
                  setProfilePicture(null);
                }}
                onUploadedImage={(uploadedImage) => {
                  setProfilePicture(uploadedImage);
                  setExistingBlobUrl(null);
                }}
              />

              <Button
                type="submit"
                w="full"
                bg="#bd4f23"
                color="white"
                loading={loading}
                _hover={{ bg: "#a43e1c" }}
              >
                Create Account
              </Button>

              <TextButton onClick={() => navigate("/login")} color="white">
                Already have an account? Log in
              </TextButton>
            </Stack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default RegisterForm;
