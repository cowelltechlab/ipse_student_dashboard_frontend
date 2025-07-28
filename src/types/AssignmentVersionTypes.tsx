
export interface GeneratedOption {
  name: string;
  description: string;
  why_good_existing: string;
  why_good_growth: string;
  internal_id?: string; // optional
}

export interface FinalGeneratedContent {
  html_content: string;
}

export interface AssignmentVersionData {
  id: string;
  assignment_id: number;
  modifier_id: number;
  student_id: number;
  version_number: number;
  generated_options: GeneratedOption[];
  skills_for_success?: string; // optional
  finalized: boolean;
  date_modified: string;
  selected_options?: string[];
  extra_ideas_for_changes?: string;
  final_generated_content?: FinalGeneratedContent;
}
