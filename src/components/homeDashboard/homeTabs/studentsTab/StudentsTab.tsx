import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../../common/searchBar/SearchBar";
import { useState } from "react";
import StudentCardGrid from "./studentCards.tsx/StudentCardGrid";
import TextButton from "../../../common/universal/TextButton";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import StudentYearButtons from "../../../common/filterButtons/StudentYearButtons";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";
import useRoles from "../../../../hooks/roles/useRoles";
import useUsers from "../../../../hooks/users/useUsers";

const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearName, setYearName] = useState<string | null>(null);

  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { roles } = useRoles();

  const studentRole = roles.find((role) => role.role_name === "Student");

  const {
    users: students,
    loading,
    error,
  } = useUsers(refetchTrigger, studentRole?.id ?? undefined);

  const handleCreateStudent = () => {
    setIsCreateStudentDialogOpen(true);
  };

  const handleNavigateStudentPage = (studentId: number | null) => {
    if (studentId) navigate(`/student/${studentId}`);

    else console.log("Launch profile creation dialog")
  };

  return (
    <Box p={4} spaceY={4}>
      <HStack>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search student..."
          
        />
        <Spacer />

        <TextButton onClick={handleCreateStudent}>
          <HStack gap={1}>
            <CiCirclePlus color="#bd4f23" />
            Create new Student
          </HStack>
        </TextButton>
      </HStack>

      <StudentYearButtons
        selectedYear={yearName}
        onYearChange={(selectedYearId: string | null) =>
          setYearName(selectedYearId)
        }
      />

      <StudentCardGrid
        students={students}
        loading = {loading}
        error = {error}

        searchTerm={searchTerm}
        yearName={yearName}

        onStudentClick={handleNavigateStudentPage}
      />

      {isCreateStudentDialogOpen && (
        <CreateUserDialog
          open={isCreateStudentDialogOpen}
          setOpen={setIsCreateStudentDialogOpen}
          refetchTrigger={refetchTrigger}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}
    </Box>
  );
};

export default StudentsTab;
