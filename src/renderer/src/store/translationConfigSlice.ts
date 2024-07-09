import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIType, DeepLResult, translationConfigType } from "@shared/types";
import { RootState } from ".";

/* Async Thunks */
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
    if (sourceText.length !== 0) {
      const result = await window.context.getDeepLFreeResult(fromLanguage, toLanguage, sourceText);
      return result;
    }
    return null;
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

/* The body of translation config slice */
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
    // set loading to true when fetching the data
    builders.addCase(getDeepLFreeRes.pending, (state) => {
      state.results = state.results.filter(({ aiSource }) => aiSource !== "DeepL");
      state.loading = true;
    });
    builders.addCase(
      getDeepLFreeRes.fulfilled,
      (state, action: PayloadAction<DeepLResult | null>) => {
        if (action.payload !== null)
          state.results = [
            ...state.results,
            {
              aiSource: "DeepL",
              detected_lan: action.payload.detected_source_language,
              text: action.payload.text,
            },
          ];
        state.loading = false;
      }
    );
  },
});

export { loadApis, setApis, getDeepLFreeRes };
export const { setFromLanguage, setToLanguage, switchLanguages, setSourceText } =
  translationConfigSlice.actions;
export default translationConfigSlice.reducer;
