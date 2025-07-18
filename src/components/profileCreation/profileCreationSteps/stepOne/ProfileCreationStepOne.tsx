import {
  Box,
  Heading,
  HStack,
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

interface ProfileCreationStepOneProps {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  selectedYearId: number | null;
  setSelectedYearId: (yearId: number | null) => void;

  selectedClassIds: number[];
  setSelectedClassIds: (classIds: number[]) => void;

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

  selectedClassIds,
  setSelectedClassIds,

  longTermGoals,
  setLongTermGoals,
}: ProfileCreationStepOneProps) => {
  const [numClasses, setNumClasses] = useState<number>(
    selectedClassIds.length || 1
  );
  const [addClassModalOpen, setAddClassModalOpen] = useState<boolean>(false);

  const [classRefetch, setClassRefetch] = useState<number>(0);

  const { classes } = useClasses(classRefetch);

  const handleClassIdChange = (index: number, newId: number | null) => {
    const updated = [...selectedClassIds];
    updated[index] = newId ?? -1;
    setSelectedClassIds(updated);
  };

  const addNewClassDropdown = () => {
    setSelectedClassIds([...selectedClassIds, -1]);
    setNumClasses(numClasses + 1);
  };

  return (
    <Box>
      <Heading>About Me</Heading>
      <HStack mt={4}>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          variant="flushed"
        />
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          variant="flushed"
        />
        <YearSelect
          selectedYearId={selectedYearId}
          setSelectedYearId={setSelectedYearId}
        />
      </HStack>

      <Heading fontSize={"md"} mt={10}>
        What are your class(es) this semester?
      </Heading>

      <VStack align="start" spaceY={4} mt={4}>
        {[...Array(numClasses)].map((_, index) => (
          <ClassDropdown
            key={index}
            selectedClassId={selectedClassIds[index] ?? null}
            setSelectedClassId={(id) => handleClassIdChange(index, id)}
            openClassAddModal={() => setAddClassModalOpen(true)}
            classes={classes}
          />
        ))}
        <TextButton color={"#BD4F23"} onClick={addNewClassDropdown}>
          + Add another class
        </TextButton>
      </VStack>

      <Heading fontSize={"md"} mt={10}>
        What are your goals for after college?{" "}
      </Heading>
      <Text fontSize={"sm"} color="#bd4f23">
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
