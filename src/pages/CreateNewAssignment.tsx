import { Box } from "@chakra-ui/react";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg"
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
import HomeContent from "../components/homeDashboard/HomeContent";

const CreateNewAssignment = () => {
  const cardText = `Create an assignment that adapts and grows to support every
                     student's needs. Let's make learning accessible for all!`;
  return (
    <Box>
      <PageHeader />
      <HeaderCard 
        cardHeading="Create Assignment" 
        cardText={cardText} 
        cardImageUrl={CreateNewAssignmentIcon}
      />
      <HomeContent />
    </Box>
  );
};

export default CreateNewAssignment;