// src/theme.ts
import { createTheme } from "@mui/material/styles";

const oceanBlue = {
  main: "#7ec8e3",        // pastel ocean blue
  light: "#1e5f8a",
  dark: "#07293f",
  contrastText: "#ffffff",
};

const seaAccent = {
  main: "#38bdf8",        // light sea blue
  light: "#7dd3fc",
  dark: "#0284c7",
  contrastText: "#0b3c5d",
};

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: oceanBlue,     // buttons, main actions
    secondary: seaAccent,   // accents, highlights

    info: { main: seaAccent.main },
    success: { main: "#22c55e" },   // fresh green (ok / success)
    warning: { main: "#fbbf24" },   // warm fest light
    error: { main: "#ef4444" },

    background: {
      default: "#041c2c",   // night ocean background
      paper: "#07293f",     // cards / surfaces
    },

    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1", // soft light gray
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 14,
          fontWeight: 600,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          // night sea gradient
          backgroundImage:
            "linear-gradient(90deg, #041c2c 0%, #0b3c5d 50%, #041c2c 100%)",
        },
      },
    },
  },
});

export default theme;