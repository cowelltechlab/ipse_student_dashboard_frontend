import { Box, Skeleton } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import StudentPageContent from "../components/studentPage/StudentPageContent";
import useStudent from "../hooks/students/useStudent";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Student = () => {
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
    { label: nameLabel },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <StudentPageContent
        student={student}
        profileLoading={loading}
        triggerRefetch={() => setRefetchTrigger(refetchTrigger + 1)}
      />
    </Box>
  );
};

export default Student;
