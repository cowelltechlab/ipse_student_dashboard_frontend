// types/AssignmentVersionTypes.ts
export interface GeneratedOption {
  name: string;
  description: string;
  why_good_existing: string;
  why_good_growth: string;
  why_challenge: string;
  internal_id?: string;
}

export interface FinalGeneratedJsonContent {
  assignmentInstructionsHtml?: string;
  stepByStepPlanHtml?: string;
  promptsHtml?: string;
  motivationalMessageHtml?: string;
  // nested support tools block
  supportTools?: {
    toolsHtml?: string;
    aiPromptingHtml?: string;
    aiPolicyHtml?: string;
  };
}

export interface FinalGeneratedContent {
  // legacy single blob (older responses)
  html_content?: string;
  // new structured payload
  json_content?: FinalGeneratedJsonContent;
}

export interface AssignmentVersionData {
  id: string;
  assignment_id: number;
  modifier_id: number;
  student_id: number;
  version_number: number;

  generated_options: GeneratedOption[];
  skills_for_success?: string;
  output_reasoning?: string;

  finalized: boolean;
  date_modified: string;

  selected_options?: string[];

  // backend may send either one of these names
  additional_edit_suggestions?: string;
  extra_ideas_for_changes?: string;

  final_generated_content?: FinalGeneratedContent;
  original_generated_json_content?: FinalGeneratedJsonContent;
}
