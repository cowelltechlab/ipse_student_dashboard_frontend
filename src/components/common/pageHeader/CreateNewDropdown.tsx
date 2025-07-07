import { Menu, Portal, HStack, Box } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import TextButton from "../universal/TextButton";
import { useState } from "react";
import CreateUserDialog from "../../homeDashboard/createUserDialog/CreateUserDialog";

const CreateNewDropdown = () => {
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] =
    useState<boolean>(false);

  const handleCreateUser = () => {
    setIsCreateUserDialogOpen(true);
  };

  const handleCreateAssignment = () => {
    console.log("create assignment");
  };

  return (
    <Box>
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
              <Menu.Item onClick={handleCreateUser} value="new-txt-a">
                New User
              </Menu.Item>
              <Menu.Item onClick={handleCreateAssignment} value="new-file-a">
                New Assignment
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {isCreateUserDialogOpen && (
        <CreateUserDialog
          open={isCreateUserDialogOpen}
          setOpen={setIsCreateUserDialogOpen}
          
        />
      )}
    </Box>
  );
};

export default CreateNewDropdown;
