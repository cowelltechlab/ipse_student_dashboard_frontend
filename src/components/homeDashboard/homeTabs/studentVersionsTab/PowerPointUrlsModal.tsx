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
  const { handleUpdatePptUrls, loading } = useUpdateStudentPptUrls();

  // Initialize form values when student changes
  useEffect(() => {
    if (student) {
      setEmbedUrl(student.ppt_embed_url || "");
      setEditUrl(student.ppt_edit_url || "");
    } else {
      setEmbedUrl("");
      setEditUrl("");
    }
  }, [student]);

  const handleSave = async () => {
    if (!student) return;

    try {
      await handleUpdatePptUrls(student.student_id, {
        ppt_embed_url: embedUrl || null,
        ppt_edit_url: editUrl || null,
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
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    placeholder="Enter PowerPoint embed URL..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                  />
                </Box>

                <Box w="full">
                  <Text mb={2} fontWeight="semibold">
                    Edit URL
                  </Text>
                  <Input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="Enter PowerPoint edit URL..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                  />
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
                  _hover={{ bg: "#A43E1E" }}
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