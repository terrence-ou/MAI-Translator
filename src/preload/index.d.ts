import {
  DeleteFileFn,
  GetClaudeResultFn,
  GetDeepLFreeResultFn,
  GetFileContentFn,
  GetHistoriesFn,
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
      getHistories: GetHistoriesFn;
      getFileContent: GetFileContentFn;
      deleteFile: DeleteFileFn;
    };
  }
}
