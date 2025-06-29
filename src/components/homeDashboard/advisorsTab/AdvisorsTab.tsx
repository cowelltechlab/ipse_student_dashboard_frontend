import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../common/searchBar/SearchBar";
import { useState } from "react";
import TextButton from "../../common/universal/TextButton";
import { CiCirclePlus } from "react-icons/ci";
import UserCardGrid from "../../common/userCards/UserCardGrid";
import useRoles from "../../../hooks/roles/useRoles";
import useUsers from "../../../hooks/users/useUsers";

const AdvisorsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { roles } = useRoles();

  const advisorRole = roles.find((role) => role.role_name === "Advisor");

  const { users: advisors, loading, error } = useUsers(advisorRole?.id || null);

  const handleCreateAdvisor = () => {
    // TODO: Open a modal or navigate to a create advisor page
    console.log("Create new advisor clicked");
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
      />
    </Box>
  );
};

export default AdvisorsTab;
