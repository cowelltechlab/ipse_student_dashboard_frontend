export interface LearningPathwayOption {
  name: string;
  description: string;
  why_good_existing: string;
  why_good_growth: string;
  why_challenge: string;
  internal_id: string;
  selected?: boolean;
  /** Emoji representing this pathway (from backend, based on name/description). */
  emoji?: string | null;
  /** Optional image URL chosen by the backend for this pathway. */
  image_url?: string | null;
}

export interface AssignmentVersionData {
  version_document_id: string;
  skills_for_success: string;
  learning_pathways: LearningPathwayOption[];
  additional_edit_suggestions?: string;
}

export interface AssignmentVersionDownloadData {
  file_name: string;
  file_type: string;
  file_content: string;
}
