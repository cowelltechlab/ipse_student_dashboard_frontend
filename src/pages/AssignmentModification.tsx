import { Box, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/common/pageHeader/PageHeader";
import { useState } from "react";
import useStudent from "../hooks/students/useStudent";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import useAssignment from "../hooks/assignments/useAssignment";
import AssignmentModificationPageContent from "../components/assignmentModification/AssignmentModificationPageContent";

const AssignmentModifications = () => {
  const { student_id, assignment_id } = useParams<{
    student_id: string;
    assignment_id: string;
  }>();

  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  const { student, loading: StudentLoading } = useStudent(
    student_id,
    refetchTrigger
  );
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
    { label: assignmentLabel, href: `/student/${student_id}/documents` },
    { label: "Modification" },
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <AssignmentModificationPageContent
        student={student}
        assignment={assignment}
        profileLoading={StudentLoading}
        assignmentLoading={AssignmentLoading}
        triggerRefetch={() => {
          setRefetchTrigger(refetchTrigger + 1);
        }}
      />
    </Box>
  );
};

export default AssignmentModifications;
