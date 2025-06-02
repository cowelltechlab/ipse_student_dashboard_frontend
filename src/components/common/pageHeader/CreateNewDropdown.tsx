import { Menu, Button, Portal } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

const CreateNewDropdown = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>
          Create New
          <RiArrowDropDownLine />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt-a">New Student</Menu.Item>
            <Menu.Item value="new-file-a">New Assignment</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default CreateNewDropdown;
