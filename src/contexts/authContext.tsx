import { createContext, useState, useEffect, type ReactNode } from "react";
import apiClient from "../services/apiClient";

interface AuthContextType {
  userId: number | null;
  studentId: number | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  roles: string[];
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  logout: (navigate: (path: string) => void) => void;
  handleCallback: (
    code: string,
    navigate: (path: string) => void
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);


  const setTokenAndUserInfo = async (accessToken: string) => {
    localStorage.setItem("authToken", accessToken);
    apiClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

    try {
      const userResponse = await apiClient.get("/auth/me");

      

      if (userResponse.data.roles?.includes("Student")) {
        // Retrieve student ID from userID via API call
        const studentResponse = await apiClient.get(
          `/students/user/${userResponse.data.id}`
        );
        const student = studentResponse.data;
        if (student) {
          setStudentId(student.id);
        }
      } else {
        setStudentId(null);
      }

      setUserId(userResponse.data.id);
      setFirstName(userResponse.data.first_name);
      setLastName(userResponse.data.last_name);
      setRoles(userResponse.data.roles || []);
      setEmail(userResponse.data.email);
    } catch (error) {
      console.error("Error retrieving user info:", error);
      localStorage.removeItem("authToken");
      setUserId(null);
      setFirstName(null);
      setLastName(null);
      setEmail(null);
      setRoles([]);
      setStudentId(null);
    }
  };

  // 1. Capture access_token from URL if redirected after Google login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("access_token");

    if (tokenFromURL) {
      localStorage.setItem("authToken", tokenFromURL);
      apiClient.defaults.headers["Authorization"] = `Bearer ${tokenFromURL}`;
      window.history.replaceState({}, document.title, "/");
      setTokenAndUserInfo(tokenFromURL);
    }
  }, []);

  // 2. On app load, restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    apiClient
      .get("/auth/me")
      .then(async (response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setRoles(response.data.roles || []);
        setEmail(response.data.email);
        setUserId(response.data.id);

        if ((response.data.roles || []).includes("Student")) {
          try {
            const studentResponse = await apiClient.get(
              `/students/user/${response.data.id}`
            );
            const student = studentResponse.data;
            if (student) {
              setStudentId(student.id);
            }
          } catch (err) {
            console.error("Failed to fetch student ID:", err);
          }
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setRoles([]);
        setUserId(null);
        setStudentId(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const loginWithGoogle = async () => {
    try {
      const response = await apiClient.get("/auth/login/google");
      // console.log(response.data.google_auth_url);
      window.location.href = response.data.google_auth_url;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleCallback = async (
    code: string,
    navigate: (path: string) => void
  ) => {
    try {
      const response = await apiClient.get(
        `/auth/google/callback?code=${code}`
      );
      const accessToken = response.data.access_token;

      await setTokenAndUserInfo(accessToken); // sets token + user info + studentId

      // Use current state instead of refetching
      const currentRoles = roles; // already set by setTokenAndUserInfo
      const currentUserId = userId;

      if (currentRoles.includes("Student") && currentUserId !== null) {
        const studentResponse = await apiClient.get(
          `/students/user/${currentUserId}`
        );
        const student = studentResponse.data;
        if (student) {
          navigate(`/student/${student.id}`);
        } else {
          console.error("No student found for user ID:", currentUserId);
        }
      } else {
        navigate("/dashboard");
      }

      window.history.replaceState(null, "", "/");
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await apiClient.post("/auth/login/email", {
        email,
        password,
      });
      await setTokenAndUserInfo(response.data.access_token);
      return true;
    } catch (error) {
      console.error("Email login failed", error);
      return false;
    }
  };

  const logout = (navigate: (path: string) => void) => {
    localStorage.removeItem("authToken");
    delete apiClient.defaults.headers["Authorization"];
    setFirstName(null);
    setLastName(null);
    setEmail(null);
    setRoles([]);
    setUserId(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        studentId,
        email,
        first_name: firstName,
        last_name: lastName,
        roles,
        isAuthenticated: !!email,
        loading,
        loginWithGoogle,
        loginWithEmail,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
