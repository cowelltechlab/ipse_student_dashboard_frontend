export interface AssignmentBaseType {
  id?: number;
  student_id: number;
  title: string;
  class_id: number;
  date_created?: string;
}

export interface AssignmentCreateType {
  student_id: number;
  title: string;
  class_id: number;
  content: string;
  html_content?: string; 
  blob_url?: string;      
  source_format?: string; 
  date_created?: string;  
}

export interface AssignmentDetailType extends AssignmentBaseType {
  content: string;
  blob_url?: string;
  source_format?: string;
  html_content?: string;
  first_name?: string;
  last_name?: string;
  assignment_type_id?: number;
}

export interface AssignmentTypeListType {
  id: number;
  type: string;
}