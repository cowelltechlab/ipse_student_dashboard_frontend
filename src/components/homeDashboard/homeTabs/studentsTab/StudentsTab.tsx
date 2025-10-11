import { Box, HStack, Spacer } from "@chakra-ui/react";
import SearchBar from "../../../common/searchBar/SearchBar";
import { useState, useEffect } from "react";
import StudentCardGrid from "./studentCards.tsx/StudentCardGrid";
import StudentsTable from "./StudentsTable";
import ViewToggle from "../../../common/universal/ViewToggle";
import TextButton from "../../../common/universal/TextButton";
import { useNavigate } from "react-router-dom";
import StudentYearButtons from "../../../common/filterButtons/StudentYearButtons";
import CreateUserDialog from "../../createUserDialog/CreateUserDialog";
import useRoles from "../../../../hooks/roles/useRoles";
import useUsers from "../../../../hooks/users/useUsers";
import { IoIosAddCircle } from "react-icons/io";
import ProfileCreationDialog from "../../../profileCreation/ProfileCreationDialog";
import useAuth from "../../../../contexts/useAuth";

const VIEW_MODE_STORAGE_KEY = "studentsTabViewMode";

const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearName, setYearName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    return (saved as "card" | "table") || "card";
  });

  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const [isCreateStudentDialogOpen, setIsCreateStudentDialogOpen] =
    useState<boolean>(false);

  const [isCreateProfileDialogOpen, setIsCreateProfileDialogOpen] =
    useState<boolean>(false);
  const [profileCreateUserId, setProfileCreateUserId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const { roles } = useRoles();

  const { roles: currentUserRoles } = useAuth();

  const studentRole = roles.find((role) => role.role_name === "Student");

  const {
    users: students,
    loading,
    error,
  } = useUsers(refetchTrigger, studentRole?.id ?? undefined);

  const handleCreateStudent = () => {
    setIsCreateStudentDialogOpen(true);
  };

  const handleNavigateStudentPage = (
    studentId: number | null,
    userId: number,
    profileTag: string | null,
    userInviteUrl: string | null
  ) => {
    if (userInviteUrl) {
      // Open link
      window.open(userInviteUrl, "_blank");
      // navigate(userInviteUrl);
    }
    if (profileTag === "Profile Incomplete") {
      setProfileCreateUserId(userId);
      setIsCreateProfileDialogOpen(true);
    } else if (studentId) {
      navigate(`/student/${studentId}`);
    }
  };

  // Persist view mode to localStorage
  useEffect(() => {
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
  }, [viewMode]);

  return (
    <Box p={4} spaceY={4}>
      <HStack px={4}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search student..."
        />

        <Spacer />

        {(currentUserRoles.includes("Admin") ||
          currentUserRoles.includes("Advisor")) && (
          <TextButton color="#bd4f23" onClick={handleCreateStudent}>
            <HStack gap={1}>
              <IoIosAddCircle color="#bd4f23" />
              Create new Student
            </HStack>
          </TextButton>
        )}
      </HStack>
      <HStack px={4}>
        <StudentYearButtons
          selectedYear={yearName}
          onYearChange={(selectedYearId: string | null) =>
            setYearName(selectedYearId)
          }
        />

        <Spacer />

        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </HStack>

      {viewMode === "card" ? (
        <StudentCardGrid
          students={students}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          yearName={yearName}
          onStudentClick={handleNavigateStudentPage}
        />
      ) : (
        <StudentsTable
          students={students}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          yearName={yearName}
          onStudentClick={handleNavigateStudentPage}
        />
      )}

      {isCreateStudentDialogOpen && (
        <CreateUserDialog
          open={isCreateStudentDialogOpen}
          setOpen={setIsCreateStudentDialogOpen}
          refetchTrigger={refetchTrigger}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}

      {isCreateProfileDialogOpen && profileCreateUserId && (
        <ProfileCreationDialog
          open={isCreateProfileDialogOpen}
          setOpen={setIsCreateProfileDialogOpen}
          userId={profileCreateUserId}
        />
      )}
    </Box>
  );
};

export default StudentsTab;
