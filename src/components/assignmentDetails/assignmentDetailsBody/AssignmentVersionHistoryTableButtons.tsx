import { Button, Icon, HStack } from "@chakra-ui/react";
import { IoCloudDownload } from "react-icons/io5";
import { Tooltip } from "../../ui/tooltip";
import { IoIosCheckbox } from "react-icons/io";

interface AssignmentsVersionHistoryTableRowButtonsProps {
  fileName?: string;
  fileType?: string;
  onDownload: () => Promise<void>;

  handleVersionFinalization: () => void;
}

const AssignmentsVersionHistoryTableRowButtons = ({
  onDownload,

  handleVersionFinalization,
}: AssignmentsVersionHistoryTableRowButtonsProps) => {

  return (
    <HStack gap={2} alignItems="center" justifyContent="right">
      <Tooltip content="Download Assignment" positioning={{ placement: "top" }}>
        <Button variant={"ghost"} padding={0} onClick={onDownload}>
          <Icon size="md">
            <IoCloudDownload />
          </Icon>
        </Button>
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
