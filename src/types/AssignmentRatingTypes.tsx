import type { LearningPathwayOption } from "./AssignmentModificationTypes";
import type { StudentProfileType } from "./StudentTypes";

export interface AssignmentRatingDataType {
    assignment_verion_id: string;
    assignment_id: number;
    assignment_name: string;
    generated_options: LearningPathwayOption[];
    original_assignment_html: string;
    student_profile: StudentProfileType
}

export interface GoalsRating {
    helped_work_towards_goals: string;
    which_goals: string[];
    goals_explanation: string;
}

export interface OptionsRating {
    most_helpful_parts: string[];
    most_helpful_explanation?: string;
    least_helpful_parts: string[];
    least_helpful_explanation?: string;
}

export interface MySkillsRating {
    found_way_to_keep_using: string;
    way_to_keep_explanation: string;
    can_describe_improvements: string;
    improvements_explanation: string;
}

export interface GuidingLearningRating {
    confidence_making_changes: string;
    confidence_explanation: string;
}

export interface PlanningForFutureRating {
    my_skills: MySkillsRating;
    guiding_my_learning: GuidingLearningRating
}

export interface RatingUpdateRequest {
    goals_section: GoalsRating,
    options_section: OptionsRating,
    planning_section: PlanningForFutureRating,
    date_modified?: string
}

export interface ExistingRatingDataResponse {
    assignment_version_id: string;
    goals_section?: GoalsRating;
    options_section?: OptionsRating;
    planning_section?: PlanningForFutureRating;
    last_rating_update?: string;
}