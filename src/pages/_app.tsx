import React from "react";
import { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";

import MainLayout from "../layouts/MainLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "../styles/globals.scss";
import { store } from "../store/store";

/**
 * Main Next.js App component
 * Wraps the application with providers and global layout
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </LocalizationProvider>
    </ReduxProvider>
  );
}

export default MyApp;
