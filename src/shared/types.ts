import { AI_LIST } from "./consts";

export type Theme = "dark" | "light" | "system";
export type AISource = (typeof AI_LIST)[number];
export type LanguageConfig = { language: string; label: string; value: string };

// types for IPC
export type ReadAPIsFn = () => Promise<APIType>;
export type WriteAPIsFn = (apis: APIType) => void;

// Types for redux slices
// export type APIType = { name: AISource; value: string };
export type APIType = {
  [key in AISource]?: string;
};

export interface editorSettingsType {
  editorFontSize?: number;
  theme?: Theme;
  showPanel?: boolean;
}

export interface translationConfigType {
  apis: APIType;
  sourceText: string;
  fromLanguage: string;
  toLanguage: string;
}
