import React, { useCallback } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { getMonacoTheme } from "../utils/theme";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language: string;
  readOnly?: boolean;
  height?: string;
  label?: string;
}

/**
 * Monaco Editor component for code editing
 * Supports both PHP and JavaScript/Node.js code
 */
const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  readOnly = false,
  height = "500px",
  label,
}) => {
  const theme = useTheme();
  const monacoTheme = getMonacoTheme(theme.palette.mode);

  // Handle editor mount
  const handleEditorDidMount: OnMount = useCallback(
    (editor, monaco) => {
      // Configure editor options
      editor.updateOptions({
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
        },
        fontSize: 14,
        lineNumbers: "on",
        folding: true,
        automaticLayout: true,
      });

      // Add formatting options for languages
      if (language === "php") {
        monaco.languages.registerDocumentFormattingEditProvider("php", {
          provideDocumentFormattingEdits: (model) => {
            // Basic indentation for demo purposes
            // In a real app, you might use a proper formatter
            return [
              {
                range: model.getFullModelRange(),
                text: model.getValue(),
              },
            ];
          },
        });
      }
    },
    [language]
  );

  // Handle code changes
  const handleEditorChange: OnChange = useCallback(
    (value) => {
      if (onChange && value !== undefined) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      {label && (
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
          {label}
        </Typography>
      )}

      <Box
        sx={{
          height,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          overflow: "hidden",
        }}
        className="monaco-editor-container"
      >
        <Editor
          height="100%"
          language={language}
          value={value}
          theme={monacoTheme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
          loading={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress size={40} />
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default CodeEditor;
