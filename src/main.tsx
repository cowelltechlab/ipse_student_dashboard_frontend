import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/authContext";

import "@fontsource-variable/comme/index.css";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
