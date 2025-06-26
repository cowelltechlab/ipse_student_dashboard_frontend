import { Box } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import BreadcrumbNav from "../components/common/breadcrumb/BreadcrumbNav";
import StudentPageContent from "../components/studentPage/StudentPageContent";

const Student = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Student" }, // Automatically rendered as current
  ];

  return (
    <Box>
      <PageHeader />
      <BreadcrumbNav items={breadcrumbItems} />
      <StudentPageContent />
    </Box>
  );
};

export default Student;
