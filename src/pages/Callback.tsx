import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";

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

  return <p>Authenticating with Google...</p>;
};

export default OAuthCallbackHandler;
