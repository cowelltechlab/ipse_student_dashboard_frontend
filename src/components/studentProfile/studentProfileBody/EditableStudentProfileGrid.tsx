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
import EditableProfileInfoBox from "./EditableProfileInfoBox";
import type { StudentProfileClassType } from "../../../types/ClassTypes";
import { useState } from "react";

interface EditableStudentProfileGridProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
}

const EditableStudentProfileGrid = ({
  student,
  profileLoading,
}: EditableStudentProfileGridProps) => {
  const [classes, setClasses] = useState<StudentProfileClassType[]>(
    student?.classes || []
  );
  const [strengths, setStrengths] = useState<string[]>(
    student?.strengths || []
  );
  const [weaknesses, setWeaknesses] = useState<string[]>(
    student?.challenges || []
  );
  const [longTermGoals, setLongTermGoals] = useState<string>(
    student?.long_term_goals || ""
  );
  const [shortTermGoals, setShortTermGoals] = useState<string>(
    student?.short_term_goals || ""
  );
  const [bestWaysToHelp, setBestWaysToHelp] = useState<string[]>(
    student?.best_ways_to_help || []
  );
  const [hobbies, setHobbies] = useState<string>(student?.hobbies_and_interests || "");

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      templateRows="auto repeat(3, 1fr)"
      gap={4}
      mt={6}
    >
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <ProfileInfoBox
          title="Classes & Learning Goals"
          titleIcon={studyingIcon}
        >
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
        <EditableProfileInfoBox
          title="What I am good at"
          titleIcon={strengthsIcon}
          value={strengths}
          onChange={() => setStrengths}
        />
      </GridItem>

      <GridItem display="flex">
        <EditableProfileInfoBox
          title="Things that are hard for me"
          titleIcon={challengesIcon}
          value={weaknesses}
          onChange={() => setWeaknesses}
        />
      </GridItem>

      <GridItem display="flex">
        <EditableProfileInfoBox
          title="After college I want to"
          titleIcon={longTermGoalsIcon}
          value={longTermGoals}
          onChange={() => setLongTermGoals}
        />
      </GridItem>

      <GridItem display="flex">
        <EditableProfileInfoBox
          title="Currently I want to"
          titleIcon={workinOnIcon}
          value={shortTermGoals}
          onChange={() => setShortTermGoals}
        />
      </GridItem>

      <GridItem display="flex">
        <EditableProfileInfoBox
          title="Best way to assist me"
          titleIcon={bestWaysIcon}
          value={bestWaysToHelp}
          onChange={() => setBestWaysToHelp}
        />
      </GridItem>

      <GridItem display="flex">
        <EditableProfileInfoBox
          title="Things I enjoy doing for fun"
          titleIcon={hobbiesIcon}
          value={hobbies}
          onChange={() => setHobbies}
        />
      </GridItem>
    </Grid>
  );
};

export default EditableStudentProfileGrid;
