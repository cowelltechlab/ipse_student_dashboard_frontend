import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import type { StudentProfileType } from "../../../types/StudentTypes";
import ProfileInfoBox from "./ProfileInfoBox"; // adjust path as needed

import studyingIcon from "../../../assets/icons/study.png";
import strengthsIcon from "../../../assets/icons/like.png";
import longTermGoalsIcon from "../../../assets/icons/businessman.png";
import bestWaysIcon from "../../../assets/icons/handshake.png";
import challengesIcon from "../../../assets/icons/mountain.png";
import workinOnIcon from "../../../assets/icons/sprout.png";
import hobbiesIcon from "../../../assets/icons/extracurricular-activities.png";
import EditableProfileInfoBox from "./EditableProfileInfoBox";
import type {
  ClassSelectionType,
  StudentProfileClassType,
} from "../../../types/ClassTypes";
import { useEffect, useMemo, useState } from "react";
import StudentClassSelection from "../../profileCreation/profileCreationSteps/step1/ClassSelection";

import { FaCheckCircle } from "react-icons/fa";
import usePutStudentProfile from "../../../hooks/studentProfiles/usePutStudentProfile";
import { toaster } from "../../ui/toaster";

interface EditableStudentProfileGridProps {
  student: StudentProfileType | null;
  setIsEditing: (editing: boolean) => void;
  triggerRefetch: () => void;
}

const mapClassesToSelection = (
  classes?: StudentProfileClassType[]
): ClassSelectionType[] =>
  (classes || []).map(({ class_id, learning_goal }) => ({
    class_id,
    class_goal: learning_goal,
  }));

const EditableStudentProfileGrid = ({
  student,
  setIsEditing,
  triggerRefetch,
}: EditableStudentProfileGridProps) => {
  const initialState = useMemo(
    () => ({
      selectedClasses: mapClassesToSelection(student?.classes),
      strengths: student?.strengths || [],
      weaknesses: student?.challenges || [],
      longTermGoals: student?.long_term_goals || "",
      shortTermGoals: student?.short_term_goals || "",
      bestWaysToHelp: student?.best_ways_to_help || [],
      hobbies: student?.hobbies_and_interests || "",
    }),
    [student]
  );

  const [selectedClasses, setSelectedClasses] = useState<ClassSelectionType[]>(
    initialState.selectedClasses
  );
  const [strengths, setStrengths] = useState<string[]>(initialState.strengths);
  const [weaknesses, setWeaknesses] = useState<string[]>(
    initialState.weaknesses
  );
  const [longTermGoals, setLongTermGoals] = useState<string>(
    initialState.longTermGoals
  );
  const [shortTermGoals, setShortTermGoals] = useState<string>(
    initialState.shortTermGoals
  );
  const [bestWaysToHelp, setBestWaysToHelp] = useState<string[]>(
    initialState.bestWaysToHelp
  );
  const [hobbies, setHobbies] = useState<string>(initialState.hobbies);

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  const { loading: loadingPatchUpdate, handlePutStudentProfile } =
    usePutStudentProfile();

  const handleCancelChanges = () => {
    setSelectedClasses(initialState.selectedClasses);
    setStrengths(initialState.strengths);
    setWeaknesses(initialState.weaknesses);
    setLongTermGoals(initialState.longTermGoals);
    setShortTermGoals(initialState.shortTermGoals);
    setBestWaysToHelp(initialState.bestWaysToHelp);
    setHobbies(initialState.hobbies);

    // Switches back to display and away from edit
    setIsEditing(false);
  };

  const handleSaveUpdates = async () => {
    const updatePayload = {
      classes: selectedClasses,
      strengths,
      challenges: weaknesses,
      long_term_goals: longTermGoals,
      short_term_goals: shortTermGoals,
      best_ways_to_help: bestWaysToHelp,
      likes_and_hobbies: hobbies,
    };

    try {
      await handlePutStudentProfile(Number(student?.user_id), updatePayload);
      triggerRefetch();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toaster.create({
        description: `Error updating profile: ${error}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const isInvalid =
      longTermGoals.trim() === "" ||
      shortTermGoals.trim() === "" ||
      selectedClasses.length < 1 ||
      strengths.filter((s) => s.trim() !== "").length < 3 ||
      weaknesses.filter((w) => w.trim() !== "").length < 3 ||
      bestWaysToHelp.filter((b) => b.trim() !== "").length < 3;

    console.log(longTermGoals);
    console.log(selectedClasses);
    console.log(strengths);
    console.log(weaknesses);
    console.log(longTermGoals);
    console.log(shortTermGoals);
    console.log(bestWaysToHelp);

    setIsSaveDisabled(isInvalid);
  }, [
    selectedClasses,
    strengths,
    weaknesses,
    longTermGoals,
    shortTermGoals,
    bestWaysToHelp,
  ]);

  return (
    <Box>
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
            <Box bg={"white"} p={4} borderRadius={"lg"} mt={6}>
              <StudentClassSelection
                selectedClasses={selectedClasses}
                setSelectedClasses={setSelectedClasses}
                setAddClassModalOpen={() => {}}
                classRefetch={0}
              />
            </Box>
          </ProfileInfoBox>
        </GridItem>

        <GridItem display="flex">
          <EditableProfileInfoBox
            title="What I am good at"
            titleIcon={strengthsIcon}
            value={strengths}
            onChange={setStrengths}
          />
        </GridItem>

        <GridItem display="flex">
          <EditableProfileInfoBox
            title="Things that are hard for me"
            titleIcon={challengesIcon}
            value={weaknesses}
            onChange={setWeaknesses}
          />
        </GridItem>

        <GridItem display="flex">
          <EditableProfileInfoBox
            title="After college I want to"
            titleIcon={longTermGoalsIcon}
            value={longTermGoals}
            onChange={setLongTermGoals}
          />
        </GridItem>

        <GridItem display="flex">
          <EditableProfileInfoBox
            title="Currently I want to"
            titleIcon={workinOnIcon}
            value={shortTermGoals}
            onChange={setShortTermGoals}
          />
        </GridItem>

        <GridItem display="flex">
          <EditableProfileInfoBox
            title="Best way to assist me"
            titleIcon={bestWaysIcon}
            value={bestWaysToHelp}
            onChange={setBestWaysToHelp}
          />
        </GridItem>

        <GridItem display="flex">
          <EditableProfileInfoBox
            title="Things I enjoy doing for fun"
            titleIcon={hobbiesIcon}
            value={hobbies}
            onChange={setHobbies}
          />
        </GridItem>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-start">
        <ButtonGroup mt={4} align={"end"}>
          <Button
            onClick={handleCancelChanges}
            variant="outline"
            borderColor="#BD4F23"
            color="#BD4F23"
            w={"50%"}
            _hover={{
              bg: "#BD4F23",
              borderColor: "#BD4F23",
              color: "white",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveUpdates}
            disabled={isSaveDisabled}
            loading={loadingPatchUpdate}
            bg="#BD4F23"
            color="white"
            w={"50%"}
            _hover={{
              bg: "#BD4F23",
              borderColor: "#BD4F23",
              color: "white",
            }}
          >
            Update <Icon as={FaCheckCircle} ml={2} color={"white"} />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default EditableStudentProfileGrid;
