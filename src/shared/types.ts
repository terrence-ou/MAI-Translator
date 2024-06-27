export type Theme = "dark" | "light" | "system";
export type APIType = { name: "DeepL" | "openAI"; value: string };
export interface editorSettingsType {
  editorFontSize?: number;
  theme?: Theme;
}

export type ReadSettings = () => Promise<editorSettingsType>;
export type WriteSettings = (settings: editorSettingsType) => void;
