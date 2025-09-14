import { Box, Skeleton } from "@chakra-ui/react";
import useStudent from "../hooks/students/useStudent";
import { useParams } from "react-router-dom";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import StudentAchievementsPageContent from "../components/studentAchievements/StudentAchievementsPageContent";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const StudentAchievements = () => {
  const { student_id } = useParams<{ student_id: string }>();
  const { student, loading } = useStudent(student_id);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  if (!student_id) return <Navigate to="/dashboard" replace />;

  let nameLabel;

  if (!student_id) {
    nameLabel = "Student";
  } else if (loading) {
    nameLabel = <Skeleton height="20px" width="100px" />;
  } else {
    nameLabel =
      `${student?.first_name ?? ""} ${student?.last_name ?? ""}`.trim() ||
      "Student";
  }

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: nameLabel, href: `/student/${student_id}` },
    { label: "Achievements" },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <StudentAchievementsPageContent
        student={student}
        profileLoading={loading}
        triggerRefetch={() => {
          setRefetchTrigger(refetchTrigger + 1);
        }}
      />
    </Box>
  );
};

export default StudentAchievements;
