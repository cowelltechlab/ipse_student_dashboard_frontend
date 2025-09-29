
export interface StudentDetailsType {
  student_id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
  gt_email?: string | null;
  profile_picture_url: string | null;
  group_type: string | null;
  ppt_embed_url: string | null;
  ppt_edit_url: string | null;
}

export interface StudentGroupTypeUpdate {
  group_type: string | null;
}

export interface StudentPptUrlsUpdate {
  ppt_embed_url?: string | null;
  ppt_edit_url?: string | null;
}
