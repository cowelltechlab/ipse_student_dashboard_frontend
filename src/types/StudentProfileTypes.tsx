import type { ClassSelectionType, StudentClassType } from "./ClassTypes";

interface ProfileSummariesType {
  strengths_short: string;
  short_term_goals: string;
  long_term_goals: string;
  best_ways_to_help: string;
  vision: string;
}

export interface StudentProfileType {
  student_id: string;
  year_name: string;
  classes: StudentClassType[];
  strengths: string[];
  challenges: string[];
  long_term_goals: string;
  short_term_goals: string;
  best_ways_to_help: string[];
  hobbies_and_interests: string;
  profile_summaries: ProfileSummariesType;
}

export interface StudentProfileUpdatePayload {
  year_id?: number;
  strengths?: string[];
  challenges?: string[];
  likes_and_hobbies?: string;
  short_term_goals?: string;
  long_term_goals?: string;
  best_ways_to_help?: string[];
  classes?: ClassSelectionType[];
}

export interface StudentProfilePrefillType {
  user_id: number;
  student_id: number | null;
  first_name: string;
  last_name: string;
  email?: string;
  gt_email?: string;
  profile_picture_url?: string;
  year_id: number | null;

  // Optional in case the document does not yet exist
  classes?: ClassSelectionType[];
  strengths?: string[];
  challenges?: string[];
  long_term_goals?: string;
  short_term_goals?: string;
  best_ways_to_help?: string[];
  hobbies_and_interests?: string;
  reading_level?: string[];
  writing_level?: string[];
}
