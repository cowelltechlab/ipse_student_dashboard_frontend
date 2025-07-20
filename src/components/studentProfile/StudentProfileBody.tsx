import { Box } from "@chakra-ui/react";
import type { StudentProfileType } from "../../types/StudentTypes";
import ProfileUpdateOptions from "./studentProfileBody/ProfileUpdateOptions";
import { useState } from "react";
import StudentProfileGrid from "./studentProfileBody/StudentProfileGrid";

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

      <StudentProfileGrid
        student={student}
        profileLoading={profileLoading}
        triggerRefetch={triggerRefetch}
      />
    </Box>
  );
};

export default StudentProfileBody;
