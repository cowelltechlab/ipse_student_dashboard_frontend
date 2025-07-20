import { Button, Icon, Spacer, Stack } from "@chakra-ui/react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import useAuth from "../../../contexts/useAuth";

interface ProfileUpdateOptionsProps {
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;

  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isDeleting: boolean) => void;
}

const ProfileUpdateOptions = ({
  isUpdating,
  setIsUpdating,

  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: ProfileUpdateOptionsProps) => {
  const { roles } = useAuth();

  return (
    <Stack mt={6} direction={{ base: "column", md: "row" }}>
      <Button
        onClick={() => setIsUpdating(!isUpdating)}
        borderColor="#BD4F23"
        fontWeight={"bold"}
        borderRadius={"lg"}
        bg={isUpdating ? "#F2C5B5" : "none"}
        color={"#BD4F23"}
        _hover={{
          bg: "#BD4F23",
          borderColor: "#BD4F23",
          color: "white",
        }}
      >
        Edit Profile <Icon as={FaEdit} />
      </Button>
      {(roles.includes("Admin") || roles.includes("Advisor")) && (
        <Button
          onClick={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
          borderColor="#BD4F23"
          borderRadius={"lg"}
          fontWeight={"bold"}
          bg={"none"}
          color="#BD4F23"
          _hover={{
            bg: "#BD4F23",
            borderColor: "#BD4F23",
            color: "white",
          }}
        >
          Delete Profile <Icon as={FaTrashAlt} />
        </Button>
      )}
      <Spacer />
      <Button
        borderColor="#BD4F23"
        bg={"none"}
        borderRadius={"lg"}
        fontWeight={"bold"}
        color="#BD4F23"
        _hover={{
          bg: "#BD4F23",
          borderColor: "#BD4F23",
          color: "white",
        }}
      >
        Semester Update <Icon as={LuFileSpreadsheet} />
      </Button>
    </Stack>
  );
};

export default ProfileUpdateOptions;
