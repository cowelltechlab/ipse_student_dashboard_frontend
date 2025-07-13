import { Box, Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import ProfileCreationStepOne from "./profileCreationSteps/step1/ProfileCreationStepOne";
import ProfileCreationStepTwo from "./profileCreationSteps/step2/ProfileCreationStepTwo";
import ProfileCreationStepThree from "./profileCreationSteps/step3/ProfileCreationStepThree";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import type { ClassSelectionType } from "../../types/ClassTypes";

const ProfileCreationContent = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const { user } = useUser(Number(user_id));

  //  Step 1 Props
  const [firstName, setFirstName] = useState<string>(user?.first_name || "");
  const [lastName, setLastName] = useState<string>(user?.last_name || "");
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<ClassSelectionType[]>([
    { classId: -1, classGoal: "" },
  ]);
  const [longTermGoals, setLongTermGoals] = useState<string>("");

  // Step 2 Props
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string>("");

  // Step 3 Props
  const [shortTermGoals, setShortTermGoals] = useState<string>("");
  const [bestWaysToHelp, setBestWaysToHelp] = useState<string>("");
  const [readingLevel, setReadingLevel] = useState<string[]>([]);
  const [writingLevel, setWritingLevel] = useState<string[]>([]);

  const steps = [
    {
      title: "",
      description: (
        <ProfileCreationStepOne
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          selectedYearId={selectedYearId}
          setSelectedYearId={setSelectedYearId}
          selectedClasses={selectedClasses}
          setSelectedClasses={setSelectedClasses}
          longTermGoals={longTermGoals}
          setLongTermGoals={setLongTermGoals}
        />
      ),
    },
    {
      title: "",
      description: (
        <ProfileCreationStepTwo
          strengths={strengths}
          setStrengths={setStrengths}
          weaknesses={weaknesses}
          setWeaknesses={setWeaknesses}
          hobbies={hobbies}
          setHobbies={setHobbies}
        />
      ),
    },
    {
      title: "",
      description: (
        <ProfileCreationStepThree
          shortTermGoals={shortTermGoals}
          setShortTermGoals={setShortTermGoals}
          bestWaysToHelp={bestWaysToHelp}
          setBestWaysToHelp={setBestWaysToHelp}
          readingLevel={readingLevel}
          setReadingLevel={setReadingLevel}
          writingLevel={writingLevel}
          setWritingLevel={setWritingLevel}
        />
      ),
    },
  ];

  return (
    <Box px={12}>
      <Steps.Root defaultStep={0} count={steps.length} colorPalette={"orange"}>
        <Box w={"100%"} justifyItems={"center"}>
          <Steps.List p={10} w={"500px"}>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Trigger>
                  <Steps.Indicator />
                  <Steps.Title>{step.title}</Steps.Title>
                </Steps.Trigger>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </Box>

        {steps.map((step, index) => (
          <Steps.Content key={index} index={index}>
            <Box w="100%" display="flex" justifyContent="center">
              {step.description}
            </Box>
          </Steps.Content>
        ))}
        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

        <Box display="flex" justifyContent="center" mt={6}>
          <ButtonGroup size="sm" variant="outline">
            <Steps.PrevTrigger asChild>
              <Button
                borderRadius={"xl"}
                color={"#BD4F23"}
                borderColor={"#BD4F23"}
              >
                <FaArrowAltCircleLeft />
                Prev
              </Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button borderRadius={"xl"} color={"white"} bg={"#BD4F23"}>
                Next
                <FaArrowAltCircleRight />
              </Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Box>
      </Steps.Root>
    </Box>
  );
};

export default ProfileCreationContent;
