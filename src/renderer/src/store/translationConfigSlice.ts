import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { APIType, translationConfigType, TranslationResult } from "@shared/types";
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

const getTranslations = createAsyncThunk(
  "translationConfig/getTranslations",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { fromLanguage, toLanguage, sourceText } = state.translationConfig;
    if (sourceText.length !== 0) {
      const deeplOutput = await window.context.getDeepLFreeResult(
        fromLanguage,
        toLanguage,
        sourceText
      );
      const claudeOutput = await window.context.getClaudeResult(
        fromLanguage,
        toLanguage,
        sourceText
      );
      return [
        { aiSource: "DeepL", ...deeplOutput },
        { aiSource: "Claude", ...claudeOutput },
      ] as TranslationResult[];
    } else return null;
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
    builders.addCase(getTranslations.pending, (state) => {
      state.results = [];
      state.loading = true;
    });
    builders.addCase(
      getTranslations.fulfilled,
      (state, action: PayloadAction<TranslationResult[] | null>) => {
        if (action.payload !== null) state.results = action.payload;
        state.loading = false;
      }
    );
  },
});

export { loadApis, setApis, getTranslations };
export const { setFromLanguage, setToLanguage, switchLanguages, setSourceText } =
  translationConfigSlice.actions;
export default translationConfigSlice.reducer;
