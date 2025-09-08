interface StudentProfileType {
  year_name: string;
  student_id: number;
}

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  school_email: string;
  email: string;
  roles: string[];
  role_ids: number[];
  profile_picture_url: string;
  is_active: boolean;

  invite_url?: string;

  profile_tag?: string;
  student_profile?: StudentProfileType;
}

export interface ProfilePictureType {
  id: number;
  url: string;
}
