import React from "react";
import { Box, Container, Typography, Link as MuiLink } from "@mui/material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Avatar Project - PHP to Node.js Converter
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1 }}
        >
          Built with Next.js, Redux Toolkit, and Material-UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
