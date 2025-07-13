import {
  Box,
  Field,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import YearSelect from "../../../common/universal/YearSelect";
import { useState } from "react";
import useClasses from "../../../../hooks/classes/useClasses";
import ClassDropdown from "../../../common/classDropdown/ClassDropdown";
import TextButton from "../../../common/universal/TextButton";
import ClassSelectionDialog from "../../../common/classDropdown/ClassSelectionDialog";
import { floatingStyles } from "../../../../themes/themes";
import type { ClassSelectionType } from "../../../../types/ClassTypes";
import { IoIosRemoveCircle } from "react-icons/io";

interface ProfileCreationStepOneProps {
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

  const { classes } = useClasses(classRefetch);

  const handleClassChange = (index: number, newId: number | null) => {
    const updated = [...selectedClasses];
    updated[index] = {
      ...updated[index],
      classId: newId ?? -1,
    };
    setSelectedClasses(updated);
  };

  const handleClassGoalChange = (index: number, newGoal: string) => {
    const updated = [...selectedClasses];
    updated[index] = {
      ...updated[index],
      classGoal: newGoal,
    };
    setSelectedClasses(updated);
  };

  const addNewClassDropdown = () => {
    setSelectedClasses([...selectedClasses, { classId: -1, classGoal: "" }]);
  };

  const removeClass = (indexToRemove: number) => {
    const updated = selectedClasses.filter((_, i) => i !== indexToRemove);
    setSelectedClasses(updated);
  };

  return (
    <Box>
      <Heading>About Me</Heading>
      <HStack mt={4}>
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="peer"
              placeholder=""
            />
            <Field.Label color={"#244D8A"} css={floatingStyles}>First Name</Field.Label>
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

      <Heading fontSize={"md"} mt={10}>
        What are your class(es) this semester?
      </Heading>

      <VStack align="start" spaceY={4} mt={4}>
        {selectedClasses.map((classObj, index) => (
          <HStack w="100%" key={index}>
            <ClassDropdown
              selectedClassId={classObj.classId}
              setSelectedClassId={(id) => handleClassChange(index, id)}
              openClassAddModal={() => setAddClassModalOpen(true)}
              classes={classes}
            />
            <Field.Root>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  placeholder=""
                  value={classObj.classGoal}
                  onChange={(e) => handleClassGoalChange(index, e.target.value)}
                />
                <Field.Label css={floatingStyles}>
                  What do you want to learn in this class?
                </Field.Label>
              </Box>
            </Field.Root>
            <Icon
              as={IoIosRemoveCircle}
              color="#BD4F23"
              size="lg"
              _hover={{ cursor: "pointer" }}
              onClick={() => removeClass(index)}
            />
          </HStack>
        ))}
        <TextButton color="#BD4F23" onClick={addNewClassDropdown}>
          + Add another class
        </TextButton>
      </VStack>

      <Heading fontSize={"md"} mt={10}>
        What are your goals for after college?{" "}
      </Heading>
      <Text fontSize={"sm"} color="#BD4F23" mt={1} fontWeight={"bold"}>
        For example: Live independently, career goals
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
    </Box>
  );
};

export default ProfileCreationStepOne;
