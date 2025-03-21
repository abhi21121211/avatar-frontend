import React from "react";
import { Container, Box, Typography } from "@mui/material";
import HistoryList from "../components/HistoryList";
import SEO from "../components/SEO";

/**
 * History page to view past conversions
 */
const HistoryPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Conversion History"
        description="View your past PHP to Node.js code conversions"
      />

      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: { xs: "left", md: "center" },
              mt: 2,
              mb: 1,
            }}
          >
            Conversion History
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              textAlign: { xs: "left", md: "center" },
              mb: 4,
            }}
          >
            View, search, and filter your past PHP to Node.js conversions
          </Typography>
        </Box>

        <HistoryList />
      </Container>
    </>
  );
};

export default HistoryPage;
