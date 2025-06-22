import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";

const spinnerStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  border: "6px solid #ccc",
  borderTop: "6px solid #1976d2",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: "20px",
};

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const spinnerKeyframes = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

const OAuthCallbackHandler = () => {
  const { handleCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("OAuthCallbackHandler mounted");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      handleCallback(code, navigate);
    }
  }, [handleCallback, navigate]);

  return (
    <div style={containerStyle}>
      <style>{spinnerKeyframes}</style>
      <div style={spinnerStyle}></div>
      <p>Authenticating with Google...</p>
    </div>
  );
};

export default OAuthCallbackHandler;
