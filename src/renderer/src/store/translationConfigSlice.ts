import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIType, translationConfigType } from "@shared/types";
import { RootState } from ".";

// Async Thunks
const loadApis = createAsyncThunk("translationConfig/loadApis", async () => {
  const apis = await window.context.readApis();
  return apis;
});

const setApis = createAsyncThunk("translationConfig/saveApis", async (apis: APIType) => {
  window.context.writeApis(apis);
  return apis;
});

const getDeepLFreeRes = createAsyncThunk(
  "translationConfig/getDeepLFreeRes",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { fromLanguage, toLanguage, sourceText } = state.translationConfig;
    console.log(fromLanguage, toLanguage, sourceText);
  }
);

const initialState: translationConfigType = {
  apis: {},
  sourceText: "",
  loading: false,
  fromLanguage: "",
  toLanguage: "en",
  results: [],
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
    switchLanguages: (state) => {
      if (state.fromLanguage !== "") {
        [state.fromLanguage, state.toLanguage] = [state.toLanguage, state.fromLanguage];
      }
    },
    setSourceText: (state, action: PayloadAction<string>) => {
      state.sourceText = action.payload;
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
    builders.addCase(getDeepLFreeRes.pending, (state) => {
      state.loading = true;
      return state;
    });
    builders.addCase(getDeepLFreeRes.fulfilled, (state) => {
      state.loading = false;
      return state;
    });
  },
});

export { loadApis, setApis, getDeepLFreeRes };
export const { setFromLanguage, setToLanguage, switchLanguages, setSourceText } =
  translationConfigSlice.actions;
export default translationConfigSlice.reducer;
