import { Box } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/homeDashboard/HomeHeaderCard";
import HomeContent from "../components/homeDashboard/HomeContent";

const CreateNewAssignment = () => {
  return (
    <Box>
      <PageHeader />
      <HeaderCard />
      <HomeContent />
    </Box>
  );
};

export default CreateNewAssignment;