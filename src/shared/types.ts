import { AI_LIST, DEEPL_MODELS, CLAUDE_MODELS, OPENAI_MODELS } from "./consts";

export type Theme = "dark" | "light" | "system";
export type AISource = (typeof AI_LIST)[number];

export type LanguageConfig = { language: string; label: string; value: string };
export type Result = { aiSource: AISource; text: string };

// types for IPC
export type ReadAPIsFn = () => Promise<APIType>;
export type WriteAPIsFn = (apis: APIType) => void;

export type DetectionTranslationOutput = { detected_source_language: string; text: string };
export type TranslationOutput = string;

export type GetDetectionTranslationResultFn = (
  from: string,
  to: string,
  text: string
) => Promise<DetectionTranslationOutput>;

export type GetTranslationResultFn = (
  from: string,
  to: string,
  text: string
) => Promise<TranslationOutput>;

export type Record = {
  from: string;
  to: string;
  brief?: string;
  source?: string;
  translations?: Result[];
  filename?: string;
};
export type FilePreview = { [key: string]: Record[] };
export type WriteHistoryFn = (content: Record) => Promise<string | undefined>;
export type GetHistoriesFn = () => Promise<FilePreview>;
export type GetFileContentFn = (filename: string) => Promise<Record | null>;
export type DeleteFileFn = (filename: string) => Promise<boolean>;
export type TextToSpeechFn = (text: string) => Promise<string | undefined>;

// Types for redux slices
export type Routes = "main" | "history" | "upload";

export type APIType = {
  [key in AISource]?: string;
};

export type DeepLModels = (typeof DEEPL_MODELS)[number];
export type DeepLConfig = { key: string; model: DeepLModels };
export type ClaudeModels = (typeof CLAUDE_MODELS)[number];
export type ClaudeConfig = { key: string; model: ClaudeModels };
export type OpenaiModels = (typeof OPENAI_MODELS)[number];
export type OpenaiConfig = { key: string; model: OpenaiModels };

export type StoreTranslationResult = {
  detected_source_language: string;
  outputs: Result[];
};

export interface EditorSettingsType {
  currentRoute?: Routes;
  editorFontSize?: number;
  theme?: Theme;
  showPanel?: boolean;
  currentFilename?: string | undefined;
}

export interface TranslationConfigType {
  apis?: APIType;
  models: { DeepL: DeepLConfig; OpenAI: OpenaiConfig; Claude: ClaudeConfig };
  loading: boolean;
  sourceText: string;
  results: StoreTranslationResult;
  fromLanguage: string;
  toLanguage: string;
}

export interface FileSliceType {
  saving: boolean;
  filePreview: FilePreview;
}
