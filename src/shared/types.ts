import { AI_LIST } from "./consts";

export type Theme = "dark" | "light" | "system";
export type AISource = (typeof AI_LIST)[number];

export type LanguageConfig = { language: string; label: string; value: string };
export type Result = { aiSource: AISource; text: string };

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

// Types for redux slices
// export type APIType = { name: AISource; value: string };
export type APIType = {
  [key in AISource]?: string;
};

export type StoreTranslationResult = {
  detected_source_language: string;
  outputs: Result[];
};

export interface EditorSettingsType {
  editorFontSize?: number;
  theme?: Theme;
  showPanel?: boolean;
}

export interface TranslationConfigType {
  apis: APIType;
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
