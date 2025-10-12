import StudentsTab from "./homeTabs/studentsTab/StudentsTab";
import AssignmentsTab from "./homeTabs/assignmentsTab/AssignmentsTab";
import AdvisorsTab from "./homeTabs/advisorsTab/AdvisorsTab";
import PeerTutorsTab from "./homeTabs/peerTutorsTab/PeerTutorsTab";
import StudentVersionsTab from "./homeTabs/studentVersionsTab/StudentVersionsTab";
import AdminTab from "./homeTabs/adminTab/AdminTab";
import DownloadCenterTab from "../downloadCenter/DownloadCenterTab";

import { Spacer, Tabs, Box } from "@chakra-ui/react";
import useAuth from "../../contexts/useAuth";

const HomeContent = () => {
  const { roles } = useAuth();
  const isAdmin = roles.includes("Admin");
  const isAdvisor = roles.includes("Advisor");

  return (
    <Tabs.Root defaultValue="students" variant="line" mt={10}>
      <Box
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#244D8A",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f0f0f0",
          },
        }}
      >
        <Tabs.List
          p={3}
          mx={5}
          minW="max-content"
          flexWrap={{ base: "nowrap", md: "wrap" }}
        >
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="students">
            Students
          </Tabs.Trigger>

          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="assignments">
            Assignments
          </Tabs.Trigger>

          {isAdmin && (
            <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="advisors">
              Advisors
            </Tabs.Trigger>
          )}

          {(isAdmin || isAdvisor) && (
            <Tabs.Trigger
              _selected={{ fontWeight: "bold" }}
              value="peer-tutors"
            >
              Peer Tutors
            </Tabs.Trigger>
          )}

          <Spacer />

          {isAdmin && (
            <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="admin">
              Administrators
            </Tabs.Trigger>
          )}

          {isAdmin && (
            <Tabs.Trigger
              _selected={{ fontWeight: "bold" }}
              value="student-groups"
            >
              Student Groups
            </Tabs.Trigger>
          )}

            {isAdmin && (
            <Tabs.Trigger
              _selected={{ fontWeight: "bold" }}
              value="download-center"
            >
              Download Center
            </Tabs.Trigger>
          )}
        </Tabs.List>
      </Box>

      <Tabs.Content value="students">
        <StudentsTab />
      </Tabs.Content>

      {isAdmin && (
        <Tabs.Content value="student-groups">
          <StudentVersionsTab />
        </Tabs.Content>
      )}

      <Tabs.Content value="assignments">
        <AssignmentsTab />
      </Tabs.Content>

      {isAdmin && (
        <Tabs.Content value="advisors">
          <AdvisorsTab />
        </Tabs.Content>
      )}

      {(isAdmin || isAdvisor) && (
        <Tabs.Content value="peer-tutors">
          <PeerTutorsTab />
        </Tabs.Content>
      )}

      {isAdmin && (
        <Tabs.Content value="admin">
          <AdminTab />
        </Tabs.Content>
      )}

      {isAdmin && (
        <Tabs.Content value="download-center">
          <DownloadCenterTab />
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
};

export default HomeContent;
