import { createSlice } from "@reduxjs/toolkit";
import { defaultSettings } from "@shared/default";
import { STORAGE_FONTSIZE_KEY, STORAGE_THEME_KEY } from "@shared/consts";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { editorSettingsType, Theme } from "@shared/types";

const localTheme = localStorage.getItem(STORAGE_THEME_KEY);
const localFontSize = localStorage.getItem(STORAGE_FONTSIZE_KEY);

const initialState: editorSettingsType = {
  theme: localTheme ? (localTheme as Theme) : defaultSettings.theme,
  editorFontSize:
    localFontSize && typeof localFontSize === "number"
      ? localFontSize
      : defaultSettings.editorFontSize,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.editorFontSize = action.payload;
    },
  },
});

export const { setTheme, setFontSize } = settingsSlice.actions;
export default settingsSlice.reducer;
