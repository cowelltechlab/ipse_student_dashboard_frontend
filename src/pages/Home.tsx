import { Box } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/homeDashboard/HeaderCard";
import HomeContent from "../components/homeDashboard/HomeContent";

const Home = () => {
  return (
    <Box>
      <PageHeader />
      <HeaderCard />
      <HomeContent />
    </Box>
  );
};

export default Home;
