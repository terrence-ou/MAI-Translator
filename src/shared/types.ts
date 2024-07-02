export type Theme = "dark" | "light" | "system";

export type APIType = { name: "DeepL" | "openAI"; value: string };
export type APIs = APIType[];

export interface editorSettingsType {
  editorFontSize?: number;
  theme?: Theme;
  showPanel?: boolean;
}

export type ReadAPIsFn = () => Promise<APIs>;
export type WriteAPIsFn = (apis: APIs) => void;
