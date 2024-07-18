import {
  GetClaudeResultFn,
  GetDeepLFreeResultFn,
  ReadAPIsFn,
  WriteAPIsFn,
  writeHistoryFn,
} from "@shared/types";

declare global {
  interface Window {
    context: {
      // curd
      readApis: ReadAPIsFn;
      writeApis: WriteAPIsFn;
      getDeepLFreeResult: GetDeepLFreeResultFn;
      getClaudeResult: GetClaudeResultFn;
      // fs
      writeHistory: writeHistoryFn;
    };
  }
}
