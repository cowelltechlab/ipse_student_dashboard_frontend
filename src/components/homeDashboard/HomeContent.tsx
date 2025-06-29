import StudentsTab from "./studentsTab/StudentsTab";
import AssignmentsTab from "../homeDashboard/assignmentsTab/AssignmentsTab";
import AdvisorsTab from "./advisorsTab/AdvisorsTab";
import PeerTutorsTab from "./peerTutorsTab/PeerTutorsTab";

import { MdOutlineHandshake } from "react-icons/md";
import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuUser } from "react-icons/lu";
import { PiChalkboardTeacher } from "react-icons/pi";

const HomeContent = () => {
  return (
    <Tabs.Root defaultValue="students" variant={"line"}>
      <Tabs.List>
        <Tabs.Trigger value="students">
          <LuUser />
          Students
        </Tabs.Trigger>
        <Tabs.Trigger value="assignments">
          <LuFolder />
          Assignments
        </Tabs.Trigger>
        <Tabs.Trigger value="advisors">
          <MdOutlineHandshake />
          Advisors
        </Tabs.Trigger>
        <Tabs.Trigger value="peer-tutors">
          <PiChalkboardTeacher />
          Peer Tutors
        </Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="students">
        <StudentsTab />
      </Tabs.Content>
      <Tabs.Content value="assignments">
        <AssignmentsTab />
      </Tabs.Content>
      <Tabs.Content value="advisors">
        <AdvisorsTab />
      </Tabs.Content>
      <Tabs.Content value="peer-tutors">
        <PeerTutorsTab />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default HomeContent;
