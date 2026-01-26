import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import theme from "./app/shared/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--op-navy": "#0b1a33",
            "--op-deep": "#102544",
            "--op-ocean": "#1b4d7a",
            "--op-ink": "#0f2a4d",
            "--op-red": "#d63a2f",
            "--op-red-dark": "#b83228",
            "--op-red-light": "#e85a4f",
            "--op-gold": "#f4c542",
            "--op-gold-dark": "#d9a92f",
            "--op-gold-light": "#ffd66b",
            "--op-cream": "#f7f1e1",
            "--op-teal": "#2ec4b6",
            "--op-blue": "#2d6fb7",
          },
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
          body: {
            backgroundColor: "var(--op-navy)",
            color: "var(--op-cream)",
            overflowX: "hidden",
            minHeight: "100vh",
            width: "100%",
          },
          "#root": {
            minHeight: "100vh",
            width: "100%",
          },
          "::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "::-webkit-scrollbar-track": {
            background: "rgba(16, 37, 68, 0.6)",
          },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(214, 58, 47, 0.6)",
            borderRadius: "5px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "rgba(214, 58, 47, 0.85)",
          },
        }}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
