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

export interface AssignmentBasicType {
  id: number;
  student_id?: number;
  title?: string;
  class_id?: number;
  date_created?: string;

  blob_url?: string;
  source_format?: string;
  first_name?: string;
  last_name?: string;

  finalized?: string;
  final_version_id?: string;
  rating_status?: string;
  date_modified?: string;
}

export interface StudentInfoType {
  id: number;
  first_name: string;
  last_name: string;
}

export interface ClassInfoType {
  id?: number;
  name?: string;
  course_code?: string;
}

export interface VersionInfoType {
  document_id: string;
  version_number?: number;
  modified_by?: string; // User name
  modifier_role?: string; // User role
  date_modified?: string;
  document_url?: string;
  finalized?: boolean;
  final_version_id?: string;
  rating_status?: string;
}

export interface AssignmentDetailType extends AssignmentBaseType {
  assignment_id: number; // renamed from id
  title: string;
  content: string;
  date_created: string;
  blob_url?: string;
  source_format?: string;
  html_content?: string;
  assignment_type?: string;
  assignment_type_id?: number;

  // Nested structures
  student: StudentInfoType;
  class_info?: ClassInfoType;

  // NoSQL metadata
  finalized?: boolean; // Overall assignment finalized
  final_version_id?: string; // ID of the finalized version
  rating_status?: string; // Overall rating status
  date_modified?: string; // Latest version modification date
  versions: VersionInfoType[]; // List of versions
}

export interface AssignmentTypeListType {
  id: number;
  type: string;
}

export interface AssignmentTextCreateType {
  student_id: number;
  title: string;
  class_id: number;
  content: string;
  assignment_type_id: number;
  date_created?: string;
}

export interface AssignmentTextBulkCreateType {
  student_ids: number[];
  title: string;
  class_id: number;
  content: string;
  assignment_type_id: number;
}
