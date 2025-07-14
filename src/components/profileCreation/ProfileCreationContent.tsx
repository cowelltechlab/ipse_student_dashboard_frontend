import { Box, Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import ProfileCreationStepOne from "./profileCreationSteps/step1/ProfileCreationStepOne";
import ProfileCreationStepTwo from "./profileCreationSteps/step2/ProfileCreationStepTwo";
import ProfileCreationStepThree from "./profileCreationSteps/step3/ProfileCreationStepThree";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import type { ClassSelectionType } from "../../types/ClassTypes";
import SubmissionCompletedModal from "./SubmissionCompleteModal";
import usePostStudentProfile from "../../hooks/studentProfiles/usePostStudentProfile";
import { toaster } from "../ui/toaster";

const ProfileCreationContent = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const { user } = useUser(Number(user_id));

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [submittedModalOpen, setSubmittedModalOpen] = useState<boolean>(false);

  const { handlePostStudentProfile, loading } = usePostStudentProfile();

  const handleSubmit = async () => {
    if (!user_id) {
      toaster.create({
        description: "Cannot submit – student ID is missing.",
        type: "error",
      });

      return;
    }

      if (!selectedYearId) {
        toaster.create({
          description: "Please select a school year before submitting.",
          type: "error",
        });
        return;
      }
    

    try {
      await handlePostStudentProfile(
        user_id,
        firstName,
        lastName,
        selectedYearId,
        selectedClasses,
        longTermGoals,
        strengths,
        weaknesses,
        hobbies,
        shortTermGoals,
        bestWaysToHelp,
        readingLevel,
        writingLevel
      );

      setSubmittedModalOpen(true);
    } catch (e) {
      console.error(e);
      const error = e as {
        message: string;
        response?: { data: { message: string } };
      };
      const errorMessage = error.response?.data.message || error.message;
      toaster.create({
        description: `Error creating student profile: ${errorMessage}`,
        type: "error",
      });
    }
  };

  //  Step 1 Props
  const [isStep1Complete, setIsStep1Complete] = useState<boolean>(false);
  const [isStep2Complete, setIsStep2Complete] = useState<boolean>(false);
  const [isStep3Complete, setIsStep3Complete] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>(user?.first_name || "");
  const [lastName, setLastName] = useState<string>(user?.last_name || "");
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<ClassSelectionType[]>([
    { class_id: -1, class_goal: "" },
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

  const isStepComplete = () => {
    if (currentStep === 0) return isStep1Complete;
    if (currentStep === 1) return isStep2Complete;
    if (currentStep === 2) return isStep3Complete;
    return false;
  };

  const steps = [
    {
      title: "",
      description: (
        <ProfileCreationStepOne
          setStepComplete={(isComplete: boolean) =>
            setIsStep1Complete(isComplete)
          }
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
          setStepComplete={(isComplete: boolean) =>
            setIsStep2Complete(isComplete)
          }
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
          setStepComplete={(isComplete: boolean) =>
            setIsStep3Complete(isComplete)
          }
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
    <Box px={12} mb={10}>
      <Steps.Root
        step={currentStep}
        onStepChange={(details) => setCurrentStep(details.step)}
        count={steps.length}
        colorPalette="orange"
      >
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
            {currentStep < steps.length - 1 ? (
              <Steps.NextTrigger asChild>
                <Button
                  borderRadius="xl"
                  color="white"
                  bg="#BD4F23"
                  disabled={!isStepComplete()}
                >
                  Next
                  <FaArrowAltCircleRight />
                </Button>
              </Steps.NextTrigger>
            ) : (
              <Button
                borderRadius="xl"
                color="white"
                bg="#BD4F23"
                onClick={handleSubmit}
                disabled={!isStepComplete()}
                loading={loading}
              >
                Submit Profile
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Steps.Root>

      {submittedModalOpen && (
        <SubmissionCompletedModal
          open={submittedModalOpen}
          setOpen={setSubmittedModalOpen}
        />
      )}
    </Box>
  );
};

export default ProfileCreationContent;
