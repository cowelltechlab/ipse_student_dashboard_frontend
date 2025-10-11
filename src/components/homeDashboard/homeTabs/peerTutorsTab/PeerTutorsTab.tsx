import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../../common/searchBar/SearchBar";
import { useMemo, useState, useEffect } from "react";
import TextButton from "../../../common/universal/TextButton";
import useRoles from "../../../../hooks/roles/useRoles";
import useUsers, { invalidateUsersCache } from "../../../../hooks/users/useUsers";
import UserCardGrid from "../../../common/userCards/UserCardGrid";
import PeerTutorsTable from "./PeerTutorsTable";
import ViewToggle from "../../../common/universal/ViewToggle";
import type { TutoredStudent, UserType } from "../../../../types/UserTypes";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";
import DisplayTutorDialog from "./displayTutorDialog/DisplayTutorDialog";
import DeleteUserDialog from "../DeleteUserDialog";
import { IoIosAddCircle } from "react-icons/io";
import TutorYearButtons from "../../../common/filterButtons/TutorYearButtons";

const VIEW_MODE_STORAGE_KEY = "peerTutorsTabViewMode";

const PeerTutorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearName, setYearName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">(() => {
    const saved = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    return (saved as "card" | "table") || "card";
  });

  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const [isCreateTutorDialogOpen, setIsCreateTutorDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState<boolean>(false);

  const { roles } = useRoles();
  const peerTutorRole = roles.find((role) => role.role_name === "Peer Tutor");

  const { users: peerTutors, loading, error } = useUsers(refetchTrigger, peerTutorRole?.id ?? undefined);

  const roleId = peerTutorRole?.id;

  const refreshTutors = () => {
    invalidateUsersCache(roleId);
    setRefetchTrigger((v) => v + 1);
  };

  const handleCreatePeerTutor = () => setIsCreateTutorDialogOpen(true);

  const handleClickPeerTutorCard = (user: UserType) => {
    if (user.invite_url) {
      window.open(user.invite_url, "_blank");
      if (!user.is_active) return;
    }

    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    refreshTutors();
  };

  const displayedPeerTutors = useMemo(() => {
    const list = peerTutors ?? [];
    const target = (yearName ?? "").trim().toLowerCase();
    const byYear = target
      ? list.filter(
          (u) =>
            Array.isArray(u.tutored_students) &&
            u.tutored_students.some(
              (ts: TutoredStudent) => String(ts?.name ?? "").trim().toLowerCase() === target
            )
        )
      : list;

    const q = (searchTerm ?? "").trim().toLowerCase();
    if (!q) return byYear;

    return byYear.filter((u) => `${u.first_name} ${u.last_name}`.toLowerCase().includes(q));
  }, [peerTutors, yearName, searchTerm]);

  // Persist view mode to localStorage
  useEffect(() => {
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
  }, [viewMode]);

  return (
    <Box p={4} spaceY={4}>
      <HStack px={4}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search peer tutor..." />
        <Spacer />
        <TextButton color="#bd4f23" onClick={handleCreatePeerTutor}>
          <HStack gap={1}>
            <IoIosAddCircle color="#bd4f23" />
            Create new Peer Tutor
          </HStack>
        </TextButton>
      </HStack>

      <HStack px={4}>
        <TutorYearButtons selectedYear={yearName} onYearChange={setYearName} />
        <Spacer />
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </HStack>

      {viewMode === "card" ? (
        <UserCardGrid
          searchTerm={searchTerm}
          users={displayedPeerTutors}
          loading={loading}
          error={error}
          onCardClick={handleClickPeerTutorCard}
        />
      ) : (
        <PeerTutorsTable
          searchTerm={searchTerm}
          users={displayedPeerTutors}
          loading={loading}
          error={error}
          onCardClick={handleClickPeerTutorCard}
        />
      )}

      {selectedUser && (
        <DisplayTutorDialog
          user={selectedUser}
          open={isProfileDialogOpen}
          setOpen={setIsProfileDialogOpen}
          setOpenDeleteDialog={setIsDeleteDialogOpen}
          onUpdated={refreshTutors}  
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
          onDeleted={refreshTutors}    
        />
      )}

      {isCreateTutorDialogOpen && (
        <CreateUserDialog
          open={isCreateTutorDialogOpen}
          setOpen={setIsCreateTutorDialogOpen}
          refetchTrigger={refetchTrigger}
          setRefetchTrigger={setRefetchTrigger}
          onCreated={refreshTutors}   
        />
      )}
    </Box>
  );
};

export default PeerTutorsTab;
