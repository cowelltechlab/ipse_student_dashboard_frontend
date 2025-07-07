import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/users/useUser";

const ProfileCreationContent = () => {
  // Extracting user id from url... if user does not have student role, navigate back to home
  const { user_id } = useParams<{ user_id: string }>();

  const { user } = useUser(Number(user_id));

  return (
    <Steps.Root defaultStep={1} count={steps.length}>
      <Steps.List>
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
  );
};

export default ProfileCreationContent;

const steps = [
  {
    title: "Step 1",
    description: "Step 1 description",
  },
  {
    title: "Step 2",
    description: "Step 2 description",
  },
  {
    title: "Step 3",
    description: "Step 3 description",
  },
];
