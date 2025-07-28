import { Box, Skeleton } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import StudentDocumentsPageContent from "../components/studentDocuments/StudentDocumentsPageContent";
import { useParams } from "react-router-dom";
import useStudent from "../hooks/students/useStudent";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";

const StudentDocuments = () => {

  const { student_id } = useParams<{ student_id: string }>();
  const { student, loading } = useStudent(student_id);

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
    { label: "Documents" },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />

      <StudentDocumentsPageContent student={student} profileLoading={loading} />
    </Box>
  );
};

export default StudentDocuments