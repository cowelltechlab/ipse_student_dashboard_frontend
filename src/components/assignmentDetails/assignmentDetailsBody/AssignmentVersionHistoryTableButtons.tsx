import { Button, Icon, HStack, DownloadTrigger } from "@chakra-ui/react";
import { IoCloudDownload } from "react-icons/io5";
import { Tooltip } from "../../ui/tooltip";
import { IoIosCheckbox } from "react-icons/io";

interface AssignmentsVersionHistoryTableRowButtonsProps {
  fileName?: string;
  fileType?: string;
  downloadUrl?: string;

  handleVersionFinalization: () => void;
}

const AssignmentsVersionHistoryTableRowButtons = ({
  downloadUrl = "",
  fileName = "",
  fileType = "",

  handleVersionFinalization,
}: AssignmentsVersionHistoryTableRowButtonsProps) => {
  const data = async () => {
    console.log(downloadUrl);
    const res = await fetch(downloadUrl);
    return res.blob();
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
      <Tooltip content="Finalize Version" positioning={{ placement: "top" }}>
        <Button
          variant={"ghost"}
          padding={0}
          onClick={handleVersionFinalization}
        >
          <Icon size="md">
            <IoIosCheckbox />
          </Icon>
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default AssignmentsVersionHistoryTableRowButtons;
