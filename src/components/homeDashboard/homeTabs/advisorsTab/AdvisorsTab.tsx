import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../../common/searchBar/SearchBar";
import { useState } from "react";
import TextButton from "../../../common/universal/TextButton";
import UserCardGrid from "../../../common/userCards/UserCardGrid";
import useRoles from "../../../../hooks/roles/useRoles";
import useUsers from "../../../../hooks/users/useUsers";
import type { UserType } from "../../../../types/UserTypes";
import DisplayAdvisorDialog from "./DisplayAdvisorDialog";
import DeleteUserDialog from "../DeleteUserDialog";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";
import { IoIosAddCircle } from "react-icons/io";

const AdvisorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
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
  } = useUsers(refetchTrigger, advisorRole?.id ?? undefined);

  const handleCreateAdvisor = () => {
    setIsCreateAdvisorDialogOpen(true);
  };

  const handleClickAdvisorCard = (user: UserType) => {
    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    setRefetchTrigger(refetchTrigger + 1);
  }

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Advisors..."
        />
        <Spacer />

        <TextButton color="#bd4f23" onClick={handleCreateAdvisor}>
          <HStack gap={1}>
            <IoIosAddCircle color="#bd4f23" />
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
        <DeleteUserDialog
          userId={selectedUser.id}
          userFirstName={selectedUser.first_name}
          userLastName={selectedUser.last_name}
          userGTEmail={selectedUser.school_email}
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          handleDelete={handleDelete}
        />
      )}

      {isCreateAdvisorDialogOpen && (
        <CreateUserDialog
          open={isCreateAdvisorDialogOpen}
          setOpen={setIsCreateAdvisorDialogOpen}
          refetchTrigger={refetchTrigger}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}
    </Box>
  );
};

export default AdvisorsTab;
