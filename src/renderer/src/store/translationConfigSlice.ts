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
    builders.addCase(setApis.fulfilled, (state, action: PayloadAction<APIType>) => {
      state.apis = action.payload;
      return state;
    });
  },
});

export { loadApis, setApis };
export default translationConfigSlice.reducer;
