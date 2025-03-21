import { createTheme, Theme } from "@mui/material/styles";

/**
 * Creates a MUI theme based on the provided mode
 * @param mode - The theme mode (light or dark)
 * @returns MUI Theme object
 */
export const createAppTheme = (mode: "light" | "dark"): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow:
              mode === "light"
                ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                : "0 2px 8px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
  });
};

/**
 * Get monaco editor theme based on the app theme mode
 * @param mode - The theme mode (light or dark)
 * @returns Monaco editor theme name
 */
export const getMonacoTheme = (mode: "light" | "dark"): string => {
  return mode === "light" ? "vs" : "vs-dark";
};
