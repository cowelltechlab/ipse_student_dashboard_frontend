import type { StudentClassType } from "./ClassTypes";

interface ProfileSummariesType {
    strengths_short: string,
    short_term_goals: string,
    long_term_goals: string,
    best_ways_to_help: string,
    vision: string
}

export interface StudentProfileType {
    student_id: string;
    year_name: string;
    classes: StudentClassType[];
    strengths: string[];
    challenges: string[]
    long_term_goals: string
    short_term_goals: string
    best_ways_to_help: string[]
    hobbies_and_interests: string
    profile_summaries:  ProfileSummariesType
}