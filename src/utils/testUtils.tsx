import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import conversionReducer from "../store/conversionSlice";
import themeReducer from "../store/themeSlice";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "./theme";

// Create a test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      conversion: conversionReducer,
      theme: themeReducer,
    },
    preloadedState,
  });
};

// Test wrapper with providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: any;
}

/**
 * Custom render function that wraps component with necessary providers
 */
const customRender = (
  ui: ReactElement,
  { preloadedState = {}, ...renderOptions }: CustomRenderOptions = {}
) => {
  const store = createTestStore(preloadedState);
  const theme = createAppTheme("light");

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
