import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIType, translationConfigType } from "@shared/types";

// Async Thunks
const loadApis = createAsyncThunk("translationConfig/loadApis", async () => {
  const apis = await window.context.readApis();
  return apis;
});

// const writeApis = createAsyncThunk("translationConfig/writeApis", async () => {

// })

const initialState: translationConfigType = {
  apis: { DeepL: "" },
  sourceText: "",
};

export const translationConfigSlice = createSlice({
  name: "translationConfig",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(loadApis.fulfilled, (state, action: PayloadAction<APIType>) => {
      state.apis = action.payload;
      return state;
    });
  },
});

export { loadApis };
export default translationConfigSlice.reducer;
