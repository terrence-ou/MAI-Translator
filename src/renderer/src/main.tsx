import "./assets/index.css";
// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
