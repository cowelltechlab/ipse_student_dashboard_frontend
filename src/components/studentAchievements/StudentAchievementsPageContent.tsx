import {
  Box,
  Heading,
  Separator,
  VStack,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../types/StudentTypes";
import StudentSummaryHeaderCard from "../common/studentProfilePages/StudentSummaryHeaderCard";
import { useEffect, useState } from "react";
import usePostEmbedUrl from "../../hooks/studentProfiles/usePostEmbedUrl";
import { toaster } from "../ui/toaster";

interface StudentAchievementsPageContentProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

const StudentAchievementsPageContent = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentAchievementsPageContentProps) => {
  const [pptEmbedUrlUpload, setPptEmberUrlUpload] = useState<string>("");
  const [pptEditUrlUpload, setPptEditUrlUpload] = useState<string>("");

  const { handlePostEmbedUrl, loading } = usePostEmbedUrl();

  const isValidSharePointUrl = (url: string) => {
    return (
      url.startsWith("https://gtvault-my.sharepoint.com") &&
      url.includes("/Doc.aspx") &&
      url.includes("sourcedoc=")
    );
  };

  // Prepopulate fields from student object
  useEffect(() => {
    if (student) {
      if (student.ppt_embed_url) setPptEmberUrlUpload(student.ppt_embed_url);
      if (student.ppt_edit_url) setPptEditUrlUpload(student.ppt_edit_url);
    }
  }, [student]);

  const uploadPptEmbedUrl = async () => {
    if (!pptEmbedUrlUpload || !pptEditUrlUpload || !student?.student_id) return;

    if (!isValidSharePointUrl(pptEmbedUrlUpload)) {
      toaster.create({
        description: "Please enter a valid SharePoint embed link.",
        type: "error",
      });
      return;
    }

    if (!pptEditUrlUpload.trim()) {
      toaster.create({
        description: "Please enter a SharePoint edit link.",
        type: "error",
      });
      return;
    }

    try {
      await handlePostEmbedUrl(
        student.student_id,
        pptEmbedUrlUpload,
        pptEditUrlUpload
      );
      toaster.create({
        description: "Presentation URLs updated successfully.",
      });
      triggerRefetch();
    } catch (error) {
      console.error("Failed to update embed URL:", error);
      toaster.create({
        description: `Error updating embed URL: ${error}`,
        type: "error",
      });
    }
  };

  const showForm = !student?.ppt_embed_url || !student?.ppt_edit_url;

  return (
    <Box p={4}>
      <StudentSummaryHeaderCard
        student={student}
        profileLoading={profileLoading}
      />
      <Separator my={6} />
      <VStack>
        {student?.ppt_edit_url ? (
          <Link
            href={student.ppt_edit_url}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <Heading color="#244D8A">Complete Your Achievements</Heading>
          </Link>
        ) : (
          <Heading color="#244D8A">Complete Your Achievements</Heading>
        )}

        <Box h="800px" bg="#EAEEF4" w="100%" borderRadius="lg" p={4}>
          {student?.ppt_embed_url && !showForm ? (
            <iframe
              src={student.ppt_embed_url}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              allowFullScreen
            />
          ) : (
            <>
              <Heading size="md" color="gray.500" textAlign="center" pt={4}>
                Presentation info is incomplete. Please fill in below.
              </Heading>

              <VStack gap={4} mt={6} w="100%">
                <Input
                  placeholder="Paste SharePoint embed link..."
                  value={pptEmbedUrlUpload}
                  onChange={(e) => setPptEmberUrlUpload(e.target.value)}
                  bg="white"
                />
                {pptEmbedUrlUpload.length > 0 &&
                  !isValidSharePointUrl(pptEmbedUrlUpload) && (
                    <Box w="100%" textAlign="left">
                      <Text fontSize="sm" color="red.500" mt={1}>
                        Please enter a valid SharePoint embed link.
                      </Text>
                    </Box>
                  )}

                <Input
                  placeholder="Paste SharePoint edit link (required)..."
                  value={pptEditUrlUpload}
                  onChange={(e) => setPptEditUrlUpload(e.target.value)}
                  bg="white"
                />
                {pptEditUrlUpload.trim() === "" && (
                  <Box w="100%" textAlign="left">
                    <Text fontSize="sm" color="red.500" mt={1}>
                      Please enter a SharePoint edit link.
                    </Text>
                  </Box>
                )}

                <Button
                  onClick={uploadPptEmbedUrl}
                  loading={loading}
                  disabled={
                    !isValidSharePointUrl(pptEmbedUrlUpload) ||
                    pptEditUrlUpload.trim() === ""
                  }
                  bg="#244d8a"
                  color="white"
                >
                  Upload Presentation URLs
                </Button>
              </VStack>
            </>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default StudentAchievementsPageContent;
