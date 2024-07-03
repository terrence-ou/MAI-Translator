import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIType, translationConfigType } from "@shared/types";

// Async Thunks
const loadApis = createAsyncThunk("translationConfig/loadApis", async () => {
  const apis = await window.context.readApis();
  return apis;
});

const setApis = createAsyncThunk("translationConfig/saveApis", async (apis: APIType) => {
  window.context.writeApis(apis);
  return apis;
});

const initialState: translationConfigType = {
  apis: {},
  fromLanguage: "",
  toLanguage: "en",
  sourceText: "",
};

export const translationConfigSlice = createSlice({
  name: "translationConfig",
  initialState,
  reducers: {
    setFromLanguage: (state, action: PayloadAction<string>) => {
      state.fromLanguage = action.payload;
    },
    setToLanguage: (state, action: PayloadAction<string>) => {
      state.toLanguage = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(loadApis.fulfilled, (state, action: PayloadAction<APIType>) => {
      state.apis = action.payload;
      return state;
    });
    builders.addCase(setApis.fulfilled, (state, action: PayloadAction<APIType>) => {
      state.apis = action.payload;
      return state;
    });
  },
});

export { loadApis, setApis };
export const { setFromLanguage, setToLanguage } = translationConfigSlice.actions;
export default translationConfigSlice.reducer;
