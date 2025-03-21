import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { convertCode, fetchHistory, HistoryParams, ConversionResult, HistoryResponse } from '../services/api';

// Define the state type
interface ConversionState {
  // Current conversion
  currentConversion: {
    phpCode: string;
    nodeCode: string;
    isLoading: boolean;
    error: string | null;
  };
  // History data
  history: {
    items: ConversionResult[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
  };
}

// Initial state
const initialState: ConversionState = {
  currentConversion: {
    phpCode: '',
    nodeCode: '',
    isLoading: false,
    error: null,
  },
  history: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
};

// Async thunks for API calls
/**
 * Thunk to convert PHP code to Node.js using the API
 */
export const convertPhpToNode = createAsyncThunk(
  'conversion/convertPhpToNode',
  async (phpCode: string, { rejectWithValue }) => {
    try {
      const result = await convertCode(phpCode);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Thunk to fetch conversion history with pagination and filtering
 */
export const getConversionHistory = createAsyncThunk(
  'conversion/getHistory',
  async (params: HistoryParams, { rejectWithValue }) => {
    try {
      const result = await fetchHistory(params);
      return result;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the slice
const conversionSlice = createSlice({
  name: 'conversion',
  initialState,
  reducers: {
    // Set the PHP code in the state (when user types in the editor)
    setPhpCode: (state, action: PayloadAction<string>) => {
      state.currentConversion.phpCode = action.payload;
    },
    // Reset the current conversion state
    resetConversion: (state) => {
      state.currentConversion = initialState.currentConversion;
    },
    // Clear any errors
    clearError: (state) => {
      state.currentConversion.error = null;
      state.history.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle convertPhpToNode states
    builder
      .addCase(convertPhpToNode.pending, (state) => {
        state.currentConversion.isLoading = true;
        state.currentConversion.error = null;
      })
      .addCase(convertPhpToNode.fulfilled, (state, action) => {
        state.currentConversion.isLoading = false;
        state.currentConversion.nodeCode = action.payload.convertedCode;
      })
      .addCase(convertPhpToNode.rejected, (state, action) => {
        state.currentConversion.isLoading = false;
        state.currentConversion.error = action.payload as string;
      })
      
      // Handle getConversionHistory states
      .addCase(getConversionHistory.pending, (state) => {
        state.history.isLoading = true;
        state.history.error = null;
      })
      .addCase(getConversionHistory.fulfilled, (state, action: PayloadAction<HistoryResponse>) => {
        state.history.isLoading = false;
        state.history.items = action.payload.items;
        state.history.total = action.payload.total;
        state.history.page = action.payload.page;
        state.history.limit = action.payload.limit;
        state.history.totalPages = action.payload.totalPages;
      })
      .addCase(getConversionHistory.rejected, (state, action) => {
        state.history.isLoading = false;
        state.history.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setPhpCode, resetConversion, clearError } = conversionSlice.actions;
export default conversionSlice.reducer;