import type { StudentClassType } from "./ClassTypes";

// TODO: Update once the backend is ready
export interface StudentType {
    id: string;
    first_name: string;
    last_name: string;
    year_name: string;
    reading_level: string;
    writing_level: string;
    
    profile_picture_url?: string;

}

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
    classes: StudentClassType;
    strengths: string[];
    challenges: string[]
    long_term_goals: string
    short_term_goals: string
    best_ways_to_assist: string[]
    hobbies_and_interests: string
    profile_summaries:  ProfileSummariesType
}