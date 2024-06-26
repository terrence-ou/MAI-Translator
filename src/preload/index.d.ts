import { ReadSettings } from "@shared/types";

declare global {
  interface Window {
    context: {
      readSettings: ReadSettings;
    };
  }
}
