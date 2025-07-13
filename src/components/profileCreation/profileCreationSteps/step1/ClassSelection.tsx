import {
  VStack,
  Field,
  Box,
  Input,
  Icon,
  Flex,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { IoIosRemoveCircle } from "react-icons/io";
import { floatingStyles } from "../../../../themes/themes";
import ClassDropdown from "../../../common/classDropdown/ClassDropdown";
import TextButton from "../../../common/universal/TextButton";
import type { ClassSelectionType } from "../../../../types/ClassTypes";
import useClasses from "../../../../hooks/classes/useClasses";

interface StudentClassSelectionProps {
  selectedClasses: ClassSelectionType[];
  setSelectedClasses: (classSelections: ClassSelectionType[]) => void;
  setAddClassModalOpen: (isOpen: boolean) => void;

  classRefetch: number;
}

const StudentClassSelection = ({
  selectedClasses,
  setSelectedClasses,
  setAddClassModalOpen,

  classRefetch,
}: StudentClassSelectionProps) => {
  const { classes } = useClasses(classRefetch);

  const showRemoveButton = useBreakpointValue({ base: true, md: false });

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
    <VStack align="end" spaceY={4} mt={4} w="100%">
      {selectedClasses.map((classObj, index) => (
        <Flex
          key={index}
          w="100%"
          direction={{ base: "column", md: "row" }}
          gap={4}
          align="start"
          mb={4}
        >
          <ClassDropdown
            selectedClassId={classObj.classId}
            setSelectedClassId={(id) => handleClassChange(index, id)}
            openClassAddModal={() => setAddClassModalOpen(true)}
            classes={classes}
          />

          <Field.Root w="100%">
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

          {showRemoveButton ? (
            <Button
              variant="outline"
              bg="#BD4F23"
              color={"white"}
              borderColor="#BD4F23"
              size="sm"
              alignSelf="stretch"
              onClick={() => removeClass(index)}
            >
              Remove Class
            </Button>
          ) : (
            <Icon
              as={IoIosRemoveCircle}
              color="#BD4F23"
              boxSize={6}
              _hover={{ cursor: "pointer" }}
              onClick={() => removeClass(index)}
            />
          )}
        </Flex>
      ))}

      <TextButton color="#BD4F23" onClick={addNewClassDropdown}>
        + Add another class
      </TextButton>
    </VStack>
  );
};

export default StudentClassSelection;
