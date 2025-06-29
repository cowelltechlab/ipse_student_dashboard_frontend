import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../common/searchBar/SearchBar";
import { useState } from "react";
import TextButton from "../../common/universal/TextButton";
import { CiCirclePlus } from "react-icons/ci";
import useRoles from "../../../hooks/roles/useRoles";
import useUsers from "../../../hooks/users/useUsers";
import UserCardGrid from "../../common/userCards/UserCardGrid";

const PeerTutorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { roles } = useRoles();

  const peerTutorRole = roles.find((role) => role.role_name === "Peer Tutor");

  const { users: peerTutors, loading, error } = useUsers(peerTutorRole?.id ?? undefined);

  const handleCreatePeerTutor = () => {
    // TODO: Open a modal or navigate to a create peer tutor page
    console.log("Create new peer tutor clicked");
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

        <TextButton onClick={handleCreatePeerTutor}>
          <HStack gap={1}>
            <CiCirclePlus color="#bd4f23" />
            Create new Peer Tutor
          </HStack>
        </TextButton>
      </HStack>

      <UserCardGrid
        searchTerm={searchTerm}
        users={peerTutors}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default PeerTutorsTab;
