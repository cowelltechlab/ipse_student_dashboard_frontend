import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuUser } from "react-icons/lu";
import StudentsTab from "./studentsTab/StudentsTab";
import AssignmentsTab from "../homeDashboard/assignmentsTab/AssignmentsTab";

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
          View Assignments
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="students"><StudentsTab/></Tabs.Content>
      <Tabs.Content value="assignments"><AssignmentsTab /></Tabs.Content>
    </Tabs.Root>
  );
};

export default HomeContent;
