import { Box } from "@chakra-ui/react";
import PageHeader from "../components/common/pageHeader/PageHeader";
import ProfileCreationHeaderCard from "../components/profileCreation/ProfileCreationHeaderCard";
import ProfileCreationContent from "../components/profileCreation/ProfileCreationContent";

const StudentProfileCreation = () => {
  return (
    <Box>
      <PageHeader />
      <ProfileCreationHeaderCard />
      <ProfileCreationContent />
    </Box>
  );
};

export default StudentProfileCreation;
