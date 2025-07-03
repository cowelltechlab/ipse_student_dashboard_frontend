import {
  Box,
  Separator,
  Flex
} from "@chakra-ui/react";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg"
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
import UploadAssignmentBox from "../components/createNewAssignment/UploadAssignmentBox";
import DocumentForm from "../components/createNewAssignment/DocumentForm";
import SelectStudentsSection from "../components/createNewAssignment/SelectStudentsSection";
import SubmitForm from "../components/createNewAssignment/SubmitForm";

const CreateNewAssignment = () => {
  const cardText = `Create an assignment that adapts and grows to support every
                     student's needs. Let's make learning accessible for all!`;

  return (
    <Box margin={"5%"}>
      <PageHeader />
      <HeaderCard 
        cardHeading="Create Assignment" 
        cardText={cardText} 
        cardImageUrl={CreateNewAssignmentIcon}
      />

      <Separator variant="solid" mx={6}/>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={8}
        p={6}
        mx="auto"
        // maxWidth="1200px"
        // mt={8}
      >
        <UploadAssignmentBox />
        <DocumentForm />
        
      </Flex>
      <Flex
        p={6}
      >
        <SelectStudentsSection />
      </Flex>

      <Flex>
        <SubmitForm />
      </Flex>

      {/* <HomeContent /> */}
    </Box>
  );
};

export default CreateNewAssignment;