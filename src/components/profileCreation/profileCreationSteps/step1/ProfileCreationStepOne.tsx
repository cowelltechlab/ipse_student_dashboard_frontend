import {
  Box,
  Field,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import YearSelect from "../../../common/universal/YearSelect";
import { useEffect, useState } from "react";
import ClassSelectionDialog from "../../../common/classDropdown/ClassSelectionDialog";
import { floatingStyles } from "../../../../themes/themes";
import type { ClassSelectionType } from "../../../../types/ClassTypes";
import StudentClassSelection from "./ClassSelection";

interface ProfileCreationStepOneProps {
  setStepComplete: (isComplete: boolean) => void;

  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  selectedYearId: number | null;
  setSelectedYearId: (yearId: number | null) => void;

  selectedClasses: ClassSelectionType[];
  setSelectedClasses: (classSelections: ClassSelectionType[]) => void;

  longTermGoals: string;
  setLongTermGoals: (goals: string) => void;
}

const ProfileCreationStepOne = ({
  setStepComplete,

  firstName,
  setFirstName,
  lastName,
  setLastName,
  selectedYearId,
  setSelectedYearId,

  selectedClasses,
  setSelectedClasses,

  longTermGoals,
  setLongTermGoals,
}: ProfileCreationStepOneProps) => {
  const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);
  const [classRefetch, setClassRefetch] = useState<number>(0);

  useEffect(() => {
    const allGoalsFilled = selectedClasses.every(
      (cls) => cls.classGoal.trim() !== ""
    );

    const isComplete =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      selectedYearId !== null &&
      selectedYearId !== undefined &&
      selectedClasses.length > 0 &&
      allGoalsFilled &&
      longTermGoals.trim() !== "";

    setStepComplete(isComplete);
  }, [
    firstName,
    lastName,
    selectedYearId,
    selectedClasses,
    longTermGoals,
    setStepComplete,
  ]);

  return (
    <VStack maxW={"1200px"} w={"100%"}>
      <Heading>About Me</Heading>
      <HStack mt={4} w={"100%"}>
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="peer"
              placeholder=""
            />
            <Field.Label css={floatingStyles}>First Name</Field.Label>
          </Box>
        </Field.Root>

        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="peer"
              placeholder=""
            />
            <Field.Label css={floatingStyles}>Last Name</Field.Label>
          </Box>
        </Field.Root>

        <YearSelect
          selectedYearId={selectedYearId}
          setSelectedYearId={setSelectedYearId}
        />
      </HStack>

      <Heading mt={10}>What are your class(es) this semester?</Heading>

      <StudentClassSelection
        selectedClasses={selectedClasses}
        setSelectedClasses={setSelectedClasses}
        setAddClassModalOpen={setAddClassModalOpen}
        classRefetch={classRefetch}
      />

      <Heading mt={10}>What are your goals for after college? </Heading>
      <Text fontSize={"sm"} color="gray.500">
        For example: Live independently, Own a Business
      </Text>
      <Textarea
        value={longTermGoals}
        onChange={(e) => setLongTermGoals(e.target.value)}
        placeholder="Enter long term goals..."
      />

      {addClassModalOpen && (
        <ClassSelectionDialog
          open={addClassModalOpen}
          setOpen={setAddClassModalOpen}
          triggerRefetch={() => setClassRefetch(classRefetch + 1)}
        />
      )}
    </VStack>
  );
};

export default ProfileCreationStepOne;
