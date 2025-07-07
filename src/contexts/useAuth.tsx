import { useContext } from "react";
import AuthContext from "./authContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  // console.log("useAuth context:", context);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
