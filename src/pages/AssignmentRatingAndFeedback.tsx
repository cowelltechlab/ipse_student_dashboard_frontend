import { Box, Skeleton } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";

import { useParams } from "react-router-dom";
import useStudent from "../hooks/students/useStudent";
import useAssignment from "../hooks/assignments/useAssignment";
import HeaderCard from "../components/common/pageHeader/HeaderCard";

import HeaderCardImage from "../assets/Student Profile_Document_No change summary.svg";
import RatingAndFeedbackBody from "../components/ratingsAndFeedback/RatingAndFeedbackBody";

const AssignmentRatingAndFeedback = () => {
  const { student_id, assignment_id, assignment_version_id } = useParams<{
    student_id: string;
    assignment_id: string;
    assignment_version_id: string;
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

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: nameLabel, href: `/student/${student_id}` },
    { label: "Documents", href: `/student/${student_id}/documents` },
    { label: assignmentLabel, href: `/student/${student_id}/documents` },
    { label: "Rating and Feedback" },
  ];

  return (
    <Box margin={2}>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <HeaderCard
        cardHeading="Assignment Rating & Feedback"
        cardText="Provide your feedback and rate the assignment based on various criteria to help improve future submissions."
        cardImageUrl={HeaderCardImage}
      />
      <RatingAndFeedbackBody
        assignment={assignment}
        assignmentLoading={AssignmentLoading}
        student={student}
        studentLoading={StudentLoading}
        assignmentVersionId={assignment_version_id || ""}
      />
    </Box>
  );
};

export default AssignmentRatingAndFeedback;
