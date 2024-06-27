import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultSettings } from "@shared/default";
import { STORAGE_FONTSIZE_KEY, STORAGE_THEME_KEY } from "@shared/consts";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { editorSettingsType, Theme } from "@shared/types";

const localTheme = localStorage.getItem(STORAGE_THEME_KEY);
const localFontSize = localStorage.getItem(STORAGE_FONTSIZE_KEY);
const initialState: editorSettingsType = {
  theme: localTheme ? (localTheme as Theme) : defaultSettings.theme,
  editorFontSize: localFontSize !== null ? parseInt(localFontSize) : defaultSettings.editorFontSize,
};

// Async Thunks -- Update interface settings
const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (newSetting: editorSettingsType) => {
    if (newSetting["theme"] !== undefined) {
      localStorage.setItem(STORAGE_THEME_KEY, newSetting.theme);
    }
    if (newSetting["editorFontSize"] !== undefined) {
      localStorage.setItem(STORAGE_FONTSIZE_KEY, `${newSetting.editorFontSize}`);
    }
    return newSetting;
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      updateSettings.fulfilled,
      (state, action: PayloadAction<editorSettingsType>) => {
        state = { ...state, ...action.payload };
        return state;
      }
    );
  },
});

export { updateSettings };
export default settingsSlice.reducer;
