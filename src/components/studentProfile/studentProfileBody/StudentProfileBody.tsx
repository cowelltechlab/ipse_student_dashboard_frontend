import { Box } from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";
import ProfileUpdateOptions from "./ProfileUpdateOptions";
import { useState } from "react";
import StudentProfileGrid from "./StudentProfileGrid";
import EditableStudentProfileGrid from "./EditableStudentProfileGrid";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <Box>
      <ProfileUpdateOptions
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
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
    </Box>
  );
};

export default StudentProfileBody;
