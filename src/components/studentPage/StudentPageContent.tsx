import { Box, Heading } from "@chakra-ui/react";
import StudentPageCard from "./StudentPageCard";

const StudentPageContent = () => {
  return (
    <Box p={4}>
      <Heading fontSize="3xl" mb={2}>
        Dashboard
      </Heading>
      <StudentPageCard />
    </Box>
  );
};

export default StudentPageContent;
