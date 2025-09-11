interface StudentProfileType {
  year_name: string;
  student_id: number;
}

export type TutoredStudent = {
  student_id: number;
  code: 'FR' | 'SO' | 'JR' | 'SR';
  name: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
};

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
  tutored_students?: TutoredStudent[] | null;
  student_profile?: StudentProfileType;
  
}

export interface ProfilePictureType {
  id: number;
  url: string;
}
