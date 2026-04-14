import { Stack, Accordion, List, Checkbox, Text } from "@chakra-ui/react";
import type { LearningPathwayOption } from "../../types/AssignmentModificationTypes";
import { useEffect, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import InlineHtmlText from "../common/universal/InlineHtmlText";

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
  const [value, setValue] = useState<string[]>([]);

  const pathwayIdsKey = learningPathways.map((p) => p.internal_id).join("\0");
  useEffect(() => {
    setValue([]);
  }, [pathwayIdsKey]);

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
      <Accordion.Root
        variant="plain"
        multiple
        collapsible
        value={value}
        onValueChange={(e) => setValue(e.value)}
      >
        {learningPathways.map((learningPathway, index) => (
          <Accordion.Item key={index} value={learningPathway.internal_id}>
            <Accordion.ItemTrigger
              bg="#eaeef4"
              p={2}
              borderRadius="md"
              mt={index > 0 ? 3 : 0}
              display="flex"
              alignItems="center"
              gap={2}
              _hover={{ bg: "#dde4f0" }}
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
              {learningPathway.emoji && (
                <Text fontSize="xl" aria-hidden>
                  {learningPathway.emoji}
                </Text>
              )}
              <InlineHtmlText
                flex="1"
                color="#244d8a"
                fontWeight="bold"
                html={learningPathway.name}
              />
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent w="100%">
              <Accordion.ItemBody
                w="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <InlineHtmlText
                  html={learningPathway.description}
                  color="#244d8a"
                  textAlign="left"
                  w="100%"
                />
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
                    <InlineHtmlText flex="1" html={learningPathway.why_good_existing} />
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
                    <InlineHtmlText flex="1" html={learningPathway.why_challenge} />
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
                    <InlineHtmlText flex="1" html={learningPathway.why_good_growth} />
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
