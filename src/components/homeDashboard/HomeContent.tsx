import StudentsTab from "./homeTabs/studentsTab/StudentsTab";
import AssignmentsTab from "./homeTabs/assignmentsTab/AssignmentsTab";
import AdvisorsTab from "./homeTabs/advisorsTab/AdvisorsTab";
import PeerTutorsTab from "./homeTabs/peerTutorsTab/PeerTutorsTab";
import StudentVersionsTab from "./homeTabs/studentVersionsTab/StudentVersionsTab";
import AdminTab from "./homeTabs/adminTab/AdminTab";

import { Spacer, Tabs } from "@chakra-ui/react";
import useAuth from "../../contexts/useAuth";

const HomeContent = () => {
  const { roles } = useAuth();
  const isAdmin = roles.includes("Admin");

  return (
    <Tabs.Root defaultValue="students" variant="line" mt={10}>
      <Tabs.List p={3} mx={5}>
        <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="students">
          Students
        </Tabs.Trigger>

        {isAdmin && (
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="student-groups">
            Student Groups
          </Tabs.Trigger>
        )}

        <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="assignments">
          Assignments
        </Tabs.Trigger>

        {(isAdmin || roles.includes("Advisor")) && (
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="advisors">
            Advisors
          </Tabs.Trigger>
        )}

        {(isAdmin || roles.includes("Advisor")) && (
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="peer-tutors">
            Peer Tutors
          </Tabs.Trigger>
        )}

        <Spacer/>

        {isAdmin && (
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="admin">
            Administrators
          </Tabs.Trigger>
        )}
      </Tabs.List>

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

      {(isAdmin || roles.includes("Advisor")) && (
        <Tabs.Content value="advisors">
          <AdvisorsTab />
        </Tabs.Content>
      )}

      {(isAdmin || roles.includes("Advisor")) && (
        <Tabs.Content value="peer-tutors">
          <PeerTutorsTab />
        </Tabs.Content>
      )}

      {isAdmin && (
        <Tabs.Content value="admin">
          <AdminTab />
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
};

export default HomeContent;
