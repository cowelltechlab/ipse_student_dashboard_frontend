export type JwtPayload = {
  user_id: number;
  first_name: string | null;
  last_name: string | null;
  student_id: number | null;
  email: string;
  school_email?: string | null;
  role_ids?: number[];
  role_names?: string[];
  profile_picture_url?: string | null;
  exp: number; // seconds since epoch
  iat: number;
};

export interface AuthContextType {
  userId: number | null;
  studentId: number | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  roles: string[];
  profilePictureUrl: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGT: () => void;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  logout: (navigate: (path: string) => void) => void;
  handleCallback: (
    code: string
  ) => Promise<{ isStudent: boolean; studentId: number | null } | null>;
  handleGTCallback: (
    accessToken: string
  ) => Promise<{ isStudent: boolean; studentId: number | null } | null>;
  refreshAuth: () => Promise<void>;
}
