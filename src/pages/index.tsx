import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import ConversionForm from "../components/ConversionForm";
import SEO from "../components/SEO";

/**
 * Home page with the code conversion interface
 */
const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Convert PHP to Node.js"
        description="Easily convert your PHP code to Node.js with our online conversion tool"
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
            PHP to Node.js Converter
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              textAlign: { xs: "left", md: "center" },
              mb: 4,
            }}
          >
            Convert your PHP code to Node.js instantly using AI-powered
            technology
          </Typography>
        </Box>

        <ConversionForm />

        <Box sx={{ mt: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 2,
              bgcolor: "background.paper",
              mt: 4,
            }}
          >
            <Typography variant="h5" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body1" paragraph>
              Our converter uses a sophisticated algorithm to translate PHP
              syntax and functions to their Node.js equivalents. The tool
              analyzes the structure of your PHP code and creates equivalent
              JavaScript code that can run in a Node.js environment.
            </Typography>

            <Typography variant="h5" gutterBottom>
              Features
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Syntax Transformation:</strong> Converts PHP syntax to
                  JavaScript ES6+ syntax
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Function Mapping:</strong> Maps PHP functions to
                  Node.js equivalents
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Error Handling:</strong> Preserves error handling
                  patterns
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Security:</strong> Your code is processed securely and
                  never stored permanently
                </Typography>
              </li>
            </ul>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
