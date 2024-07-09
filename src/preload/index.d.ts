import { GetDeepLFreeResultFn, ReadAPIsFn, WriteAPIsFn } from "@shared/types";

declare global {
  interface Window {
    context: {
      readApis: ReadAPIsFn;
      writeApis: WriteAPIsFn;
      getDeepLFreeResult: GetDeepLFreeResultFn;
    };
  }
}
