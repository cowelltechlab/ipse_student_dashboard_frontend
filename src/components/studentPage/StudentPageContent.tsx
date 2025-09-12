import { Box, For, Heading, Separator } from "@chakra-ui/react";
import StudentPageCard from "./StudentPageCard";
import type { StudentProfileType } from "../../types/StudentTypes";

import studentIcon from "../../assets/icons/graduated.png";
import documentIcon from "../../assets/icons/documents.png";
import trophyIcon from "../../assets/icons/trophy.png";
import StudentProfileSubsection from "./StudentProfileSubsection";
import { useNavigate, useParams } from "react-router-dom";

interface StudentPageContentProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

export type StudentProfileSectionSelection = {
  headingName: string;
  subheading: string;
  icon: string;
  onClick: () => void;
};

const StudentPageContent = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentPageContentProps) => {
  const navigate = useNavigate();

  // Use the URL param 
  const { student_id: routeStudentId } = useParams<{ student_id: string }>();
  const studentId = routeStudentId ?? ""; // should always exist on /student/:student_id routes

  const sections: StudentProfileSectionSelection[] = [
    {
      headingName: "Profile",
      subheading: "View the full profile, make edits, and customize details.",
      icon: studentIcon,
      onClick: () => {
        if (!studentId) return; 
        navigate(`/student/${studentId}/profile`);
      },
    },
    {
      headingName: "Documents",
      subheading:
        "Access and reivew materials already uploaded for this student",
      icon: documentIcon,
      onClick: () => {
        if (!studentId) return;
        navigate(`/student/${studentId}/documents`);
      },
    },
    {
      headingName: "Achievements",
      subheading: "View your achievements!",
      icon: trophyIcon,
      onClick: () => {
        if (!studentId) return;
        navigate(`/student/${studentId}/achievements`);
      },
    },
  ];

  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Dashboard
      </Heading>
      <StudentPageCard
        student={student}
        profileLoading={profileLoading}
        triggerRefetch={triggerRefetch}
      />
      <Separator my={6} />
      <For each={sections}>
        {(item, index) => (
          <Box key={index} w={"100%"}>
            <StudentProfileSubsection section={item} />
          </Box>
        )}
      </For>
    </Box>
  );
};

export default StudentPageContent;
