import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./contexts/authContext";

import "@fontsource-variable/comme/index.css";


import "./index.css";
import { Toaster } from "./components/ui/toaster";
import { Theme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider>
      <Theme appearance="light" minH={"100vh"} bg={"white"}>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </Theme>
    </Provider>
  </BrowserRouter>
);
