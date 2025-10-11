import { Box, HStack, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import SearchBar from "../../../common/searchBar/SearchBar";
import UserCardGrid from "../../../common/userCards/UserCardGrid";

import useRoles from "../../../../hooks/roles/useRoles";
import useUsers from "../../../../hooks/users/useUsers";
import type { UserType } from "../../../../types/UserTypes";

import DisplayAdminDialog from "./DisplayAdminDialog";
import DeleteUserDialog from "../DeleteUserDialog";
import TextButton from "../../../common/universal/TextButton";
import { IoIosAddCircle } from "react-icons/io";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";
import AdminPasswordResetModal from "../PasswordResetDialog";
import EmailUpdateModal from "../../../common/user/EmailUpdateModal";

const AdminTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const [isCreateAdminDialogOpen, setIsCreateAdminDialogOpen] =
    useState<boolean>(false);

  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState<boolean>(false);
  const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] =
    useState<boolean>(false);

  // Find the Admin role id
  const { roles, loading: rolesLoading } = useRoles();
  const adminRole = roles.find((r) => r.role_name === "Admin");

  // Fetch only admins
  const { users, loading, error } = useUsers(
    refetchTrigger,
    adminRole?.id ?? undefined
  );

  const handleCreateAdmin = () => {
    setIsCreateAdminDialogOpen(true);
  };

  const handleCardClick = (user: UserType) => {
    if (user.invite_url) {
      window.open(user.invite_url, "_blank");
      if (!user.is_active) return;
    }

    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    setIsDeleteDialogOpen(false);
    setRefetchTrigger((v) => v + 1);
  };

  const handleOpenResetPasswordModal = () => {
    console.log("Opening Password Reset Modal");
    setIsPasswordResetModalOpen(true);
  };

  const handleOpenEmailEditModal = () => {
    setIsUpdateEmailModalOpen(true);
  };

  // Update selectedUser when users array changes (after refetch)
  useEffect(() => {
    if (selectedUser && users.length > 0) {
      const updatedUser = users.find((u) => u.id === selectedUser.id);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  }, [users, selectedUser]);

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Admins..."
        />
        <Spacer />

        <TextButton color="#bd4f23" onClick={handleCreateAdmin}>
          <HStack gap={1}>
            <IoIosAddCircle color="#bd4f23" />
            Create new Admin
          </HStack>
        </TextButton>
      </HStack>

      <UserCardGrid
        searchTerm={searchTerm}
        users={users}
        loading={rolesLoading || loading}
        error={error}
        onCardClick={handleCardClick}
      />

      {selectedUser && (
        <DisplayAdminDialog
          user={selectedUser}
          open={isProfileDialogOpen}
          setOpen={setIsProfileDialogOpen}
          setOpenDeleteDialog={setIsDeleteDialogOpen}
          handleOpenResetPasswordModal={handleOpenResetPasswordModal}
          handleOpenEmailEditModal={handleOpenEmailEditModal}
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
          handleDelete={handleDeleteConfirmed}
        />
      )}

      {isCreateAdminDialogOpen && (
        <CreateUserDialog
          open={isCreateAdminDialogOpen}
          setOpen={setIsCreateAdminDialogOpen}
          refetchTrigger={refetchTrigger}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}

      {isPasswordResetModalOpen && (
        <AdminPasswordResetModal
          open={isPasswordResetModalOpen}
          setOpen={setIsPasswordResetModalOpen}
          user={selectedUser}
          onPasswordReset={() => {}}
        />
      )}

      {isUpdateEmailModalOpen && (
        <EmailUpdateModal
          open={isUpdateEmailModalOpen}
          setOpen={setIsUpdateEmailModalOpen}
          user={selectedUser}
          onUpdate={() => setRefetchTrigger(refetchTrigger + 1)}
        />
      )}
    </Box>
  );
};

export default AdminTab;
