import { ReadAPIsFn, WriteAPIsFn } from "@shared/types";

declare global {
  interface Window {
    context: {
      readApis: ReadAPIsFn;
      writeApis: WriteAPIsFn;
    };
  }
}
