import { VStack, Accordion } from "@chakra-ui/react";
import ViewDocumentInfo from "./ViewDocumentInfo";
import Goals from "./Goals";
import RateMyOptions from "./RateMyOptions";
import PlanningForTheFuture from "./PlanningForTheFuture";
import SubmitFinalRatingButton from "./SubmitFinalRatingButton";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import type { StudentProfileType } from "../../types/StudentTypes";
import type { RatingUpdateRequest } from "../../types/AssignmentRatingTypes";
import useGetAssignmentVersionByDocId from "../../hooks/assignmentVersions/useGetAssignmentVersionByDocId";
import useGetAssignmentRatingDetails from "../../hooks/assignmentRating.tsx/useGetAssignmentRatingDetails";
import usePostAssignmentRating from "../../hooks/assignmentRating.tsx/usePostAssignmentRating";
import { useState } from "react";

interface RatingAndFeedbackBodyProps {
  assignment: AssignmentDetailType | null;
  assignmentLoading: boolean;
  student: StudentProfileType | null;
  studentLoading: boolean;
  assignmentVersionId: string;
}

const RatingAndFeedbackBody = ({
  assignment,
  assignmentLoading,
  assignmentVersionId,
}: RatingAndFeedbackBodyProps) => {

    // Goals Section State
    const [helpedWorkTowardsGoals, setHelpedWorkTowardsGoals] = useState<string>("");
    const [whichGoals, setWhichGoals] = useState<string[]>([]);
    const [goalsExplanation, setGoalsExplanation] = useState<string>("");

    // Rate My Options State
    const [mostHelpfulParts, setMostHelpfulParts] = useState<string[]>([]);
    const [mostHelpfulPartsExplanation, setMostHelpfulPartsExplanation] = useState<string>("");
    const [leastHelpfulParts, setLeastHelpfulParts] = useState<string[]>([]);
    const [leastHelpfulPartsExplanation, setLeastHelpfulPartsExplanation] = useState<string>("");

    // Planning for Future - My Skills State
    const [foundWayToKeepUsing, setFoundWayToKeepUsing] = useState<string>("");
    const [wayToKeepExplanation, setWayToKeepExplanation] = useState<string>("");
    const [canDescribeImprovements, setCanDescribeImprovements] = useState<string>("");
    const [improvementsExplanation, setImprovementsExplanation] = useState<string>("");

    // Planning for Future - Guiding Learning State
    const [confidenceMakingChanges, setConfidenceMakingChanges] = useState<string>("");
    const [confidenceExplanation, setConfidenceExplanation] = useState<string>("");

    const { assignmentVersion, loading: assignmentVersionLoading } =
        useGetAssignmentVersionByDocId(assignmentVersionId.toString());

    const { assignmentRatingDetails, loading: assignmentRatingDetailsLoading } =
        useGetAssignmentRatingDetails(assignmentVersionId);

    const { handlePostAssignmentRating, loading: ratingPostLoading } = usePostAssignmentRating();

    const handleFormSubmission = async () => {
        try {
            const ratingData: RatingUpdateRequest = {
                goals_section: {
                    helped_work_towards_goals: helpedWorkTowardsGoals,
                    which_goals: whichGoals,
                    goals_explanation: goalsExplanation
                },
                options_section: {
                    most_helpful_parts: mostHelpfulParts,
                    most_helpful_explanation: mostHelpfulPartsExplanation,
                    least_helpful_parts: leastHelpfulParts,
                    least_helpful_explanation: leastHelpfulPartsExplanation
                },
                planning_section: {
                    my_skills: {
                        found_way_to_keep_using: foundWayToKeepUsing,
                        way_to_keep_explanation: wayToKeepExplanation,
                        can_describe_improvements: canDescribeImprovements,
                        improvements_explanation: improvementsExplanation
                    },
                    guiding_my_learning: {
                        confidence_making_changes: confidenceMakingChanges,
                        confidence_explanation: confidenceExplanation
                    }
                }
            };

            await handlePostAssignmentRating(assignmentVersionId, ratingData);
            // Success handling could be added here (e.g., showing a success toast)
        } catch (error) {
            console.error("Error submitting rating:", error);
            // Error handling could be added here (e.g., showing an error toast)
        }
    };

    const isFormValid = () => {
        return (
            helpedWorkTowardsGoals &&
            whichGoals.length > 0 &&
            goalsExplanation.trim() &&
            mostHelpfulParts.length > 0 &&
            mostHelpfulPartsExplanation.trim() &&
            leastHelpfulParts.length > 0 &&
            leastHelpfulPartsExplanation.trim() &&
            foundWayToKeepUsing &&
            wayToKeepExplanation.trim() &&
            canDescribeImprovements &&
            improvementsExplanation.trim() &&
            confidenceMakingChanges &&
            confidenceExplanation.trim()
        );
    };

    return (
        <VStack spaceY={4} align="stretch" marginTop={4} marginBottom={4} p={6}>
            <Accordion.Root multiple>
                <ViewDocumentInfo
                    assignment={assignment}
                    assignmentLoading={assignmentLoading}
                    assignmentVersion={assignmentVersion}
                    assignmentVersionLoading={assignmentVersionLoading}
                />
                <Goals 
                    assignmentRatingDetails={assignmentRatingDetails}
                    loading={assignmentRatingDetailsLoading}
                    helpedWorkTowardsGoals={helpedWorkTowardsGoals}
                    onHelpedWorkTowardsGoalsChange={setHelpedWorkTowardsGoals}
                    whichGoals={whichGoals}
                    onWhichGoalsChange={setWhichGoals}
                    goalsExplanation={goalsExplanation}
                    onGoalsExplanationChange={setGoalsExplanation}
                />
                <RateMyOptions 
                    assignmentRatingDetails={assignmentRatingDetails}
                    loading={assignmentRatingDetailsLoading}
                    mostHelpfulParts={mostHelpfulParts}
                    onMostHelpfulPartsChange={setMostHelpfulParts}
                    mostHelpfulPartsExplanation={mostHelpfulPartsExplanation}
                    onMostHelpfulPartsExplanationChange={setMostHelpfulPartsExplanation}
                    leastHelpfulParts={leastHelpfulParts}
                    onLeastHelpfulPartsChange={setLeastHelpfulParts}
                    leastHelpfulPartsExplanation={leastHelpfulPartsExplanation}
                    onLeastHelpfulPartsExplanationChange={setLeastHelpfulPartsExplanation}
                />
                <PlanningForTheFuture 
                    assignmentRatingDetails={assignmentRatingDetails}
                    loading={assignmentRatingDetailsLoading}
                    foundWayToKeepUsing={foundWayToKeepUsing}
                    onFoundWayToKeepUsingChange={setFoundWayToKeepUsing}
                    wayToKeepExplanation={wayToKeepExplanation}
                    onWayToKeepExplanationChange={setWayToKeepExplanation}
                    canDescribeImprovements={canDescribeImprovements}
                    onCanDescribeImprovementsChange={setCanDescribeImprovements}
                    improvementsExplanation={improvementsExplanation}
                    onImprovementsExplanationChange={setImprovementsExplanation}
                    confidenceMakingChanges={confidenceMakingChanges}
                    onConfidenceMakingChangesChange={setConfidenceMakingChanges}
                    confidenceExplanation={confidenceExplanation}
                    onConfidenceExplanationChange={setConfidenceExplanation}
                />
            </Accordion.Root>
            <SubmitFinalRatingButton 
                onSubmit={handleFormSubmission}
                loading={ratingPostLoading}
                disabled={!isFormValid()}
            />
        </VStack>
    );
};

export default RatingAndFeedbackBody;
