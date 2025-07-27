export interface LearningPathwayOption {
  title: string;
  description: string;
  reasons: string[];
  internal_id: string;
}

export interface AssignmentVersionData {
  version_document_id: string;
  skills_for_success: string;
  learning_pathways: LearningPathwayOption[];
}
