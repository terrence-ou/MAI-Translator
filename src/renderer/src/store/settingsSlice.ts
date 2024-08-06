import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultSettings } from "@shared/default";
import { STORAGE_FONTSIZE_KEY, STORAGE_THEME_KEY } from "@shared/consts";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { EditorSettingsType, Theme, Routes } from "@shared/types";

// Get theme and font size from localStorage
const localTheme = localStorage.getItem(STORAGE_THEME_KEY);
const localFontSize = localStorage.getItem(STORAGE_FONTSIZE_KEY);
// Initial state from the settings slice
const initialState: EditorSettingsType = {
  currentRoute: "main",
  theme: localTheme ? (localTheme as Theme) : defaultSettings.theme,
  editorFontSize: localFontSize !== null ? parseInt(localFontSize) : defaultSettings.editorFontSize,
  showPanel: defaultSettings.showPanel,
  currentFilename: undefined,
};

// Async Thunks -- Update interface settings
const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (newSetting: EditorSettingsType) => {
    if (newSetting["theme"] !== undefined) {
      localStorage.setItem(STORAGE_THEME_KEY, newSetting.theme);
    }
    if (newSetting["editorFontSize"] !== undefined) {
      localStorage.setItem(STORAGE_FONTSIZE_KEY, `${newSetting.editorFontSize}`);
    }
    return newSetting;
  }
);

// The body of settings slice
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    togglePanel: (state) => {
      state.showPanel = state.showPanel ? false : true;
    },
    collapsePanel: (state) => {
      state.showPanel = false;
    },
    route: (state, action: PayloadAction<Routes>) => {
      state.currentRoute = action.payload;
    },
    setCurrFilename: (state, action: PayloadAction<string | undefined>) => {
      state.currentFilename = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateSettings.fulfilled,
      (state, action: PayloadAction<EditorSettingsType>) => {
        state = { ...state, ...action.payload };
        return state;
      }
    );
  },
});

export { updateSettings };
export const { togglePanel, collapsePanel, route, setCurrFilename } = settingsSlice.actions;
export default settingsSlice.reducer;
