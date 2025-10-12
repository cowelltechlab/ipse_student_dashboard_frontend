import { Box, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/common/pageHeader/PageHeader";
import useStudent from "../hooks/students/useStudent";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import useAssignment from "../hooks/assignments/useAssignment";
import AssignmentVersionDetailsPageContent from "../components/assignmentVersionDetails/AssignmentVersionDetailsPageContent";

const AssignmentVersionDetails = () => {
  const { student_id, assignment_id, version_document_id } = useParams<{
    student_id: string;
    assignment_id: string;
    version_document_id: string;
  }>();

  const { student, loading: StudentLoading } = useStudent(student_id);
  const { assignment, loading: AssignmentLoading } = useAssignment(
    Number(assignment_id)
  );

  let nameLabel;
  let assignmentLabel;

  if (!student_id) {
    nameLabel = "Student";
  } else if (StudentLoading) {
    nameLabel = <Skeleton height="20px" width="100px" />;
  } else {
    nameLabel =
      `${student?.first_name ?? ""} ${student?.last_name ?? ""}`.trim() ||
      "Student";
  }

  if (!assignment_id) {
    assignmentLabel = "Assignment";
  } else if (AssignmentLoading) {
    assignmentLabel = <Skeleton height="20px" width="100px" />;
  } else {
    assignmentLabel = `${assignment?.title ?? ""}`.trim() || "Assignment";
  }

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: nameLabel, href: `/student/${student_id}` },
    { label: "Documents", href: `/student/${student_id}/documents` },
    { label: assignmentLabel, href: `/student/${student_id}/assignment/${assignment_id}` },
    { label: "Version Details" },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <AssignmentVersionDetailsPageContent
        assignment={assignment}
        assignmentLoading={AssignmentLoading}
        studentId={student_id}
        assignmentId={assignment_id}
        versionDocumentId={version_document_id || null}
      />
    </Box>
  );
};

export default AssignmentVersionDetails;
