import { Menu, Portal, HStack, Box } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import TextButton from "../universal/TextButton";
import { useState } from "react";
import CreateUserDialog from "../../homeDashboard/createUserDialog/CreateUserDialog";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../contexts/useAuth";

const CreateNewDropdown = () => {
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] =
    useState<boolean>(false);

  const { roles } = useAuth();

  const navigate = useNavigate();

  const handleCreateUser = () => {
    setIsCreateUserDialogOpen(true);
  };

  const handleCreateAssignment = () => {
    navigate("/create-assignment");
  };

  const canCreate = roles.includes("Admin") || roles.includes("Advisor");
  if (!canCreate) return null;

  return (
    <Box>
      <Menu.Root>
        <Menu.Trigger asChild>
          {/* Use a single ref-forwarding element */}
          <Box as="button">
            <TextButton onClick={() => {}} fontSize="lg">
              <HStack gap={0} alignItems="flex-start" color="#BD4F23">
                Create <RiArrowDropDownLine size={30} />
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
