import { Stack, Text, Accordion, List, Checkbox, Box } from "@chakra-ui/react";
import type { LearningPathwayOption } from "../../types/AssignmentModificationTypes";
import { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

interface LearningPathwaysSectionProps {
  learningPathways: LearningPathwayOption[];
  selectedLearningPaths: string[];
  setSelectedLearningPaths: (selection: string[]) => void;
}

const LearningPathwaysSection = ({
  learningPathways,
  selectedLearningPaths,
  setSelectedLearningPaths,
}: LearningPathwaysSectionProps) => {
  const [value, setValue] = useState([learningPathways[0].internal_id]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLearningPaths([...selectedLearningPaths, id]);
    } else {
      setSelectedLearningPaths(
        selectedLearningPaths.filter((item) => item !== id)
      );
    }
  };

  return (
    <Stack gap="4">
      <Accordion.Root value={value} onValueChange={(e) => setValue(e.value)}>
        {learningPathways.map((learningPathway, index) => (
          <Accordion.Item key={index} value={learningPathway.internal_id}>
            <Accordion.ItemTrigger
              bg="#eaeef4"
              p={2}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Checkbox.Root
                checked={selectedLearningPaths.includes(
                  learningPathway.internal_id
                )}
                onCheckedChange={(e) =>
                  handleCheckboxChange(
                    learningPathway.internal_id,
                    e.checked === true
                  )
                }
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control
                  borderColor="#244d8a"
                  _checked={{
                    bg: "#244d8a",
                    borderColor: "#244d8a",
                    color: "white",
                  }}
                />
              </Checkbox.Root>
              <Text flex="1" color="#244d8a" fontWeight="bold">
                {learningPathway.name}
              </Text>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent w="100%">
              <Accordion.ItemBody
                w="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Text
                  fontWeight="bold"
                  color="#244d8a"
                  textAlign="left"
                  w="100%"
                >
                  {learningPathway.description}
                </Text>
                <List.Root mt={2} gap={2} w="100%">
                  <List.Item
                    color="black"
                    display="flex"
                    alignItems="start"
                    textAlign="left"
                    w="100%"
                  >
                    <List.Indicator asChild color="#244d8a">
                      <IoMdArrowRoundForward />
                    </List.Indicator>
                    <Box flex="1">{learningPathway.why_good_existing}</Box>
                  </List.Item>
                  <List.Item
                    color="black"
                    display="flex"
                    alignItems="start"
                    textAlign="left"
                    w="100%"
                  >
                    <List.Indicator asChild color="#244d8a">
                      <IoMdArrowRoundForward />
                    </List.Indicator>
                    <Box flex="1">{learningPathway.why_challenge}</Box>
                  </List.Item>
                  <List.Item
                    color="black"
                    display="flex"
                    alignItems="start"
                    textAlign="left"
                    w="100%"
                  >
                    <List.Indicator asChild color="#244d8a">
                      <IoMdArrowRoundForward />
                    </List.Indicator>
                    <Box flex="1">{learningPathway.why_good_growth}</Box>
                  </List.Item>
                </List.Root>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  );
};

export default LearningPathwaysSection;
