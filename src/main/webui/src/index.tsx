import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { DEVMODE } from "./config";

// If in devmode, report webvitals to help diagnose perf issues
if (DEVMODE) {
  require("./reportWebVitals");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
