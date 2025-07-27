import { Stack, Text, Accordion, Span, List, Checkbox } from "@chakra-ui/react";
import type { LearningPathwayOption } from "../../types/AssignmentModificationTypes";
import { useState } from "react";

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
            <Accordion.ItemTrigger bg="#eaeef4" p={2}>
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
                    color: "white", // this affects the check icon color
                  }}
                />
              </Checkbox.Root>
              <Span flex="1" color={"#244d8a"} fontWeight={"bold"}>
                {learningPathway.title}
              </Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Text fontWeight="bold">{learningPathway.description}</Text>
                <List.Root>
                  {learningPathway.reasons.map((reason, i) => (
                    <List.Item key={i}>{reason}</List.Item>
                  ))}
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
