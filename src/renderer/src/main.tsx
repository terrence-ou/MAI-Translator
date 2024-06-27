import "./assets/index.css";
// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./components/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ReduxProvider>
  // </React.StrictMode>
);
