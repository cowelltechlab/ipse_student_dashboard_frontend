import { Button, Icon, HStack } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoCloudDownload } from "react-icons/io5";
import { Tooltip } from "../../../ui/tooltip";

const AssignmentsTableRowButtons = () => {
  return (
    <HStack gap={2} alignItems="center" justifyContent="right">
      <Tooltip content="Download Assignment" positioning={{ placement: "top" }}>
        <Button variant={"ghost"} padding={0}>
          <Icon size="md">
            <IoCloudDownload />
          </Icon>
        </Button>
      </Tooltip>
      <Tooltip content="Rate Assignment" positioning={{ placement: "top" }}>
        <Button variant={"ghost"} padding={0}>
          <Icon size="md">
            <FaStar />
          </Icon>
        </Button>
      </Tooltip>
      <Tooltip content="Modify Assignment" positioning={{ placement: "top" }}>
        <Button variant={"ghost"} padding={0}>
          <Icon size="md">
            <BsStars />
          </Icon>
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default AssignmentsTableRowButtons;
