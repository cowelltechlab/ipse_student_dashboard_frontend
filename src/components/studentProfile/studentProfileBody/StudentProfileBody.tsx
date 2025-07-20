import { Box } from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";
import ProfileUpdateOptions from "./ProfileUpdateOptions";
import { useState } from "react";
import StudentProfileGrid from "./StudentProfileGrid";
import EditableStudentProfileGrid from "./EditableStudentProfileGrid";
import DeleteUserDialog from "../../homeDashboard/homeTabs/DeleteUserDialog";
import SemesterUpdateDialog from "./SemesterUpdateDialog";

interface StudentProfileBodyProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

const StudentProfileBody = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentProfileBodyProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isSemesterUpdateDialogOpen, setIsSemesterUpdateDialogOpen] =
    useState<boolean>(false);

  return (
    <Box>
      <ProfileUpdateOptions
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isSemesterUpdateDialogOpen={isSemesterUpdateDialogOpen}
        setIsSemesterUpdateDialogOpen={setIsSemesterUpdateDialogOpen}
      />
      {isUpdating ? (
        <EditableStudentProfileGrid
          student={student}
          setIsEditing={setIsUpdating}
          triggerRefetch={triggerRefetch}
        />
      ) : (
        <StudentProfileGrid student={student} profileLoading={profileLoading} />
      )}

      {student?.user_id && (
        <DeleteUserDialog
          userId={student.user_id}
          userFirstName={student.first_name}
          userLastName={student.last_name}
          userGTEmail={student.gt_email}
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
        />
      )}

      {student?.user_id && (
        <SemesterUpdateDialog
          userId={student.user_id}
          open={isSemesterUpdateDialogOpen}
          setOpen={setIsSemesterUpdateDialogOpen}
        />
      )}
    </Box>
  );
};

export default StudentProfileBody;
