import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define theme state type
interface ThemeState {
  mode: 'light' | 'dark';
}

// Initial state - check localStorage for saved preference or default to light
const initialState: ThemeState = {
  mode: 'light',
};

// Create the slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
  },
});

// Export actions and reducer
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;