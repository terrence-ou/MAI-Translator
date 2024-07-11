import { AI_LIST } from "./consts";

export type Theme = "dark" | "light" | "system";
export type AISource = (typeof AI_LIST)[number];
export type LanguageConfig = { language: string; label: string; value: string };

// types for IPC
export type ReadAPIsFn = () => Promise<APIType>;
export type WriteAPIsFn = (apis: APIType) => void;

export type DetectionTranslationOutput = { detected_source_language: string; text: string };
export type TranslationOutput = string;
export type GetDeepLFreeResultFn = (
  from: string,
  to: string,
  text: string
) => Promise<DetectionTranslationOutput>;
export type GetClaudeResultFn = (
  from: string,
  to: string,
  text: string
) => Promise<TranslationOutput>;

// Types for redux slices
// export type APIType = { name: AISource; value: string };
export type APIType = {
  [key in AISource]?: string;
};

export type StoreTranslationResult = {
  detected_source_language: string;
  outputs: {
    aiSource: AISource;
    text: string;
  }[];
};

export interface editorSettingsType {
  editorFontSize?: number;
  theme?: Theme;
  showPanel?: boolean;
}

export interface translationConfigType {
  apis: APIType;
  loading: boolean;
  sourceText: string;
  results: StoreTranslationResult;
  fromLanguage: string;
  toLanguage: string;
}
