export type Theme = "dark" | "light" | "system";

// types for IPC
export type ReadAPIsFn = () => Promise<APIType>;
export type WriteAPIsFn = (apis: APIType) => void;

// Types for redux slices
export const aiList = ["DeepL", "Google", "OpenAI"] as const;
export type AISource = (typeof aiList)[number];
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
}
