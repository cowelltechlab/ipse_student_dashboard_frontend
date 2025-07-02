import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../../common/searchBar/SearchBar";
import { useState } from "react";
import TextButton from "../../../common/universal/TextButton";
import { CiCirclePlus } from "react-icons/ci";
import UserCardGrid from "../../../common/userCards/UserCardGrid";
import useRoles from "../../../../hooks/roles/useRoles";
import useUsers from "../../../../hooks/users/useUsers";
import type { UserType } from "../../../../types/UserTypes";
import DisplayAdvisorDialog from "./DisplayAdvisorDialog";
import DeleteAdvisorDialog from "../DeleteUserDialog";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";

const AdvisorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isProfileDialogOpen, setIsProfileDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isCreateAdvisorDialogOpen, setIsCreateAdvisorDialogOpen] =
    useState<boolean>(false);

  const { roles } = useRoles();

  const advisorRole = roles.find((role) => role.role_name === "Advisor");

  const {
    users: advisors,
    loading,
    error,
  } = useUsers(advisorRole?.id ?? undefined);

  const handleCreateAdvisor = () => {
    setIsCreateAdvisorDialogOpen(true);
  };

  const handleClickAdvisorCard = (user: UserType) => {
    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Advisors..."
        />
        <Spacer />

        <TextButton onClick={handleCreateAdvisor}>
          <HStack gap={1}>
            <CiCirclePlus color="#bd4f23" />
            Create new Advisor
          </HStack>
        </TextButton>
      </HStack>

      <UserCardGrid
        searchTerm={searchTerm}
        users={advisors}
        loading={loading}
        error={error}
        onCardClick={handleClickAdvisorCard}
      />

      {selectedUser && (
        <DisplayAdvisorDialog
          user={selectedUser}
          open={isProfileDialogOpen}
          setOpen={setIsProfileDialogOpen}
          setOpenDeleteDialog={setIsDeleteDialogOpen}
        />
      )}

      {selectedUser && (
        <DeleteAdvisorDialog
          user={selectedUser}
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
        />
      )}

      {isCreateAdvisorDialogOpen && (
        <CreateUserDialog
          open={isCreateAdvisorDialogOpen}
          setOpen={setIsCreateAdvisorDialogOpen}
        />
      )}
    </Box>
  );
};

export default AdvisorsTab;
