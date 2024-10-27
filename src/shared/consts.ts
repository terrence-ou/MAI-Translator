export const STORAGE_THEME_KEY = "multiai-theme";
export const STORAGE_FONTSIZE_KEY = "multiai-fontsize";
export const API_FILENAME = "multiai_apis.json";
export const MODEL_CONFIGS_FILENAME = "multi_models.json";
export const AI_LIST = ["DeepL", "OpenAI", "Claude"] as const;
export const DEEPL_MODELS = ["pro", "free"] as const;
export const CLAUDE_MODELS = [
  "claude-3-5-sonnet-20241022",
  "claude-3-sonnet-20240229",
  "claude-3-opus-20240229",
  "claude-3-haiku-20240307",
] as const;
export const OPENAI_MODELS = ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4"] as const;
export const OPENAI_TTS_VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;
export const MAX_TOKENS = 2048;
export const INIT_MODEL_CONFIGS = {
  DeepL: { key: "", model: "free" },
  OpenAI: { key: "", model: "gpt-4o-mini", voice: "alloy" },
  Claude: { key: "", model: "claude-3-haiku-20240307" },
};

export const APP_HISTORY_DIR = "Documents/MultiAI Translator/history";
export const FILE_ENCODING = "utf-8";

export const TRANSLATION_FAIL_MESSAGE =
  "Failed to fetch the result, please check the API or AI service status.";

export const BRIEF_DISPLAY_LENGTH = 100;
