import React, { ReactNode, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks/useAppSelector";
import { createAppTheme } from "../utils/theme";
import { setTheme } from "../store/themeSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useLocalStorage from "../hooks/useLocalStorage";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Includes theme provider, navbar, and footer
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const [storedTheme, setStoredTheme] = useLocalStorage<"light" | "dark">(
    "theme",
    "light"
  );

  // Create MUI theme based on current mode
  const theme = createAppTheme(mode);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    dispatch(setTheme(storedTheme));
  }, [dispatch, storedTheme]);

  // Update localStorage when theme changes
  useEffect(() => {
    setStoredTheme(mode);
    // Apply theme class to body for global styling
    document.body.classList.toggle("dark-mode", mode === "dark");
  }, [mode, setStoredTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            px: { xs: 2, sm: 4 },
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
