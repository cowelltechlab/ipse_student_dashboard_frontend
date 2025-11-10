import { Button, Icon, HStack, DownloadTrigger } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoCloudDownload } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";

import { Tooltip } from "../../ui/tooltip";
import AssignmentMetadataModal from "./AssignmentMetadataModal";
import { useState } from "react";
import useDownloadAssignmentVersion from "../../../hooks/assignmentVersions/useDownloadAssignmentVersion";

interface AssignmentsTableRowButtonsProps {
  assignment_id: number;
  final_version_id?: string | null;
  student_id: number;
  fileName?: string;
  fileType?: string;
  downloadUrl?: string;
  triggerAssignmentsRefetch: () => void;
  student_first_name?: string | null;
  student_last_name?: string | null;
  assignment_date_modified?: string | null;
}

const AssignmentsTableRowButtons = ({
  student_id,
  assignment_id,
  final_version_id = null,
  downloadUrl = "",
  fileName = "",
  fileType = "",
  student_first_name,
  student_last_name,
  assignment_date_modified,
  triggerAssignmentsRefetch,
}: AssignmentsTableRowButtonsProps) => {
  const [openAssignmentMenu, setOpenAssignmentMenu] = useState(false);
  const { getDownloadBlob } = useDownloadAssignmentVersion();

  const getFinalVersionDocx = async () => {
    if (!final_version_id) {
      throw new Error("No document_id provided for final version.");
    }

    try {
      const blob = await getDownloadBlob(final_version_id);
      return blob;
    } catch (error) {
      console.error("Error downloading final version:", error);
      throw new Error("Failed to download final version document.");
    }
  };

  const data = async () => {
    if (final_version_id) {
      return getFinalVersionDocx();
    }
    const res = await fetch(downloadUrl);
    return res.blob();
  };

  const handleRatingNavigateClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const assignment_version_id = final_version_id;
    if (!assignment_version_id) {
      console.error("Final version ID is not available.");
      return;
    }
    window.location.href = `/student/${student_id}/assignment/${assignment_id}/rating-and-feedback/${assignment_version_id}`;
  };

  const handleModificationNavigateClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    window.location.href = `/student/${student_id}/assignment/${assignment_id}/modification`;
  };

  const handleAssignmentMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default action and stop event propagation
    e.preventDefault();
    e.stopPropagation();

    setOpenAssignmentMenu(true);
  };

  return (
    <>
      <HStack gap={2} alignItems="center" justifyContent="right">
        <Tooltip
          content="Download Assignment"
          positioning={{ placement: "top" }}
        >
          <DownloadTrigger
            data={data}
            fileName={`${fileName}_${student_first_name}_${student_last_name}_${assignment_date_modified}${final_version_id ? "_final_version" : ""}.${fileType}`}
            mimeType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            asChild
          >
            <Button
              variant={"ghost"}
              padding={0}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon size="md">
                <IoCloudDownload />
              </Icon>
            </Button>
          </DownloadTrigger>
        </Tooltip>
        <Tooltip content="Rate Assignment" positioning={{ placement: "top" }}>
          <Button
            variant={"ghost"}
            padding={0}
            onClick={handleRatingNavigateClick}
            disabled={!final_version_id}
          >
            <Icon size="md">
              <FaStar />
            </Icon>
          </Button>
        </Tooltip>
        <Tooltip content="Change Assignment" positioning={{ placement: "top" }}>
          <Button
            variant={"ghost"}
            padding={0}
            onClick={handleModificationNavigateClick}
          >
            <Icon size="md">
              <BsStars />
            </Icon>
          </Button>
        </Tooltip>
        <Tooltip content="Change Assignment" positioning={{ placement: "top" }}>
          <Button
            variant={"ghost"}
            padding={0}
            onClick={handleAssignmentMenuOpen}
          >
            <Icon size="md">
              <HiDotsVertical />
            </Icon>
          </Button>
        </Tooltip>
      </HStack>

      {/* Only render modal when it's actually open */}
      {openAssignmentMenu && (
        <AssignmentMetadataModal
          open={openAssignmentMenu}
          setOpen={setOpenAssignmentMenu}
          assignmentId={assignment_id}
          studentId={student_id}
          triggerAssignmentsRefetch={triggerAssignmentsRefetch}
        />
      )}
    </>
  );
};

export default AssignmentsTableRowButtons;
