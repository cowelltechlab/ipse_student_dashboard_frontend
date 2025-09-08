import {
  Box,
  Text,
  VStack,
  Image,
  Button,
  Icon,
  HStack,
  DownloadTrigger,
} from "@chakra-ui/react";
import {
  type VersionInfoType,
  type AssignmentDetailType,
} from "../../../types/AssignmentTypes";
import AssignmentSection from "./AssignmentSection";
import AssignmentPreviews from "./AssignmentPreviews";
import AssignmentDetailsHeaderCard from "./AssignmentDetailsHeaderCard";

import noDraftImage from "../../../assets/Student Profile _Document_No draft selected.svg";
import { useEffect, useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import AssignmentVersionHistoryTable from "./AssignmentVersionHistoryTable";
import useGetAssignmentVersionByDocId from "../../../hooks/assignmentVersions/useGetAssignmentVersionByDocId";
import useFinalizeAssignmentVerstion from "../../../hooks/assignmentVersions/useFinalizeAssignmentVersion";
import { toaster } from "../../ui/toaster";
import { Tooltip } from "../../ui/tooltip";
import { IoCloudDownload } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { buildModifiedHtml } from "../../../utils/assignmentHtml";
import useDownloadAssignmentVersion from "../../../hooks/assignmentVersions/useDownloadAssignmentVersion";

interface AssignmentDetailsBodyProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
  triggerRefetch: () => void;
}

const AssignmentDetailsBody = ({
  assignment,
  assignmentLoading,
  triggerRefetch,
}: AssignmentDetailsBodyProps) => {
  const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [finalVersion, setFinalVersion] = useState<VersionInfoType | null>(
    null
  );

  const [activeVersion, setActiveVersion] = useState<string | null>(null);

  const { assignmentVersion, loading: AssignmentVersionLoading } =
    useGetAssignmentVersionByDocId(activeVersion);

  const { handleFinalizeAssignmentVersion } = useFinalizeAssignmentVerstion();

  const { getDownloadBlob } = useDownloadAssignmentVersion()

  const handleSelectVersionClick = (selectedVersionId: string) => {
    setActiveVersion(selectedVersionId);
  };

  const handleRatingNavigateClick = (assignment_id?: string) => {
    const student_id = assignment?.student.id;

    navigate(
      `/student/${student_id}/assignment/${assignment_id}/rating-and-feedback/${assignmentVersion?.id}`
    );
  };

  const finalizeVersion = async (versionId: string) => {
    if (!versionId) {
      console.error("No version ID provided to finalize.");
      return;
    }

    try {
      const response = await handleFinalizeAssignmentVersion(versionId);
      if (response) {
        toaster.create({
          description: `Assginment finalized successfully`,
          type: "success",
        });
      }
      triggerRefetch();
    } catch (e) {
      console.error(e);
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };

      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating class: ${errorMessage}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (assignment?.versions) {
      const finalizedVersion =
        assignment.versions.find((v) => v.finalized === true) || null;

      setFinalVersion(finalizedVersion);

      // If there is a finalized version, set it as the active version
      if (finalizedVersion?.document_id) {
        setActiveVersion(finalizedVersion.document_id);
      }
    }
  }, [assignment, finalVersion]);


  const originalAssignmentData = async () => {
    console.log(assignment?.blob_url);
    if (!assignment?.blob_url) {
      throw new Error("No blob_url provided for assignment.");
    }
    const res = await fetch(assignment.blob_url);
    return res.blob();
  };


  const getFinalVersionDocx = async () => {
    if (!finalVersion?.document_id) {
      throw new Error("No document_id provided for final version.");
    }
    
    try {
      const blob = await getDownloadBlob(finalVersion.document_id);
      return blob;
    } catch (error) {
      console.error("Error downloading final version:", error);
      throw new Error("Failed to download final version document.");
    }
  };
  

  

  return (
    <Box m={4}>
      <AssignmentDetailsHeaderCard assignment={assignment} />

      <AssignmentPreviews
        assignment={assignment}
        assignmentLoading={assignmentLoading}
        selectedVersionHTML={buildModifiedHtml(assignmentVersion)} // <- stitched HTML
        selectedVersionLoading={AssignmentVersionLoading}
        isFinalizedVersion={activeVersion === finalVersion?.document_id}
      />
      {assignment?.finalized && (
        <AssignmentSection
          tagContent="Final Version"
          assignment={assignment}
          downloadUrl={finalVersion?.document_url}
        >
          <HStack gap={2} alignItems="center" justifyContent="right">
            <Tooltip
              content="Download Assignment"
              positioning={{ placement: "top" }}
            >
              <DownloadTrigger
                data={getFinalVersionDocx}
                fileName={assignment?.title + "_final_version"}
                mimeType={""}
                asChild
              >
                <Button variant={"ghost"} padding={0}>
                  <Icon size="md">
                    <IoCloudDownload />
                  </Icon>
                </Button>
              </DownloadTrigger>
            </Tooltip>
            <Tooltip
              content="Rate Assignment"
              positioning={{ placement: "top" }}
            >
              <Button
                variant={"ghost"}
                padding={0}
                onClick={() =>
                  handleRatingNavigateClick(finalVersion?.document_id)
                }
              >
                <Icon size="md">
                  <FaStar />
                </Icon>
              </Button>
            </Tooltip>
          </HStack>
        </AssignmentSection>
      )}
      <AssignmentSection
        tagContent="Original Version"
        assignment={assignment}
        downloadUrl={assignment?.blob_url}
      >
        <HStack gap={2} alignItems="center" justifyContent="right">
          <Tooltip
            content="Download Assignment"
            positioning={{ placement: "top" }}
          >
            <DownloadTrigger
              data={originalAssignmentData}
              fileName={assignment?.title + "_original.docx"}
              mimeType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              asChild
            >
              <Button variant={"ghost"} padding={0}>
                <Icon size="md">
                  <IoCloudDownload />
                </Icon>
              </Button>
            </DownloadTrigger>
          </Tooltip>
          <Tooltip
            content="Change Assignment"
            positioning={{ placement: "top" }}
          >
            <Button variant={"ghost"} padding={0}>
              <Icon size="md">
                <BsStars />
              </Icon>
            </Button>
          </Tooltip>
        </HStack>
      </AssignmentSection>
      {!assignment?.finalized && (
        <VStack mt={5} gap={3}>
          <Image src={noDraftImage} height={40} />
          <Text fontWeight={"bold"}>No assignment has been finalized yet.</Text>
        </VStack>
      )}
      <Button
        w={"100%"}
        borderRadius={"md"}
        color={"white"}
        fontWeight={"bold"}
        bg={showHistory ? "#f2c5b5" : "#bd4f23"}
        onClick={() => setShowHistory(!showHistory)}
        mt={"5"}
      >
        History
        <Icon
          as={showHistory ? IoIosArrowDropupCircle : IoIosArrowDropdownCircle}
        />
      </Button>
      {showHistory && (
        <AssignmentVersionHistoryTable
          assignment={assignment}
          handleSelectVersionClick={handleSelectVersionClick}
          finalizeVersion={finalizeVersion}
        />
      )}
    </Box>
  );
};

export default AssignmentDetailsBody;
