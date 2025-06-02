import { Menu, Portal, HStack, Box } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import TextButton from "../universal/TextButton";

const CreateNewDropdown = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box>
          <TextButton onClick={() => {}}>
            <HStack gap={0}>
              Create New <RiArrowDropDownLine size={"30"} />
            </HStack>
          </TextButton>
        </Box>
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
