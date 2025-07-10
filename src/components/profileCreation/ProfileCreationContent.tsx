import { Box, Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import ProfileCreationStepOne from "./profileCreationSteps/stepOne/ProfileCreationStepOne";
import ProfileCreationStepTwo from "./profileCreationSteps/ProfileCreationStepTwo";
import ProfileCreationStepThree from "./profileCreationSteps/ProfileCreationStepThree";
import { useState } from "react";

const ProfileCreationContent = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const { user } = useUser(Number(user_id));

  //  Step 1 Props
  const [firstName, setFirstName] = useState<string>(user?.first_name || "");
  const [lastName, setLastName] = useState<string>(user?.last_name || "");
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const [longTermGoals, setLongTermGoals] = useState<string>("");

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
          selectedClassIds={selectedClassIds}
          setSelectedClassIds={setSelectedClassIds}
          longTermGoals={longTermGoals}
          setLongTermGoals={setLongTermGoals}
        />
      ),
    },
    {
      title: "",
      description: <ProfileCreationStepTwo />,
    },
    {
      title: "",
      description: <ProfileCreationStepThree />,
    },
  ];

  return (
    <Box px={12}>
      <Steps.Root defaultStep={0} count={steps.length}>
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
            {step.description}
          </Steps.Content>
        ))}
        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

        <ButtonGroup size="sm" variant="outline">
          <Steps.PrevTrigger asChild>
            <Button>Prev</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button>Next</Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Steps.Root>
    </Box>
  );
};

export default ProfileCreationContent;
