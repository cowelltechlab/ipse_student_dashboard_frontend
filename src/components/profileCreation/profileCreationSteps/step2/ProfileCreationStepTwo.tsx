import { Box, Heading, Text, Textarea, VStack } from "@chakra-ui/react";
import AttributeInputGroup from "./AttributeInputGroup";
import { useEffect } from "react";

interface ProfileCreationStepTwoProps {
  setStepComplete: (isComplete: boolean) => void;

  strengths: string[];
  setStrengths: (strengths: string[]) => void;
  weaknesses: string[];
  setWeaknesses: (weaknesses: string[]) => void;
  hobbies: string;
  setHobbies: (hobbies: string) => void;
}

const ProfileCreationStepTwo = ({
  setStepComplete,

  strengths,
  setStrengths,

  weaknesses,
  setWeaknesses,

  hobbies,
  setHobbies,
}: ProfileCreationStepTwoProps) => {

useEffect(() => {
  const allStrengthsFilled = strengths.every((s) => s.trim() !== "");
  const allWeaknessesFilled = weaknesses.every((w) => w.trim() !== "");

  const isComplete =
    strengths.length > 2 &&
    weaknesses.length > 2 &&
    allStrengthsFilled &&
    allWeaknessesFilled;

  setStepComplete(isComplete);
}, [strengths, weaknesses, setStepComplete]);

  return (
    <VStack maxW={"1200px"} w={"100%"}>
      <AttributeInputGroup
        attributeName="Strength"
        attributes={strengths}
        setAttributes={setStrengths}
        header={"What are some things that you are good at in school?"}
        subheader={
          "Try to think of at least three! For example: Excited to learn, Organized, Good at Writing"
        }
      />

      <Box mt={10} w={"100%"}>
        {" "}
        <AttributeInputGroup
          attributeName="Challenge"
          attributes={weaknesses}
          setAttributes={setWeaknesses}
          header={"What are some things that are hard for you in school?"}
          subheader={
            "Try to think of at least three! For example: Hard to focus, Writing, Time Management"
          }
        />
      </Box>

      <VStack align="start" spaceY={4} mt={4}></VStack>

      <Heading mt={10}>
        What are some things you do for fun or enjoy? (optional)
      </Heading>
      <Text fontSize={"sm"} color="gray.500" mt={1}>
        For example: Favorite teams or hobbies
      </Text>
      <Textarea
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
        placeholder="Enter long term goals..."
      />
    </VStack>
  );
};

export default ProfileCreationStepTwo;
