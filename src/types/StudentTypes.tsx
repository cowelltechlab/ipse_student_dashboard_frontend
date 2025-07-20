import type { StudentProfileClassType } from "./ClassTypes";

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
  strengths_short: string;
  short_term_goals: string;
  long_term_goals: string;
  best_ways_to_help: string;
  vision: string;
}

export interface StudentProfileType {
  student_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  year_name: string;
  profile_picture_url: string;
  classes: StudentProfileClassType[];
  strengths: string[];
  challenges: string[];
  long_term_goals: string;
  short_term_goals: string;
  best_ways_to_help: string[];
  hobbies_and_interests: string;
  profile_summaries: ProfileSummariesType;
}
