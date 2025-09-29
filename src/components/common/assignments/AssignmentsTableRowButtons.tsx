import { Button, Icon, HStack, DownloadTrigger } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoCloudDownload } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";

import { Tooltip } from "../../ui/tooltip";
import AssignmentMetadataModal from "./AssignmentMetadataModal";
import { useState } from "react";

interface AssignmentsTableRowButtonsProps {
  assignment_id: number;
  final_version_id?: string | null;
  student_id: number;
  fileName?: string;
  fileType?: string;
  downloadUrl?: string;
}

const AssignmentsTableRowButtons = ({
  student_id,
  assignment_id,
  final_version_id = null,
  downloadUrl = "",
  fileName = "",
  fileType = "",
}: AssignmentsTableRowButtonsProps) => {

  const [openAssignmentMenu, setOpenAssignmentMenu] = useState(false);

  
  const data = async () => {
    console.log(downloadUrl);
    const res = await fetch(downloadUrl);
    return res.blob();
  };

  const handleRatingNavigateClick = () => {
    const assignment_version_id = final_version_id;
    if (!assignment_version_id) {
      console.error("Final version ID is not available.");
      return;
    }
    window.location.href = `/student/${student_id}/assignment/${assignment_id}/rating-and-feedback/${assignment_version_id}`;
  };

  const handleModificationNavigateClick = () => {
    window.location.href = `/student/${student_id}/assignment/${assignment_id}/modification`;
  };

  const handleAssignmentMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default action
    e.preventDefault();

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
            fileName={fileName}
            mimeType={fileType}
            asChild
          >
            <Button variant={"ghost"} padding={0}>
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

      <AssignmentMetadataModal
        open={openAssignmentMenu}
        setOpen={setOpenAssignmentMenu}
        assignmentId={assignment_id}
        studentId={student_id}
      />
    </>
  );
};

export default AssignmentsTableRowButtons;
