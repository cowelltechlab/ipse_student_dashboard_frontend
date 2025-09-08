import StudentsTab from "./homeTabs/studentsTab/StudentsTab";
import AssignmentsTab from "./homeTabs/assignmentsTab/AssignmentsTab";
import AdvisorsTab from "./homeTabs/advisorsTab/AdvisorsTab";
import PeerTutorsTab from "./homeTabs/peerTutorsTab/PeerTutorsTab";

import { Tabs } from "@chakra-ui/react";
import useAuth from "../../contexts/useAuth";

const HomeContent = () => {
  const { roles } = useAuth();

  return (
    <Tabs.Root defaultValue="students" variant={"line"} mt={10}>
      <Tabs.List>
        <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="students">
          Students
        </Tabs.Trigger>
        <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="assignments">
          Assignments
        </Tabs.Trigger>
        {(roles.includes("Admin") || roles.includes("Advisor")) && (
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="advisors">
            Advisors
          </Tabs.Trigger>
        )}

        {(roles.includes("Admin") || roles.includes("Advisor")) && (
          <Tabs.Trigger _selected={{ fontWeight: "bold" }} value="peer-tutors">
            Peer Tutors
          </Tabs.Trigger>
        )}
      </Tabs.List>

      <Tabs.Content value="students">
        <StudentsTab />
      </Tabs.Content>
      <Tabs.Content value="assignments">
        <AssignmentsTab />
      </Tabs.Content>
      {(roles.includes("Admin") || roles.includes("Advisor")) && (
        <Tabs.Content value="advisors">
          <AdvisorsTab />
        </Tabs.Content>
      )}
      {(roles.includes("Admin") || roles.includes("Advisor")) && (
        <Tabs.Content value="peer-tutors">
          <PeerTutorsTab />
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
};

export default HomeContent;
