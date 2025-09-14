import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  useRef,
} from "react";
import { jwtDecode } from "jwt-decode";

import apiClient from "../services/apiClient";
import type { AuthContextType, JwtPayload } from "../types/AuthTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [userId, setUserId] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Guards to prevent duplicate callback exchange
  const callbackInFlightRef = useRef(false);
  const lastProcessedCodeRef = useRef<string | null>(null);

  const clearAuth = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    delete apiClient.defaults.headers["Authorization"];
    setUserId(null);
    setStudentId(null);
    setEmail(null);
    setFirstName(null);
    setLastName(null);
    setRoles([]);
    setProfilePictureUrl(null);
  };

  const isExpired = (expSeconds?: number) => {
    if (!expSeconds) return true;
    const nowSeconds = Math.floor(Date.now() / 1000);
    return expSeconds <= nowSeconds;
  };

  const setAuthFromToken = (accessToken: string): JwtPayload | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      if (isExpired(decoded.exp)) {
        clearAuth();
        return null;
      }

      // Persist + auth header
      localStorage.setItem("authToken", accessToken);
      apiClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      // Populate state from claims
      setIsAuthenticated(true);

      setUserId(decoded.user_id);
      setStudentId(decoded.student_id ?? null);
      setEmail(decoded.email ?? null);
      setFirstName(decoded.first_name ?? null);
      setLastName(decoded.last_name ?? null);
      setRoles(decoded.role_names ?? []);
      setProfilePictureUrl(decoded.profile_picture_url ?? null);
      
      return decoded;
    } catch (e) {
      console.error("Failed to decode token:", e);
      clearAuth();
      return null;
    }
  };

  // Handle token present in URL after redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("access_token");
    if (tokenFromURL) {
      setAuthFromToken(tokenFromURL);
      // Clean the URL
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  // Restore session on app load
  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = setAuthFromToken(token);
      if (!decoded) {
        setLoading(false);
        return;
      }

      // If Student role but token lacks student_id, fetch it
      const roleNames = decoded.role_names ?? [];
      const looksLikeStudent = roleNames.includes("Student");
      const hasStudentId = decoded.student_id != null;

      if (looksLikeStudent && !hasStudentId) {
        try {
          const me = await apiClient.get("/auth/me");
          console.log("/auth/me response 1:", me.data);
          // Extract student_id from student_profile if it exists
          const studentId = me.data?.student_profile?.student_id ?? me.data?.student_id ?? null;
          setStudentId(studentId);
        } catch (e) {
          console.error("/auth/me failed", e);
          // If we can't hydrate the ID, treat as signed out to avoid false unauthorized
          clearAuth();
        }
      }

      setLoading(false);
    };

    hydrate();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const response = await apiClient.get("/auth/login/google");
      window.location.href = response.data.google_auth_url;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

const loginWithGT = () => {
  window.location.assign(
    "https://ipse-dashboard-backend-adcpeuexeuf8fvf4.centralus-01.azurewebsites.net/auth/login/gatech"
  );
};

  // GT OAuth callback handler (direct token)
  const handleGTCallback = async (
    accessToken: string
  ): Promise<{ isStudent: boolean; studentId: number | null } | null> => {
    try {
      setLoading(true);
      const decoded = setAuthFromToken(accessToken);
      if (!decoded) {
        throw new Error("Invalid or expired token");
      }

      const isStudent =
        (decoded.role_names ?? []).includes("Student") && !!decoded.student_id;
      const studentId = isStudent ? decoded.student_id : null;

      return { isStudent, studentId };
    } catch (error) {
      console.error("GT Authentication failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth callback handler
  const handleCallback = async (
    code: string
  ): Promise<{ isStudent: boolean; studentId: number | null } | null> => {
    // 1) If we've already processed this code in this tab, skip
    if (lastProcessedCodeRef.current === code) {
      return null;
    }

    // 2) If another call is in flight, skip
    if (callbackInFlightRef.current) {
      return null;
    }

    // 3) If this code was processed earlier in this session (e.g., StrictMode double run), skip
    const processedKey = "oauth_code_processed";
    const previouslyProcessed = sessionStorage.getItem(processedKey);
    if (previouslyProcessed === code) {
      return null;
    }

    callbackInFlightRef.current = true;
    lastProcessedCodeRef.current = code;
    sessionStorage.setItem(processedKey, code);

    try {
      setLoading(true);
      const response = await apiClient.get(
        `/auth/google/callback?code=${encodeURIComponent(code)}`
      );
      const accessToken: string = response.data.access_token;

      const decoded = setAuthFromToken(accessToken);
      if (!decoded) {
        throw new Error("Invalid or expired token");
      }

      const isStudent =
        (decoded.role_names ?? []).includes("Student") && !!decoded.student_id;
      const studentId = isStudent ? decoded.student_id : null;

      return { isStudent, studentId };
    } catch (error) {
      console.error("Authentication failed", error);
      throw error;
    } finally {
      setLoading(false);
      callbackInFlightRef.current = false;
      // Clean URL immediately so a rerender can’t re-trigger the effect
      window.history.replaceState(null, "", "/");
    }
  };

  const loginWithEmail = async (
    emailArg: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const { data } = await apiClient.post("/auth/login/email", {
        email: emailArg,
        password,
      });
      const accessToken: string = data.access_token;

      const decoded = setAuthFromToken(accessToken);
      if (!decoded) {
        setLoading(false);
        return false;
      }

      // Normalize possible claim keys
      const rolesFromToken = (decoded.role_names ?? []) as string[];
      const sidFromToken = (decoded.student_id ?? null) as number | null;

      // If roles missing OR Student without student_id, fetch /auth/me before finishing
      const needsMe =
        rolesFromToken.length === 0 ||
        (rolesFromToken.includes("Student") && sidFromToken == null);

      if (needsMe) {
        try {
          const me = await apiClient.get("/auth/me");
          console.log("/auth/me response 2:", me.data);
          // Expecting { roles: string[], student_id: number, ... } – adjust to your shape
          if (Array.isArray(me.data?.roles)) setRoles(me.data.roles);
          
          // Extract student_id from student_profile if it exists
          const studentId = me.data?.student_profile?.student_id ?? me.data?.student_id ?? null;
          if (studentId != null) setStudentId(studentId);
          if (me.data?.first_name) setFirstName(me.data.first_name);
          if (me.data?.last_name) setLastName(me.data.last_name);
          if (me.data?.email) setEmail(me.data.email);
        } catch (e) {
          console.error("/auth/me failed", e);
          // If we can't hydrate required claims, sign out to avoid bad state
          clearAuth();
          setLoading(false);
          return false;
        }
      } else {
        // If token already had roles/student_id, ensure state is set from normalized values
        setRoles(rolesFromToken);
        setStudentId(sidFromToken);
      }

      setLoading(false);
      return true;
    } catch (error) {
      console.error("Email login failed", error);
      clearAuth();
      setLoading(false);
      return false;
    }
  };

  const logout = (navigate: (path: string) => void) => {
    clearAuth();
    navigate("/login");
  };

  const refreshAuth = useCallback(async () => {
    try {
      const me = await apiClient.get("/auth/me");
      console.log("/auth/me response 3 (refreshAuth):", me.data);
      
      // Extract student_id from student_profile if it exists
      const studentId = me.data?.student_profile?.student_id ?? me.data?.student_id ?? null;
      if (studentId != null) setStudentId(studentId);
      
      if (me.data?.first_name) setFirstName(me.data.first_name);
      if (me.data?.last_name) setLastName(me.data.last_name);
      if (me.data?.email) setEmail(me.data.email);

      if (Array.isArray(me.data?.roles)) setRoles(me.data.roles);
    } catch (e) {
      console.error("Failed to refresh auth", e);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        studentId,
        email,
        first_name: firstName,
        last_name: lastName,
        roles,
        profilePictureUrl,
        isAuthenticated: isAuthenticated,
        loading,
        loginWithGoogle,
        loginWithGT,
        loginWithEmail,
        logout,
        handleCallback,
        handleGTCallback,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
