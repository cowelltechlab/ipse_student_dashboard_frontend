export interface AssignmentType {
  id: number;
  student_first_name: string;
  student_last_name: string;
  title: string;
  class: string;
  term: string;
  date_created: string;

  // NoSQL fields
  finalized?: boolean; // Determined by whether one version of the assignment has finalized: 1
  rating_status?: "Rated" | "Pending" | "Partially Rated"; // Rated if all versions are rated, Pending if none are rated, Partially Rated if some versions are rated
  date_modified?: string; // Date of the most recent modification
}
 