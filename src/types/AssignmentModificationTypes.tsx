export interface LearningPathwayOption {
  name: string;
  description: string;
  why_good_existing: string;
  why_good_growth: string;
  why_challenge: string;
  internal_id: string;
  selected?: boolean;
}

export interface AssignmentVersionData {
  version_document_id: string;
  skills_for_success: string;
  learning_pathways: LearningPathwayOption[];
}

export interface AssignmentVersionDownloadData {
  file_name: string;
  file_type: string;
  file_content: string;
}
