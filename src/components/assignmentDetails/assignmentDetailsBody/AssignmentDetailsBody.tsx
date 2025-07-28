import { Box, Text, VStack, Image, Button, Icon } from "@chakra-ui/react";
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
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [finalVersion, setFinalVersion] = useState<VersionInfoType | null>(
    null
  );

  const [activeVersion, setActiveVersion] = useState<string | null>(null);

  const { assignmentVersion, loading: AssignmentVersionLoading } =
    useGetAssignmentVersionByDocId(activeVersion);

  const { handleFinalizeAssignmentVersion } = useFinalizeAssignmentVerstion();

  const handleSelectVersionClick = (selectedVersionId: string) => {
    setActiveVersion(selectedVersionId);
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
  }, [assignment]);

  return (
    <Box m={4}>
      <AssignmentDetailsHeaderCard assignment={assignment} />
      <AssignmentPreviews
        assignment={assignment}
        assignmentLoading={assignmentLoading}
        selectedVersionHTML={
          assignmentVersion?.final_generated_content?.html_content
        }
        selectedVersionLoading={AssignmentVersionLoading}
        isFinalizedVersion={activeVersion === finalVersion?.document_id}
      />

      {assignment?.finalized && (
        <AssignmentSection
          tagContent="Final Version"
          assignment={assignment}
          downloadUrl={finalVersion?.document_url}
        />
      )}
      <AssignmentSection
        tagContent="Original Version"
        assignment={assignment}
        downloadUrl={assignment?.blob_url}
      />

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
