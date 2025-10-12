import { Box, Separator, Text, Alert } from "@chakra-ui/react";
import BulkDownloadSection from "./BulkDownloadSection";
import StudentExportSection from "./StudentExportSection";
import { FaInfoCircle } from "react-icons/fa";

const DownloadCenterTab = () => {
  return (
    <Box p={6}>
      <Alert.Root status="info" mb={6}>
        <Alert.Indicator>
          <FaInfoCircle />
        </Alert.Indicator>
        <Box>
          <Alert.Title>Download Center</Alert.Title>
          <Alert.Description>
            <Text>
              Export student data in various formats. Bulk exports download all
              student profiles, while individual exports allow you to select a
              specific student and download their assignments and complete data.
            </Text>
          </Alert.Description>
        </Box>
      </Alert.Root>

      <BulkDownloadSection />

      <Separator my={8} />

      <StudentExportSection />
    </Box>
  );
};

export default DownloadCenterTab;
