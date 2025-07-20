import {
  For,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";
import ProfileInfoBox from "./ProfileInfoBox"; // adjust path as needed
import StudentProfileClassBox from "./StudentProfileClassBox";

interface StudentProfileGridProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  triggerRefetch: () => void;
}

const StudentProfileGrid = ({
  student,
  profileLoading,
  triggerRefetch,
}: StudentProfileGridProps) => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      templateRows="auto repeat(3, 1fr)"
      gap={4}
      mt={6}
    >
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <ProfileInfoBox title="Classes & Learning Goals">
          <For each={student?.classes}>
            {(studentClass, index) => (
              <StudentProfileClassBox
                studentClass={studentClass}
                index={index}
              />
            )}
          </For>
        </ProfileInfoBox>
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="What I am good at"
          content={student?.strengths}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Things that are hard for me"
          content={student?.challenges}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="After college I want to"
          content={student?.long_term_goals}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Currently I want to"
          content={student?.short_term_goals}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Best way to assist me"
          content={student?.best_ways_to_help}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Things I enjoy doing for fun"
          content={student?.hobbies_and_interests}
          loading={profileLoading}
        />
      </GridItem>
    </Grid>
  );
};

export default StudentProfileGrid;
