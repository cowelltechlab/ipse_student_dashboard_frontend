import { Box } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/teacherDashboard/HeaderCard";
import TeacherHomeContent from "../components/teacherDashboard/TeacherHomeContent";

const TeacherHome = () => {
  return (
    <Box>
      <PageHeader />
      <HeaderCard />
      <TeacherHomeContent />
    </Box>
  );
};

export default TeacherHome;
