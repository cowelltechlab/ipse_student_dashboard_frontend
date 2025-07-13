import { Heading, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import BestWaysToHelpSuggestions from "./BestWaysToHelpSuggestions";
import YearSelect from "./YearSelect";

interface ProfileCreationStepThreeProps {
  shortTermGoals: string;
  setShortTermGoals: (goals: string) => void;
  bestWaysToHelp: string;
  setBestWaysToHelp: (bestWays: string) => void;
  readingLevel: string[];
  setReadingLevel: (level: string[]) => void;
  writingLevel: string[];
  setWritingLevel: (level: string[]) => void;
}

const ProfileCreationStepThree = ({
  shortTermGoals,
  setShortTermGoals,
  bestWaysToHelp,
  setBestWaysToHelp,
  readingLevel,
  setReadingLevel,
  writingLevel,
  setWritingLevel,
}: ProfileCreationStepThreeProps) => {
  return (
    <VStack maxW={"1200px"} w={"100%"}>
      <Heading fontSize={"md"}>
        What do you want to work on this semester?
      </Heading>
      <Text fontSize={"sm"} color="gray.500" mt={1}>
        For example: Improve time management, Build my writing skills, Be more
        independent in completing assignments
      </Text>
      <Textarea
        value={shortTermGoals}
        onChange={(e) => setShortTermGoals(e.target.value)}
        placeholder="Enter short term goals..."
      />
      <VStack spaceY={2}>
        <VStack>
          <Heading fontSize={"md"} mt={10}>
            Best Ways to help me in class
          </Heading>
          <Text fontSize={"sm"} color="gray.500" mt={1}>
            Add your own ideas (separated by commas), or select from popular
            strategies
          </Text>
        </VStack>

        <BestWaysToHelpSuggestions
          onSuggestionClick={(selection) => {
            // Split current input into array, trim each, and filter empty values
            const current = bestWaysToHelp
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s);

            // Avoid duplicate additions
            if (!current.includes(selection)) {
              current.push(selection);
            }

            setBestWaysToHelp(current.join(", "));
          }}
        />
      </VStack>

      <Textarea
        value={bestWaysToHelp}
        onChange={(e) => setBestWaysToHelp(e.target.value)}
        placeholder="Enter strategies separated by a comma..."
      />

      <HStack w={"100%"} mt={10}>
        <YearSelect
          selectLabel="Reading Level"
          value={readingLevel}
          setValue={setReadingLevel}
        />
        <YearSelect
          selectLabel="Writing Level"
          value={writingLevel}
          setValue={setWritingLevel}
        />
      </HStack>
    </VStack>
  );
};

export default ProfileCreationStepThree;
