// import { createContext, useState, useEffect, type ReactNode } from "react";
// import apiClient from "../../services/apiClient";

// interface AuthContextType {
//   email: string | null;
//   name: string | null;
//   roles: string[];
//   isAuthenticated: boolean;
//   loading: boolean;
//   loginWithGoogle: () => Promise<void>;
//   loginWithEmail: (email: string, password: string) => Promise<void>;
//   logout: (navigate: (path: string) => void) => void;
//   handleCallback: (
//     code: string,
//     navigate: (path: string) => void
//   ) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [email, setEmail] = useState<string | null>(null);
//   const [name, setName] = useState<string | null>(null);
//   const [roles, setRoles] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     apiClient
//       .get("/auth/me")
//       .then((response) => {
//         setName(response.data.first_name + " " + response.data.last_name);
//         setRoles(response.data.roles);
//         setEmail(response.data.email);
//       })
//       .catch(() => {
//         localStorage.removeItem("authToken");
//         setName(null);
//         setEmail(null);
//         setRoles([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const loginWithGoogle = async () => {
//     try {
//       const response = await apiClient.get("/auth/login/google");
//       window.location.href = response.data.google_auth_url;
//     } catch (error) {
//       console.error("Google login failed", error);
//     }
//   };

//   const loginWithEmail = async (email: string, password: string) => {
//     try {
//       const response = await apiClient.post("/auth/login/email", {
//         email,
//         password,
//       });
//       localStorage.setItem("authToken", response.data.access_token);
//       apiClient.defaults.headers[
//         "Authorization"
//       ] = `Bearer ${response.data.access_token}`;

//       const userResponse = await apiClient.get("/auth/me");
//       setName(userResponse.data.first_name + " " + userResponse.data.last_name);
//       setRoles(userResponse.data.roles);
//       setEmail(userResponse.data.email);
//     } catch (error) {
//       console.error("Email/password login failed", error);
//       throw error;
//     }
//   };

//   const handleCallback = async (
//     code: string,
//     navigate: (path: string) => void
//   ) => {
//     try {
//       const response = await apiClient.get(
//         `/auth/google/callback?code=${code}`
//       );
//       localStorage.setItem("authToken", response.data.access_token);
//       apiClient.defaults.headers[
//         "Authorization"
//       ] = `Bearer ${response.data.access_token}`;

//       const userResponse = await apiClient.get("/auth/me");
//       setName(userResponse.data.first_name + " " + userResponse.data.last_name);
//       setRoles(userResponse.data.roles);
//       setEmail(userResponse.data.email);

//       navigate("/");
//       window.history.replaceState(null, "", "/");
//     } catch (error) {
//       console.error("Authentication failed", error);
//     }
//   };

//   const logout = (navigate: (path: string) => void) => {
//     localStorage.removeItem("authToken");
//     delete apiClient.defaults.headers["Authorization"];
//     setName(null);
//     setEmail(null);
//     setRoles([]);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         email,
//         name,
//         roles,
//         isAuthenticated: !!email,
//         loading,
//         loginWithGoogle,
//         loginWithEmail,
//         logout,
//         handleCallback,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
