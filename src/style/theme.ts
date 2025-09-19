// src/theme.ts
import { createTheme } from "@mui/material/styles";

const turquoise = {
  main: "#14b8a6",   // turquoise
  light: "#2dd4bf",
  dark: "#0f766e",
  contrastText: "#ffffff",
};

const blue = {
  main: "#2563eb",   // vivid blue
  light: "#60a5fa",
  dark: "#1e40af",
  contrastText: "#ffffff",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: turquoise,   // buttons, highlights
    secondary: blue,      // accents
    info: { main: blue.main },
    success: { main: "#10b981" },  // emerald
    warning: { main: "#f59e0b" },  // amber
    error: { main: "#ef4444" },    // red
    background: { default: "#f6fafb", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          // subtle brand gradient for top bars
          backgroundImage: "linear-gradient(90deg, #14b8a6, #2563eb)",
        },
      },
    },
  },
});

export default theme;
