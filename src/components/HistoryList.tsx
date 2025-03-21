import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Grid,
  Skeleton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Search, Visibility, CalendarMonth } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { getConversionHistory } from "../store/conversionSlice";
import { HistoryItem } from "../services/api";
import CodeEditor from "./CodeEditor";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

/**
 * History list component
 * Displays a table of past conversions with filtering and pagination
 */
const HistoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, total, page, limit, isLoading, error } = useAppSelector(
    (state) => state.conversion.history
  );

  // Local state for filters
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  // Fetch history on mount and when filters change
  useEffect(() => {
    const params = {
      page: page,
      limit: limit,
      search: search || undefined,
      dateFrom: dateFrom ? dateFrom.toISOString() : undefined,
      dateTo: dateTo ? dateTo.toISOString() : undefined,
    };

    dispatch(getConversionHistory(params));
  }, [dispatch, page, limit, search, dateFrom, dateTo]);

  // Handle page change
  const handleChangePage = useCallback(
    (_: unknown, newPage: number) => {
      dispatch(
        getConversionHistory({
          page: newPage + 1,
          limit,
          search: search || undefined,
          dateFrom: dateFrom ? dateFrom.toISOString() : undefined,
          dateTo: dateTo ? dateTo.toISOString() : undefined,
        })
      );
    },
    [dispatch, limit, search, dateFrom, dateTo]
  );

  // Handle rows per page change
  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLimit = parseInt(event.target.value, 10);
      dispatch(
        getConversionHistory({
          page: 1,
          limit: newLimit,
          search: search || undefined,
          dateFrom: dateFrom ? dateFrom.toISOString() : undefined,
          dateTo: dateTo ? dateTo.toISOString() : undefined,
        })
      );
    },
    [dispatch, search, dateFrom, dateTo]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Show dialog with conversion details
  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item);
  };

  // Close details dialog
  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  // Clear date filters
  const handleClearDates = () => {
    setDateFrom(null);
    setDateTo(null);
  };

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
        Conversion History
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filter controls */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by code content..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="From Date"
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="To Date"
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Grid>
        </LocalizationProvider>

        {(dateFrom || dateTo) && (
          <Grid item xs={12}>
            <Button variant="text" size="small" onClick={handleClearDates}>
              Clear Dates
            </Button>
          </Grid>
        )}
      </Grid>

      {/* History Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // Loading skeletons
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" width={100} />
                  </TableCell>
                </TableRow>
              ))
            ) : items.length > 0 ? (
              // History items
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id.slice(0, 8)}...</TableCell>
                  <TableCell>{formatDate(item.timestamp)}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={item.status === "success" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewDetails(item)}
                      size="small"
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Empty state
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ py: 3 }}
                  >
                    No conversion history found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {items.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      {/* Details Dialog */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={handleCloseDetails}
        maxWidth="lg"
        fullWidth
      >
        {selectedItem && (
          <>
            <DialogTitle>
              Conversion Details
              <Typography variant="subtitle2" color="text.secondary">
                ID: {selectedItem.id} • {formatDate(selectedItem.timestamp)}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CodeEditor
                    value={selectedItem.originalCode}
                    language="php"
                    readOnly
                    label="Original PHP Code"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CodeEditor
                    value={selectedItem.convertedCode}
                    language="javascript"
                    readOnly
                    label="Converted Node.js Code"
                  />
                </Grid>
                {selectedItem.errorMessage && (
                  <Grid item xs={12}>
                    <Alert severity="error">{selectedItem.errorMessage}</Alert>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
};

export default HistoryList;
