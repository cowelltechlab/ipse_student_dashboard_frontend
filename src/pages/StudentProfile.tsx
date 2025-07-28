import { Box, Skeleton } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import { useParams } from "react-router-dom";
import useStudent from "../hooks/students/useStudent";
import { useState } from "react";
import StudentProfilePageContent from "../components/studentProfile/StudentProfilePageContent";

const StudentProfile = () => {
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const { student_id } = useParams<{ student_id: string }>();
  const { student, loading } = useStudent(student_id, refetchTrigger);

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
    { label: "Profile" },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <StudentProfilePageContent
        student={student}
        profileLoading={loading}
        triggerRefetch={() => setRefetchTrigger(refetchTrigger + 1)}
      />
    </Box>
  );
};

export default StudentProfile;
