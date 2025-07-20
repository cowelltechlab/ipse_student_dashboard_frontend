import { For, Grid, GridItem } from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";
import ProfileInfoBox from "./ProfileInfoBox"; // adjust path as needed
import StudentProfileClassBox from "./StudentProfileClassBox";

import studyingIcon from "../../../assets/icons/study.png";
import strengthsIcon from "../../../assets/icons/like.png";
import longTermGoalsIcon from "../../../assets/icons/businessman.png";
import bestWaysIcon from "../../../assets/icons/handshake.png";
import challengesIcon from "../../../assets/icons/mountain.png";
import workinOnIcon from "../../../assets/icons/sprout.png";
import hobbiesIcon from "../../../assets/icons/extracurricular-activities.png";

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
        <ProfileInfoBox title="Classes & Learning Goals" titleIcon={studyingIcon}>
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
          titleIcon={strengthsIcon}
          content={student?.strengths}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Things that are hard for me"
          titleIcon={challengesIcon}
          content={student?.challenges}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="After college I want to"
          titleIcon={longTermGoalsIcon}
          content={student?.long_term_goals}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Currently I want to"
          titleIcon={workinOnIcon}
          content={student?.short_term_goals}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Best way to assist me"
          titleIcon={bestWaysIcon}
          content={student?.best_ways_to_help}
          loading={profileLoading}
        />
      </GridItem>

      <GridItem display="flex">
        <ProfileInfoBox
          title="Things I enjoy doing for fun"
          titleIcon={hobbiesIcon}
          content={student?.hobbies_and_interests}
          loading={profileLoading}
        />
      </GridItem>
    </Grid>
  );
};

export default StudentProfileGrid;
