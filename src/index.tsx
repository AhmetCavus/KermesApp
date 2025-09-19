import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    primary: {
      main: "#0f766e",
      light: "#14b8a6",
      dark: "#115e59",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#b45309",
      contrastText: "#111827",
    },
    success: { main: "#16a34a" },
    warning: { main: "#eab308" },
    error: { main: "#dc2626" },
    info: { main: "#2563eb" },
    background: { default: "#f9fafb", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body, #root": { minHeight: "100%" },
          body: {
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/header.bg.png)`,
            backgroundRepeat: "repeat",          // tile both directions
            backgroundSize: "auto",              // keep original tile size (use "200px" if you want)
            backgroundPosition: "top left",
            backgroundAttachment: "scroll",      // scrolls with content
          },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
