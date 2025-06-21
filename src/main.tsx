import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
