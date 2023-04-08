import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    toggleDarkMode: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;