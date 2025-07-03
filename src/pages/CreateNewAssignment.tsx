import {
  Box,
  Separator,
  Flex,
  // VStack,
  // Text,
  // Fieldset,
  // Stack,
  // Field,
  // NativeSelect,
  // Input,
  // For,
  // RadioGroup,
  // Stack,
  // Icon
  // FormLabel,
  // Select,
  // option
} from "@chakra-ui/react";
// import { IoAddCircleSharp } from "react-icons/io5";
import CreateNewAssignmentIcon from "../assets/Create New Assignment.svg"
import PageHeader from "../components/common/pageHeader/PageHeader";
import HeaderCard from "../components/common/pageHeader/HeaderCard";
// import { FaChevronDown } from "react-icons/fa";
import UploadAssignmentBox from "../components/createNewAssignmentPage/UploadAssignmentBox";
import DocumentForm from "../components/createNewAssignmentPage/DocumentForm";
// import HomeContent from "../components/homeDashboard/HomeContent";

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

      <Separator variant="solid" />

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap={8}
        p={6}
        mx="auto"
        // maxWidth="1200px"
        mt={8}
      >
        <UploadAssignmentBox />
        <DocumentForm />
      </Flex>

      {/* <HomeContent /> */}
    </Box>
  );
};

export default CreateNewAssignment;