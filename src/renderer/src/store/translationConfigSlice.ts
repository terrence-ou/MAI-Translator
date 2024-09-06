import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  ClaudeConfig,
  DeepLConfig,
  ModelConfigs,
  OpenaiConfig,
  StoreTranslationResult,
  TranslationConfigType,
} from "@shared/types";
import { RootState } from ".";
import { INIT_MODEL_CONFIGS } from "@shared/consts";

/* Async Thunks */
const loadModelConfigs = createAsyncThunk("translationConfig/loadModelConfigs", async () => {
  const configs = window.context.readModelConfigs();
  return configs;
});

const writeModelConfigs = createAsyncThunk(
  "translationConfig/writeModelConfigs",
  async (configs: ModelConfigs) => {
    window.context.writeModelConfigs(configs);
    return configs;
  }
);

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
  models: INIT_MODEL_CONFIGS as ModelConfigs,
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
    // Updating translation configs
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
    // Updating model configs
    updateDeepLConfig: (state, action: PayloadAction<DeepLConfig>) => {
      state.models.DeepL = action.payload;
    },
    updateClaudeConfig: (state, action: PayloadAction<ClaudeConfig>) => {
      state.models.Claude = action.payload;
    },
    updateOpenaiConfig: (state, action: PayloadAction<OpenaiConfig>) => {
      state.models.OpenAI = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(loadModelConfigs.fulfilled, (state, action: PayloadAction<ModelConfigs>) => {
      state.models = action.payload;
    });
    builders.addCase(writeModelConfigs.fulfilled, (state, action: PayloadAction<ModelConfigs>) => {
      state.models = action.payload;
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

export { loadModelConfigs, writeModelConfigs, getTranslations };
export const {
  setFromLanguage,
  setToLanguage,
  switchLanguages,
  setSourceText,
  resetResult,
  updateDeepLConfig,
  updateClaudeConfig,
  updateOpenaiConfig,
} = translationConfigSlice.actions;
export default translationConfigSlice.reducer;
