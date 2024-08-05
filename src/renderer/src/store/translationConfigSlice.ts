import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { APIType, StoreTranslationResult, TranslationConfigType } from "@shared/types";
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
        deeplOutput.detected_source_language, // This is a trick: deepl automatically returns a source language.
        toLanguage,
        sourceText
      );
      const openAIOutput = await window.context.getOpenAIResult(
        deeplOutput.detected_source_language, // This is a trick: deepl automatically returns a source language.
        toLanguage,
        sourceText
      );
      return {
        detected_source_language: deeplOutput.detected_source_language,
        outputs: [
          { aiSource: "DeepL", text: deeplOutput.text },
          { aiSource: "Claude", text: claudeOutput },
          { aiSource: "OpenAI", text: openAIOutput },
        ],
      } as StoreTranslationResult;
    } else return null;
  }
);

const initialState: TranslationConfigType = {
  apis: {},
  sourceText: "",
  loading: false,
  fromLanguage: "",
  toLanguage: "en",
  results: { detected_source_language: "", outputs: [] },
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
    resetResult: (state) => {
      state.results = { detected_source_language: "", outputs: [] };
    },
  },
  extraReducers: (builders) => {
    builders.addCase(loadApis.fulfilled, (state, action: PayloadAction<APIType>) => {
      state.apis = action.payload;
      // return state;
    });
    builders.addCase(setApis.fulfilled, (state, action: PayloadAction<APIType>) => {
      state.apis = action.payload;
      // return state;
    });
    builders.addCase(getTranslations.pending, (state) => {
      state.results.outputs = [];
      state.loading = true;
    });
    builders.addCase(
      getTranslations.fulfilled,
      (state, action: PayloadAction<StoreTranslationResult | null>) => {
        if (action.payload !== null) {
          state.results = action.payload;
        }
        state.loading = false;
      }
    );
  },
});

export { loadApis, setApis, getTranslations };
export const { setFromLanguage, setToLanguage, switchLanguages, setSourceText, resetResult } =
  translationConfigSlice.actions;
export default translationConfigSlice.reducer;
