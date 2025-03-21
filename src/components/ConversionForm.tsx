import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import CodeEditor from "./CodeEditor";
import { PlayArrow, ContentCopy, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import {
  convertPhpToNode,
  setPhpCode,
  resetConversion,
  clearError,
} from "../store/conversionSlice";

/**
 * Main conversion form component
 * Contains PHP input editor, conversion button, and Node.js output editor
 */
const ConversionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { phpCode, nodeCode, isLoading, error } = useAppSelector(
    (state) => state.conversion.currentConversion
  );

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Reset copy success message after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(null);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [copySuccess]);

  // Handle PHP code input changes
  const handlePhpCodeChange = useCallback(
    (value: string) => {
      dispatch(setPhpCode(value));
      // Clear error when user starts typing
      if (error) {
        dispatch(clearError());
      }
    },
    [dispatch, error]
  );

  // Handle conversion
  const handleConversion = useCallback(() => {
    if (phpCode.trim()) {
      dispatch(convertPhpToNode(phpCode));
    }
  }, [dispatch, phpCode]);

  // Reset both editors
  const handleReset = useCallback(() => {
    dispatch(resetConversion());
  }, [dispatch]);

  // Copy Node.js code to clipboard
  const handleCopyToClipboard = useCallback(() => {
    if (nodeCode) {
      navigator.clipboard
        .writeText(nodeCode)
        .then(() => {
          setCopySuccess("Code copied to clipboard!");
        })
        .catch(() => {
          setCopySuccess("Failed to copy code.");
        });
    }
  }, [nodeCode]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        PHP to Node.js Converter
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Paste your PHP code in the editor below and click "Convert" to transform
        it into Node.js code.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      {copySuccess && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setCopySuccess(null)}
        >
          {copySuccess}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Input editor */}
        <Grid item xs={12} md={6}>
          <CodeEditor
            value={phpCode}
            onChange={handlePhpCodeChange}
            language="php"
            label="PHP Code"
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConversion}
              disabled={isLoading || !phpCode.trim()}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <PlayArrow />
                )
              }
              sx={{ px: 3 }}
            >
              {isLoading ? "Converting..." : "Convert"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<Delete />}
              disabled={isLoading}
            >
              Reset
            </Button>
          </Box>
        </Grid>

        {/* Divider for visual separation */}
        <Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
          <Divider />
        </Grid>

        {/* Output editor */}
        <Grid item xs={12} md={6}>
          <CodeEditor
            value={nodeCode}
            language="javascript"
            readOnly
            label="Node.js Code"
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCopyToClipboard}
              startIcon={<ContentCopy />}
              disabled={!nodeCode}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ConversionForm;
