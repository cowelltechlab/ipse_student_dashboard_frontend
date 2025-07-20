import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../../common/searchBar/SearchBar";
import { useState } from "react";
import TextButton from "../../../common/universal/TextButton";
import useRoles from "../../../../hooks/roles/useRoles";
import useUsers from "../../../../hooks/users/useUsers";
import UserCardGrid from "../../../common/userCards/UserCardGrid";
import type { UserType } from "../../../../types/UserTypes";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";
import DisplayTutorDialog from "./displayTutorDialog/DisplayTutorDialog";
import DeleteUserDialog from "../DeleteUserDialog";
import { IoIosAddCircle } from "react-icons/io";

const PeerTutorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const [isCreateTutorDialogOpen, setIsCreateTutorDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] =
    useState<boolean>(false);

  const { roles } = useRoles();

  const peerTutorRole = roles.find((role) => role.role_name === "Peer Tutor");

  const {
    users: peerTutors,
    loading,
    error,
  } = useUsers(refetchTrigger, peerTutorRole?.id ?? undefined);

  const handleCreatePeerTutor = () => {
    setIsCreateTutorDialogOpen(true);
  };

  const handleClickPeerTutorCard = (user: UserType) => {
    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    setRefetchTrigger(refetchTrigger + 1);
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search peer tutor..."
        />
        <Spacer />

        <TextButton color="#bd4f23" onClick={handleCreatePeerTutor}>
          <HStack gap={1}>
            <IoIosAddCircle color="#bd4f23" />
            Create new Peer Tutor
          </HStack>
        </TextButton>
      </HStack>

      <UserCardGrid
        searchTerm={searchTerm}
        users={peerTutors}
        loading={loading}
        error={error}
        onCardClick={handleClickPeerTutorCard}
      />

      {selectedUser && (
        <DisplayTutorDialog
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

      {isCreateTutorDialogOpen && (
        <CreateUserDialog
          open={isCreateTutorDialogOpen}
          setOpen={setIsCreateTutorDialogOpen}
          refetchTrigger={refetchTrigger}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}
    </Box>
  );
};

export default PeerTutorsTab;
