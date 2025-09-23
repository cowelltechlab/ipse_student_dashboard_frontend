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
import useUpdateStudentPptUrls from "../../../../hooks/studentGroups/useUpdateStudentPptUrls";
import { toaster } from "../../../ui/toaster";
import type { StudentDetailsType } from "../../../../types/StudentGroupTypes";
import { processSharePointUrl } from "../../../../utils/sharePointUtils";

interface PowerPointUrlsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  student: StudentDetailsType | null;
  onUpdate: () => void;
}

const PowerPointUrlsModal = ({
  open,
  setOpen,
  student,
  onUpdate,
}: PowerPointUrlsModalProps) => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [embedUrlError, setEmbedUrlError] = useState<string>("");
  const [editUrlError, setEditUrlError] = useState<string>("");
  const { handleUpdatePptUrls, loading } = useUpdateStudentPptUrls();

  // Validation functions
  const validateEmbedUrl = (url: string) => {
    if (!url.trim()) {
      setEmbedUrlError("");
      return;
    }
    const result = processSharePointUrl(url);
    setEmbedUrlError(result.isValid ? "" : result.userFriendlyError || "Invalid SharePoint URL");
  };

  const validateEditUrl = (url: string) => {
    if (!url.trim()) {
      setEditUrlError("");
      return;
    }
    // Basic URL validation for edit URL
    try {
      new URL(url);
      if (!url.startsWith("https://gtvault-my.sharepoint.com")) {
        setEditUrlError("Edit URL must be from Georgia Tech's SharePoint");
      } else {
        setEditUrlError("");
      }
    } catch {
      setEditUrlError("Please enter a valid URL");
    }
  };

  // Handle embed URL changes with validation
  const handleEmbedUrlChange = (value: string) => {
    setEmbedUrl(value);
    validateEmbedUrl(value);
  };

  // Handle edit URL changes with validation
  const handleEditUrlChange = (value: string) => {
    setEditUrl(value);
    validateEditUrl(value);
  };

  // Initialize form values when student changes
  useEffect(() => {
    if (student) {
      setEmbedUrl(student.ppt_embed_url || "");
      setEditUrl(student.ppt_edit_url || "");
      setEmbedUrlError("");
      setEditUrlError("");
    } else {
      setEmbedUrl("");
      setEditUrl("");
      setEmbedUrlError("");
      setEditUrlError("");
    }
  }, [student]);

  const handleSave = async () => {
    if (!student) return;

    // Validate and process URLs before saving
    let processedEmbedUrl = embedUrl || null;
    const processedEditUrl = editUrl || null;

    // Process embed URL if provided
    if (embedUrl.trim()) {
      const embedValidation = processSharePointUrl(embedUrl);
      if (!embedValidation.isValid) {
        toaster.create({
          description: embedValidation.userFriendlyError || "Please enter a valid SharePoint embed URL.",
          type: "error",
        });
        return;
      }
      processedEmbedUrl = embedValidation.cleanedUrl;
    }

    // Basic validation for edit URL if provided
    if (editUrl.trim()) {
      try {
        new URL(editUrl);
        if (!editUrl.startsWith("https://gtvault-my.sharepoint.com")) {
          toaster.create({
            description: "Edit URL must be from Georgia Tech's SharePoint",
            type: "error",
          });
          return;
        }
      } catch {
        toaster.create({
          description: "Please enter a valid edit URL",
          type: "error",
        });
        return;
      }
    }

    try {
      await handleUpdatePptUrls(student.student_id, {
        ppt_embed_url: processedEmbedUrl,
        ppt_edit_url: processedEditUrl,
      });

      toaster.create({
        description: "PowerPoint URLs updated successfully.",
        type: "success",
      });

      onUpdate();
      setOpen(false);
    } catch (e) {
      const error = e as { message?: string };
      toaster.create({
        description: `Error updating PowerPoint URLs: ${error.message || "Unknown error"}`,
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    if (student) {
      setEmbedUrl(student.ppt_embed_url || "");
      setEditUrl(student.ppt_edit_url || "");
    }
    setOpen(false);
  };

  if (!student) return null;

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
                  PowerPoint URLs
                </Heading>
                <Text fontSize="md" color="gray.600" textAlign="center">
                  Manage PowerPoint URLs for {student.first_name} {student.last_name}
                </Text>
              </VStack>
            </Box>

            <Dialog.Body mx={4} mb={4}>
              <VStack spaceY={4} color="white">
                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    Embed URL
                  </Text>
                  <Input
                    value={embedUrl}
                    onChange={(e) => handleEmbedUrlChange(e.target.value)}
                    placeholder="Paste SharePoint embed URL (iframe link)..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    borderColor={embedUrlError ? "red.500" : "gray.300"}
                  />
                  {embedUrlError && (
                    <Text fontSize="sm" color="red.300" mt={1}>
                      {embedUrlError}
                    </Text>
                  )}
                </Box>

                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    Edit URL
                  </Text>
                  <Input
                    value={editUrl}
                    onChange={(e) => handleEditUrlChange(e.target.value)}
                    placeholder="Enter PowerPoint edit URL (optional)..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    borderColor={editUrlError ? "red.500" : "gray.300"}
                  />
                  {editUrlError && (
                    <Text fontSize="sm" color="red.300" mt={1}>
                      {editUrlError}
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
                  disabled={loading || !!embedUrlError || !!editUrlError}
                  _hover={{ bg: "#A43E1E" }}
                  opacity={loading || !!embedUrlError || !!editUrlError ? 0.6 : 1}
                >
                  Save URLs
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

export default PowerPointUrlsModal;