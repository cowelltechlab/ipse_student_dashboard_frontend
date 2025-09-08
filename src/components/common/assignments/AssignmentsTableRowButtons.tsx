import { Button, Icon, HStack, DownloadTrigger } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoCloudDownload } from "react-icons/io5";
import { Tooltip } from "../../ui/tooltip";

interface AssignmentsTableRowButtonsProps {
  assignment_id: number;
  student_id: number;
  fileName?: string;
  fileType?: string;
  downloadUrl?: string;
}

const AssignmentsTableRowButtons = ({
  student_id,
  assignment_id,
  downloadUrl = "",
  fileName = "",
  fileType = "",
}: AssignmentsTableRowButtonsProps) => {
  const data = async () => {
    console.log(downloadUrl);
    const res = await fetch(downloadUrl);
    return res.blob();
  };

  const handleRatingNavigateClick = () => {
    window.location.href = `/student/${student_id}/assignment/${assignment_id}/rating-and-feedback`;
  };

  const handleModificationNavigateClick = () => {
    window.location.href = `/student/${student_id}/assignment/${assignment_id}/modification`;
  };

  return (
    <HStack gap={2} alignItems="center" justifyContent="right">
      <Tooltip content="Download Assignment" positioning={{ placement: "top" }}>
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
    </HStack>
  );
};

export default AssignmentsTableRowButtons;
