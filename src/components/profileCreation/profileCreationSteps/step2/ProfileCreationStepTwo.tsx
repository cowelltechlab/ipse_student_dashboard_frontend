import { Heading, Text, Textarea, VStack } from "@chakra-ui/react";
import AttributeInputGroup from "./AttributeInputGroup";

interface ProfileCreationStepTwoProps {
  strengths: string[];
  setStrengths: (strengths: string[]) => void;
  weaknesses: string[];
  setWeaknesses: (weaknesses: string[]) => void;
  hobbies: string;
  setHobbies: (hobbies: string) => void;
}

const ProfileCreationStepTwo = ({
  strengths,
  setStrengths,

  weaknesses,
  setWeaknesses,

  hobbies,
  setHobbies,
}: ProfileCreationStepTwoProps) => {
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

      <AttributeInputGroup
        attributeName="Challenge"
        attributes={weaknesses}
        setAttributes={setWeaknesses}
        header={"What are some things that are hard for you in school?"}
        subheader={
          "Try to think of at least three! For example: Hard to focus, Writing, Time Management"
        }
      />

      <VStack align="start" spaceY={4} mt={4}></VStack>

      <Heading fontSize={"md"} mt={10}>
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
