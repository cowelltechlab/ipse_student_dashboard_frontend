import { useEffect, useRef } from "react";
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
  const { handleCallback, handleGTCallback } = useAuth();
  const navigate = useNavigate();
  const processedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const accessToken = params.get("access_token");
    const ssoProvider = params.get("sso");
    const oauthError = params.get("error");

    if (processedRef.current) return;
    processedRef.current = true;

    if (oauthError) {
      queueMicrotask(() => {
        window.history.replaceState({}, document.title, "/");
        navigate("/login", {
          replace: true,
          state: {
            error: `Sign-in was canceled or denied (${oauthError}).`,
          },
        });
      });
      return;
    }

    // Handle GT SAML OAuth (direct token)
    if (ssoProvider === "gatech" && accessToken) {
      (async () => {
        try {
          const result = await handleGTCallback(accessToken);
          queueMicrotask(() => {
            window.history.replaceState({}, document.title, "/");

            if (result?.isStudent && result.studentId) {
              navigate(`/student/${result.studentId}`, { replace: true });
            } else {
              navigate("/dashboard", { replace: true });
            }
          });
        } catch {
          queueMicrotask(() => {
            window.history.replaceState({}, document.title, "/");
            navigate("/login", {
              replace: true,
              state: { error: "GT authentication failed. Please try again." },
            });
          });
        }
      })();
      return;
    }

    // Handle Google OAuth (code exchange)
    if (code) {
      (async () => {
        try {
          const result = await handleCallback(code);
          queueMicrotask(() => {
            // strip the code immediately so nothing can re-trigger
            window.history.replaceState({}, document.title, "/");

            if (result?.isStudent && result.studentId) {
              navigate(`/student/${result.studentId}`, { replace: true });
            } else {
              navigate("/dashboard", { replace: true });
            }
          });
        } catch {
          queueMicrotask(() => {
            window.history.replaceState({}, document.title, "/");
            navigate("/login", {
              replace: true,
              state: { error: "Google authentication failed. Please try again." },
            });
          });
        }
      })();
      return;
    }

    // No valid parameters found
    queueMicrotask(() => {
      window.history.replaceState({}, document.title, "/");
      navigate("/login", {
        replace: true,
        state: { error: "Missing authorization parameters. Please try again." },
      });
    });
  }, [handleCallback, handleGTCallback, navigate]);

  return (
    <div style={containerStyle}>
      <style>{spinnerKeyframes}</style>
      <div style={spinnerStyle}></div>
      <p>Authenticating...</p>
    </div>
  );
};

export default OAuthCallbackHandler;
