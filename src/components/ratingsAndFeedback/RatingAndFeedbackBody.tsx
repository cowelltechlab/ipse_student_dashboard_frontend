import { VStack, Accordion } from "@chakra-ui/react";
import ViewDocumentInfo from "./ViewDocumentInfo";
import Goals from "./Goals";
import RateMyOptions from "./RateMyOptions";
import PlanningForTheFuture from "./PlanningForTheFuture";
import SubmitFinalRatingButton from "./SubmitFinalRatingButton";
import RatingSubmissionModal from "./RatingSubmissionModal";
import type { AssignmentDetailType } from "../../types/AssignmentTypes";
import type { StudentProfileType } from "../../types/StudentTypes";
import type { RatingUpdateRequest } from "../../types/AssignmentRatingTypes";
import useGetAssignmentVersionByDocId from "../../hooks/assignmentVersions/useGetAssignmentVersionByDocId";
import useGetAssignmentRatingDetails from "../../hooks/assignmentRating.tsx/useGetAssignmentRatingDetails";
import usePostAssignmentRating from "../../hooks/assignmentRating.tsx/usePostAssignmentRating";
import useGetExistingRatingData from "../../hooks/assignmentRating.tsx/useGetExistingRatingData";
import { useState, useEffect } from "react";

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
  student,
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

    // Modal State
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState<boolean>(false);

    const { assignmentVersion, loading: assignmentVersionLoading } =
        useGetAssignmentVersionByDocId(assignmentVersionId.toString());

    const { assignmentRatingDetails, loading: assignmentRatingDetailsLoading } =
        useGetAssignmentRatingDetails(assignmentVersionId);

    const { existingRatingData } =
        useGetExistingRatingData(assignmentVersionId);

    const { handlePostAssignmentRating, loading: ratingPostLoading } = usePostAssignmentRating();

    // Pre-populate form fields with existing data
    useEffect(() => {
        if (existingRatingData) {
            // Goals Section
            if (existingRatingData.goals_section) {
                setHelpedWorkTowardsGoals(existingRatingData.goals_section.helped_work_towards_goals || "");
                setWhichGoals(existingRatingData.goals_section.which_goals || []);
                setGoalsExplanation(existingRatingData.goals_section.goals_explanation || "");
            }

            // Options Section
            if (existingRatingData.options_section) {
                setMostHelpfulParts(existingRatingData.options_section.most_helpful_parts || []);
                setMostHelpfulPartsExplanation(existingRatingData.options_section.most_helpful_explanation || "");
                setLeastHelpfulParts(existingRatingData.options_section.least_helpful_parts || []);
                setLeastHelpfulPartsExplanation(existingRatingData.options_section.least_helpful_explanation || "");
            }

            // Planning Section
            if (existingRatingData.planning_section) {
                // My Skills
                if (existingRatingData.planning_section.my_skills) {
                    setFoundWayToKeepUsing(existingRatingData.planning_section.my_skills.found_way_to_keep_using || "");
                    setWayToKeepExplanation(existingRatingData.planning_section.my_skills.way_to_keep_explanation || "");
                    setCanDescribeImprovements(existingRatingData.planning_section.my_skills.can_describe_improvements || "");
                    setImprovementsExplanation(existingRatingData.planning_section.my_skills.improvements_explanation || "");
                }

                // Guiding Learning
                if (existingRatingData.planning_section.guiding_my_learning) {
                    setConfidenceMakingChanges(existingRatingData.planning_section.guiding_my_learning.confidence_making_changes || "");
                    setConfidenceExplanation(existingRatingData.planning_section.guiding_my_learning.confidence_explanation || "");
                }
            }
        }
    }, [existingRatingData]);

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
            // Show success modal
            setIsSubmissionModalOpen(true);
        } catch (error) {
            console.error("Error submitting rating:", error);
            // Error handling could be added here (e.g., showing an error toast)
        }
    };

    const isFormValid = () => {
    return (
        helpedWorkTowardsGoals &&
        goalsExplanation.trim() &&
        mostHelpfulPartsExplanation.trim() &&
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
            <Accordion.Root multiple defaultValue={["View Document Information", "Goals"]}>
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
            <RatingSubmissionModal
                isOpen={isSubmissionModalOpen}
                setIsOpen={setIsSubmissionModalOpen}
                studentId={student?.student_id}
            />
        </VStack>
    );
};

export default RatingAndFeedbackBody;
